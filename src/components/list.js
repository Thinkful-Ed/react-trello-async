import React from 'react';

import Card from './card';
import AddForm from './add-form';

import './list.css';

export default function List(props) {
    const cards = props.cards.map((card, index) => (
        <Card key={index} {...card} />
    ));
    return (
        <div className="list">
            <h3>{props.title}</h3>
            {cards}
            <AddForm
                type="card"
                onAdd={text => props.addCard(text, props.index)}
            />
        </div>
    );
}

List.defaultProps = {
    title: ''
};
