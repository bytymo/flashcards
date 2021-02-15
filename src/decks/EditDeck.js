import React, { useEffect } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import { readDeck, updateDeck } from '../utils/api'

export default function EditDeck({ selectedDeck, setSelectedDeck }) {
  const { deckId } = useParams()
  const history = useHistory()

  useEffect(() => {
    const abortController = new AbortController()
    readDeck(deckId, abortController.signal).then(setSelectedDeck)

    return () => abortController.abort()
  }, [deckId, setSelectedDeck])

  const handleChange = ({ target }) => {
    setSelectedDeck({
      ...selectedDeck,
      [target.name]: target.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    updateDeck(selectedDeck)
    history.push(`/decks/${deckId}`)
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
            Edit Deck
          </li>
        </ol>
      </nav>
      <h1>Edit Deck</h1>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <textarea
            className='form-control'
            id='name'
            type='text'
            name='name'
            onChange={handleChange}
            value={selectedDeck.name}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Description</label>
          <textarea
            className='form-control'
            id='description'
            type='text'
            name='description'
            onChange={handleChange}
            value={selectedDeck.description}
          />
        </div>
        <div className='buttons mb-3'>
          <Link
            to={`/decks/${selectedDeck.id}`}
            type='button'
            className='btn btn-secondary mr-2'
          >
            Cancel
          </Link>
          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
