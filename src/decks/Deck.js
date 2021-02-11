import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { listDecks, deleteDeck } from '../utils/api'

export default function Deck({ deck }) {
  const [cardList, setCardList] = useState([])
  const history = useHistory()

  useEffect(() => {
    listDecks().then((d) => {
      const cards = d.find((d2) => d2.id === deck.id).cards
      setCardList(cards)
    })
  }, [deck.id])

  function deleteHandler(value) {
    deleteDeck(value)
    history.go(0)
  }

  const noOfCards = cardList && cardList.filter((card) => !card.cards).length

  return (
    <div className='card m-1'>
      <div className='card-body'>
        <div style={{ justifyContent: 'space-between' }}>
          <p className='text-muted' style={{ float: 'right' }}>
            {`${noOfCards} cards`}
          </p>
          <h5 className='card-title'>{deck.name}</h5>
        </div>
        <p className='card-text'>{deck.description}</p>
        <Link to={`/decks/${deck.id}`}>
          <button type='button' className='btn btn-secondary'>
            <i className='fas fa-eye'></i> View
          </button>
        </Link>
        <Link to={`/decks/${deck.id}/study`}>
          <button
            type='button'
            className='btn btn-primary'
            style={{ marginLeft: '5px' }}
          >
            <i className='fas fa-book'></i> Study
          </button>
        </Link>
        <button
          type='button'
          className='btn btn-danger'
          title='Delete'
          style={{ float: 'right' }}
          onClick={() => {
            if (window.confirm('Delete this deck?')) {
              deleteHandler(deck.id, cardList)
            }
          }}
        >
          <i className='fas fa-trash-alt'></i>
        </button>
      </div>
    </div>
  )
}
