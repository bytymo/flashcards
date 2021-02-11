import React, { useEffect, useState } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import { readDeck, deleteDeck, deleteCard } from '../utils/api'

export default function DisplayDeck() {
  const [displayDeck, setDisplayDeck] = useState([])
  const { deckId } = useParams()
  const history = useHistory()

  useEffect(() => {
    const abortController = new AbortController()
    readDeck(deckId, abortController.signal).then(setDisplayDeck)

    return () => abortController.abort()
  }, [deckId])

  const cardList = displayDeck && displayDeck.cards
  const validCards = cardList && cardList.filter((card) => !card.cards)

  function deleteDeckHandler(deck) {
    deleteDeck(deck.id)
    history.push('/')
    history.go(0)
  }

  function deleteCardHandler(card) {
    const id = card.id
    deleteCard(id)
    history.go(0)
  }

  const validCardList =
    validCards &&
    validCards.map((card, index) => (
      <div className='card' key={index}>
        <div className='card-body'>
          <div style={{ float: 'left', width: '50%' }}>
            <p className='text-muted'>{card.front}</p>
          </div>
          <div style={{ float: 'right', width: '50%' }}>
            <p className='text-muted' style={{ float: 'right' }}>
              {card.back}
            </p>
          </div>
          <br />
          <div style={{ float: 'right' }}>
            {/* Edit Card */}
            <Link to={`/decks/${displayDeck.id}/cards/${card.id}/edit`}>
              <button type='button' className='btn btn-secondary mr-2'>
                <i className='fas fa-pencil-alt'></i> Edit
              </button>
            </Link>
            {/* Delete Card */}
            <button
              type='button'
              className='btn btn-danger'
              title='Delete'
              onClick={() => {
                if (window.confirm('Delete this card?')) deleteCardHandler(card)
              }}
            >
              <i className='fas fa-trash-alt'></i>
            </button>
          </div>
        </div>
      </div>
    ))

  return (
    <div className='container'>
      <nav aria-label='breadcrumb'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'>
            <Link to='/'>
              <i className='fas fa-home'></i> Home
            </Link>
          </li>
          <li className='breadcrumb-item active' aria-current='page'>
            {displayDeck.name}
          </li>
        </ol>
      </nav>
      <div>
        <h3>{displayDeck.name}</h3>
        <p>{displayDeck.description}</p>
      </div>
      <div>
        {/* Edit Deck */}
        <Link to={`/decks/${displayDeck.id}/edit`}>
          <button type='button' className='btn btn-secondary'>
            <i className='fas fa-pencil-alt'></i> Edit
          </button>
        </Link>
        {/* Study Deck */}
        <Link to={`/decks/${displayDeck.id}/study`}>
          <button
            type='button'
            className='btn btn-primary'
            style={{ marginLeft: '5px' }}
          >
            <i className='fas fa-book'></i> Study
          </button>
        </Link>
        {/* Add Cards */}
        <Link to={`/decks/${displayDeck.id}/cards/new`}>
          <button
            type='button'
            className='btn btn-primary'
            style={{ marginLeft: '5px' }}
          >
            <i className='fas fa-plus'></i> Add Cards
          </button>
        </Link>
        {/* Delete Deck */}
        <button
          type='button'
          className='btn btn-danger'
          style={{ float: 'right' }}
          title='Delete'
          onClick={() => {
            if (window.confirm('Delete this deck?'))
              deleteDeckHandler(displayDeck, cardList)
          }}
        >
          <i className='fas fa-trash-alt'></i>
        </button>
      </div>
      <br />
      <div className='mb-3'>
        <h2>Cards</h2>
        <section className='column'>{validCardList}</section>
      </div>
    </div>
  )
}
