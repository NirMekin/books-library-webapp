import React, { Component } from 'react';
import {BookList} from './components/BookList'
import {AddBook} from './components/AddBook'
import {BooksStore} from './store/BooksStore'
import './App.css';
const store = BooksStore()

/*
  Main container of this app 
*/
class App extends Component {
  render() {
    return (
      <div className="App">
        <BookList store={store}/>
        <AddBook store={store}/>
      </div>
    );
  }
}

export default App;
