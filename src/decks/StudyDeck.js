import React, { useEffect, useState, Fragment } from 'react'
import { useParams, Link } from 'react-router-dom'

import { readDeck } from '../utils/api'
import StudyCardLogic from './StudyCardLogic'

export default function StudyDeck({ selectedDeck, setSelectedDeck }) {
  const [cardList, setCardList] = useState([])
  const { deckId } = useParams()

  useEffect(() => {
    const abortController = new AbortController()
    readDeck(deckId, abortController.signal).then((deck) => {
      setSelectedDeck(deck)
      setCardList(deck.cards)
    })

    return () => abortController.abort()
  }, [deckId, setSelectedDeck])

  const validCards = cardList && cardList.filter((card) => !card.cards)

  return (
    <Fragment>
      <nav aria-label='breadcrumb'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'>
            <Link to='/'>
              <i className='fas fa-home'></i> Home
            </Link>
          </li>
          <li className='breadcrumb-item active' aria-current='page'>
            <Link to={`/decks/${selectedDeck.id}`}>{selectedDeck.name}</Link>
          </li>
          <li className='breadcrumb-item active' aria-current='page'>
            Study
          </li>
        </ol>
      </nav>
      <h1>{'Study: ' + selectedDeck.name}</h1>
      {cardList.length > 0 && validCards.length > 2 ? (
        <StudyCardLogic validCards={validCards} />
      ) : (
        <Fragment>
          <h3>Not enough cards.</h3>
          <p>
            {'You need at least 3 cards to study. There are ' +
              validCards.length +
              ' cards in the deck.'}
          </p>
          <Link to={`/decks/${selectedDeck.id}/cards/new`}>
            <button type='button' className='btn btn-primary'>
              <i className='fas fa-plus'></i> Add Cards
            </button>
          </Link>
        </Fragment>
      )}
    </Fragment>
  )
}
