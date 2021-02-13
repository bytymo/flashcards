import React from 'react'
import { Link } from 'react-router-dom'

export default function CardForm({
  handleChange,
  handleSubmit,
  cardData,
  selectedDeck,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label htmlFor='name'>Front</label>
        <textarea
          className='form-control'
          name='front'
          id='front'
          placeholder='Front side of card'
          onChange={handleChange}
          value={cardData.front}
          required='true'
          autofocus='true'
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
          value={cardData.back}
          required='true'
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
  )
}
