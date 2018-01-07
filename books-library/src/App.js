import React, { Component } from 'react';
import {BookList} from './components/BookList'
import {BooksStore} from './store/BooksStore'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BookList store={BooksStore()}/>
      </div>
    );
  }
}

export default App;
