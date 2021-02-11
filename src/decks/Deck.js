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
        <div className='d-flex w-100 justify-content-between'>
          <h5 className='card-title'>{deck.name}</h5>
          <p className='text-muted'>{`${noOfCards} cards`}</p>
        </div>
        <p className='card-text'>{deck.description}</p>
        <div className='buttons d-flex'>
          <Link
            to={`/decks/${deck.id}`}
            type='button'
            className='btn btn-secondary mr-2'
          >
            <i className='fas fa-eye'></i> View
          </Link>
          <Link
            to={`/decks/${deck.id}/study`}
            type='button'
            className='btn btn-primary'
          >
            <i className='fas fa-book'></i> Study
          </Link>
          <button
            type='button'
            className='btn btn-danger ml-auto'
            title='Delete'
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
    </div>
  )
}
