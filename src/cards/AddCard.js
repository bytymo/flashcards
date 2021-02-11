import React, { useEffect, useState } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import { readDeck, createCard } from '../utils/api'

export default function AddCard({ selectedDeck, setSelectedDeck }) {
  const { deckId } = useParams()
  const history = useHistory()

  useEffect(() => {
    const abortController = new AbortController()
    readDeck(deckId, abortController.signal).then(setSelectedDeck)

    return () => abortController.abort()
  }, [deckId])

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
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Front</label>
          <textarea
            className='form-control'
            name='front'
            id='front'
            placeholder='Front side of card'
            onChange={handleChange}
            value={formData.front}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Back</label>
          <textarea
            className='form-control'
            name='back'
            id='back'
            placeholder='Back side of card'
            onChange={handleChange}
            value={formData.back}
            required
          />
        </div>
        <div className='buttons mb-3'>
          <Link
            to={`/decks/${selectedDeck.id}`}
            className='btn btn-secondary mr-2'
          >
            Done
          </Link>
          <button type='submit' className='btn btn-primary'>
            Save
          </button>
        </div>
      </form>
    </div>
  )
}
