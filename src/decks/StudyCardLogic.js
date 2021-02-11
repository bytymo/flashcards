import React, { Fragment, useState } from 'react'
import { useHistory } from 'react-router-dom'

export default function StudyCardLogic(props) {
  const { validCards } = props
  const history = useHistory()
  const [flipped, setFlipped] = useState(false)
  const [selectedCard, setSelectedCard] = useState(0)

  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='card-title'>
          {'Card ' + Number(selectedCard + 1) + ' of ' + validCards.length}
        </h5>
        {!flipped ? (
          <Fragment>
            <p className='card-text'>{validCards[selectedCard].front}</p>
            <button
              type='button'
              className='btn btn-secondary'
              onClick={() => setFlipped(true)}
            >
              Flip
            </button>
          </Fragment>
        ) : (
          <Fragment>
            <p className='card-text'>{validCards[selectedCard].back}</p>
            <button
              type='button'
              className='btn btn-secondary mr-2'
              onClick={() => setFlipped(false)}
            >
              Flip
            </button>
            <button
              type='button'
              className='btn btn-primary'
              onClick={() => {
                const nextCard = selectedCard + 1
                if (validCards[nextCard]) {
                  setSelectedCard(nextCard)
                  setFlipped(false)
                } else if (window.confirm('Restart Cards?')) {
                  setSelectedCard(0)
                  setFlipped(false)
                } else {
                  history.push('/')
                }
              }}
            >
              Next
            </button>
          </Fragment>
        )}
      </div>
    </div>
  )
}
