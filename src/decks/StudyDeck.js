import React, { useEffect, useState } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import { listDecks, listCards, readDeck } from '../utils/api/index'

export default function StudyDeck({
  currentDeck,
  setCurrentDeck,
  setDeckCollection,
  setCardCollection,
}) {
  const [isFront, setIsFront] = useState(true)
  const url = useRouteMatch()
  const deckId = url.params.deckId
  useEffect(() => {
    async function render() {
      const setDecks = await listDecks()
      await setDeckCollection(setDecks)
      const setDeck = await readDeck(deckId)
      await setCurrentDeck(setDeck)
      const setCards = await listCards(deckId)
      await setCardCollection(setCards)
    }
    render()
  }, [])

  let num = 0
  let currentCard = currentDeck.cards[num]
  const front = currentCard.front
  const back = currentCard.back

  let currentState = front

  const visible = { visibility: 'visible' }
  const invisible = { visibility: 'hidden' }
  let visibility = invisible

  const handleFlip = () => {
    setIsFront((prevState) => !prevState)
  }
  if (isFront) {
    currentState = front
    visibility = invisible
  } else {
    currentState = back
    visibility = visible
  }

  const handleNext = () => {
    console.log('before', num)
    num = num + 1
    setIsFront(true)
    console.log('after', num)
  }

  function StudyOptions() {
    if (currentDeck.cards.length >= 3) {
      return (
        <div className='card'>
          <div className='card-body'>
            <h4 className='card-title'>
              Card {num + 1} of {currentDeck.cards.length}
            </h4>
            <p className='card-text'>{currentState}</p>
            <div className='btns'>
              <button
                className='btn btn-secondary mr-2'
                onClick={() => handleFlip()}
              >
                Flip
              </button>
              <button
                className='btn btn-primary'
                style={visibility}
                onClick={() => handleNext()}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <h3>Not enough cards.</h3>
          <p>
            You need at least 3 cards to study. There are{' '}
            {currentDeck.cards.length} card(s) in this deck.
          </p>
          <Link to={`cards/new`} className='btn btn-primary'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className='bi bi-plus-circle-fill mr-1'
              viewBox='0 0 16 20'
            >
              <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z' />
            </svg>
            Add Cards
          </Link>
        </div>
      )
    }
  }

  return (
    <>
      <nav aria-label='breadcrumb'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'>
            <Link to='/'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='20'
                fill='currentColor'
                className='bi bi-house-door-fill mr-1'
                viewBox='0 3 16 16'
              >
                <path d='M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z' />
              </svg>
              Home
            </Link>
          </li>
          <li className='breadcrumb-item'>
            <Link to={`/decks/${currentDeck.id}`}>{currentDeck.name}</Link>
          </li>
          <li className='breadcrumb-item active' aria-current='page'>
            Study
          </li>
        </ol>
      </nav>

      <h2>{currentDeck.name}: Study</h2>

      <StudyOptions />
    </>
  )
}
