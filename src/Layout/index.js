import React, { useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Home from '../Decks/DeckList'
import StudyDeck from '../Decks/StudyDeck'
import NotFound from './NotFound'
import Header from './Header'
import DeckEdit from '../Decks/EditDeck'
import DeckView from '../Decks/DisplayDeck'
import CardEdit from '../Cards/EditCard'
import CardCreate from '../Cards/AddCard'
import DeckCreate from '../Decks/CreateDeck'

function Layout() {
  const [deckList, setDeckList] = useState([])
  const [selectedDeck, setSelectedDeck] = useState([])

  const createDeckHandler = (newDeck) => {
    setDeckList([...deckList, newDeck])
  }

  return (
    <>
      <Header />
      <div className='container'>
        <Switch>
          <Route path='/decks/new'>
            <DeckCreate
              deckList={deckList}
              createDeckHandler={createDeckHandler}
            />
          </Route>
          <Route path='/decks/:deckId/study'>
            <StudyDeck
              selectedDeck={selectedDeck}
              setSelectedDeck={setSelectedDeck}
            />
          </Route>
          <Route path='/decks/:deckId/edit'>
            <DeckEdit
              selectedDeck={selectedDeck}
              setSelectedDeck={setSelectedDeck}
            />
          </Route>
          <Route path='/decks/:deckId/cards/new'>
            <CardCreate
              selectedDeck={selectedDeck}
              setSelectedDeck={setSelectedDeck}
            />
          </Route>
          <Route path='/decks/:deckId/cards/:cardId/edit'>
            <CardEdit
              selectedDeck={selectedDeck}
              setSelectedDeck={setSelectedDeck}
            />
          </Route>
          <Route exact={true} path='/decks/:deckId'>
            <DeckView />
          </Route>
          <Route exact={true} path='/decks'>
            <Redirect to='/' />
          </Route>
          <Route exact={true} path='/'>
            <Home deckList={deckList} setDeckList={setDeckList} />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  )
}

export default Layout
