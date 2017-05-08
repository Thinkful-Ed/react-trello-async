import React from 'react';

import Card from './card';
import AddForm from './add-form';

import './list.css';

export default class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: []
        }
    }

    addCard(text) {
        this.setState({
            cards: [...this.state.cards, {
                text
            }]
        });
    }

    render() {
        const cards = this.state.cards.map((card, index) =>
            <Card key={index} {...card} />
        );
        return (
            <div className="list">
                <h3>{this.props.title}</h3>
                {cards}
                <AddForm type="card" onAdd={text => this.addCard(text)} />
            </div>
        );
    }
}

List.defaultProps = {
    title: ''
};
