import React, { useEffect, useState } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import { readDeck, createCard } from '../utils/api'
import CardForm from './CardForm'

export default function AddCard({ selectedDeck, setSelectedDeck }) {
  const { deckId } = useParams()
  const history = useHistory()

  useEffect(() => {
    const abortController = new AbortController()
    readDeck(deckId, abortController.signal).then(setSelectedDeck)

    return () => abortController.abort()
  }, [deckId, setSelectedDeck])

  const initialState = {
    front: '',
    back: '',
  }

  const [formData, setFormData] = useState({ ...initialState })
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    createCard(deckId, formData)
    history.go(0)
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
            Add Card
          </li>
        </ol>
      </nav>
      <h3>{selectedDeck.name + ': Add Card'}</h3>
      <CardForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cardData={formData}
        selectedDeck={selectedDeck}
      />
    </div>
  )
}
