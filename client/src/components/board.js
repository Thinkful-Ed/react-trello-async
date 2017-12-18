import React from 'react';

import {API_BASE_URL} from '../config';
import List from './list';
import AddForm from './add-form';

import './board.css';

export default class Board extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lists: [],
            error: null,
            loading: false
        };
    }

    componentDidMount() {
        this.loadBoard();
    }

    loadBoard() {
        this.setState({
            error: null,
            loading: true
        });
        return fetch(`${API_BASE_URL}/board`)
            .then(res => {
                if (!res.ok) {
                    return Promise.reject(res.statusText);
                }
                return res.json();
            })
            .then(board =>
                this.setState({
                    lists: board.lists,
                    loading: false
                })
            )
            .catch(err =>
                this.setState({
                    error: 'Could not load board',
                    loading: false
                })
            );
    }

    addList(title) {
        this.setState({
            lists: [...this.state.lists, {title, cards: []}]
        });
    }

    addCard(text, listIndex) {
        this.setState({
            lists: this.state.lists.map((list, index) => {
                if (index !== listIndex) {
                    return list;
                }
                return Object.assign({}, list, {
                    cards: [...list.cards, {text}]
                });
            })
        });
    }

    render() {
        let body;
        if (this.state.error) {
            body = (
                <div className="message message-error">{this.state.error}</div>
            );
        } else if (this.state.loading) {
            body = (
                <div className="message message-default">Loading board...</div>
            );
        } else {
            const lists = this.state.lists.map((list, index) => (
                <li className="list-wrapper" key={index}>
                    <List
                        index={index}
                        {...list}
                        addCard={(text, index) => this.addCard(text, index)}
                    />
                </li>
            ));
            body = (
                <ul className="lists">
                    {lists}
                    <li className="add-list-wrapper">
                        <AddForm
                            type="card"
                            onAdd={text => this.addList(text)}
                        />
                    </li>
                </ul>
            );
        }

        return (
            <div className="board">
                <h2>{this.props.title}</h2>
                {body}
            </div>
        );
    }
}

Board.defaultProps = {
    title: 'Board'
};
