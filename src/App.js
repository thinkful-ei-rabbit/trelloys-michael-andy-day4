import React, { Component } from 'react';
import List from './List'
import './App.css';
import STORE from './STORE'

const newRandomCard = () => {
  const id = Math.random().toString(36).substring(2, 4)
    + Math.random().toString(36).substring(2, 4);
  return {
    id,
    title: `Random Card ${id}`,
    content: 'lorem ipsum',
  }
}

function omit(obj, keyToOmit) {
  return Object.entries(obj).reduce(
    (newObj, [key, value]) =>
      key === keyToOmit ? newObj : {...newObj, [key]: value},
      {}
  );
}

class App extends Component {
  
    state = {
      store: STORE,
    };
  
    // Create buttons to access setState
  
  handleDeleteCard = (cardId) => {
    console.log('inside handleDeleteCard', cardId)
    const { lists, allCards} = this.state.store;

    const newLists = lists.map(lists => ({
      ...lists, 
      cardIds: lists.cardIds.filter(id => id !== cardId)}))

    const newCards = omit(allCards, cardId);
      
    this.setState({
      store: {
        lists: newLists,
        allCards: newCards
      }

    })

  };

  // handleAddCard = (listId) => {
  //   const newCard = newRandomCard()

  //   const newLists = this.state.lists.map(list)


  // }


  
  
  render() {
    
    const { store } = this.state
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {store.lists.map(list => (
            <List
              key={list.id}
              header={list.header}
              cards={list.cardIds.map(id => store.allCards[id])}
              onClickDelete = {this.handleDeleteCard}
              onClickAdd={this.handleAddCard}
            />
          ))}
        </div>
      </main>
    );
  }



}

export default App;
