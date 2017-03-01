import React from 'react';

import List from './list';
import AddForm from './add-form';

export default class Board extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lists: []
        };
    }

    addList(title) {
        this.setState({
            lists: [...this.state.lists, {title}]
        });
    }

    render() {
        const lists = this.state.lists.map((list, index) =>
            <List key={index} {...list} />
        );

        return (
            <div className="board">
                <h2>{this.props.title}</h2>
                <div className="lists">
                    {lists}
                    <AddForm type="list" onAdd={title => this.addList(title)} />
                </div>
            </div>
        );
    }
}

Board.defaultProps = {
    title: 'Board'
};

