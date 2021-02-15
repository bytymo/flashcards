import React, { useState, useEffect } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import { readCard, readDeck, updateCard } from '../utils/api'
import CardForm from './CardForm'

export default function EditCard({ selectedDeck, setSelectedDeck }) {
  const history = useHistory()
  const [selectedCard, setSelectedCard] = useState([])
  const { deckId, cardId } = useParams()
  useEffect(() => {
    const abortController = new AbortController()
    readDeck(deckId, abortController.signal).then((deck) => {
      setSelectedDeck(deck)
      readCard(cardId, abortController.signal).then(setSelectedCard)
    })
  }, [deckId, cardId, setSelectedDeck])

  const handleChange = ({ target }) => {
    setSelectedCard({
      ...selectedCard,
      [target.name]: target.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    updateCard(selectedCard)
    history.push(`/decks/${selectedDeck.id}`)
  }

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
            <Link to={`/decks/${selectedDeck.id}`}>{selectedDeck.name}</Link>
          </li>
          <li className='breadcrumb-item active' aria-current='page'>
            {'Edit Card ' + cardId}
          </li>
        </ol>
      </nav>
      <h3>Edit Card</h3>
      <CardForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cardData={selectedCard}
        selectedDeck={selectedDeck}
      />
    </div>
  )
}
