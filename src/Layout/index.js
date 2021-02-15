import React, { useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Home from '../decks/DeckList'
import StudyDeck from '../decks/StudyDeck'
import NotFound from './NotFound'
import Header from './Header'
import EditDeck from '../decks/EditDeck'
import DisplayDeck from '../decks/DisplayDeck'
import EditCard from '../cards/EditCard'
import AddCard from '../cards/AddCard'
import CreateDeck from '../decks/CreateDeck'

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
            <CreateDeck
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
            <EditDeck
              selectedDeck={selectedDeck}
              setSelectedDeck={setSelectedDeck}
            />
          </Route>
          <Route path='/decks/:deckId/cards/new'>
            <AddCard
              selectedDeck={selectedDeck}
              setSelectedDeck={setSelectedDeck}
            />
          </Route>
          <Route path='/decks/:deckId/cards/:cardId/edit'>
            <EditCard
              selectedDeck={selectedDeck}
              setSelectedDeck={setSelectedDeck}
            />
          </Route>
          <Route exact={true} path='/decks/:deckId'>
            <DisplayDeck />
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
