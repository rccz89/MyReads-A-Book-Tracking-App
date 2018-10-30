import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Search from './Search'
import MainLibrary from './MainLibrary'
import './App.css'

class BooksApp extends Component {
  state = {
    currentlyReading: [],
    read: [],
    wantToRead: []
  }

  componentWillMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        currentlyReading: books.filter((book) => book.shelf === 'currentlyReading'),
        read: books.filter((book) => book.shelf === 'read'),
        wantToRead: books.filter((book) => book.shelf === 'wantToRead')
        })
    })
  }

  changeShelf = (targetshelf, book) => {
    const { currentlyReading, read, wantToRead } = this.state
    const newBook = book
    newBook.shelf = targetshelf

    // Remove old book
    this.setState((state) => ({
      currentlyReading: currentlyReading.filter((b) => b.id !== book.id),
      read: read.filter((b) => b.id !== book.id),
      wantToRead: wantToRead.filter((b) => b.id !== book.id)
    }))

    targetshelf === 'currentlyReading' &&
      this.setState((state) => ({
        currentlyReading: currentlyReading.concat([ newBook ])
      }))

    targetshelf === 'read' &&
      this.setState((state) => ({
        read: read.concat([ newBook ])
      }))

    targetshelf === 'wantToRead' &&
      this.setState((state) => ({
        wantToRead: wantToRead.concat([ newBook ])
      }))
  }

  render() {
    let { currentlyReading, read, wantToRead } = this.state
    let { changeShelf } = this

    return (
      <div className="app">

        <Route exact path="/" render={() => (
            <MainLibrary
            currentlyReading={currentlyReading}
            read={read}
            wantToRead={wantToRead}
            onChangeShelf={changeShelf}
            />
          )}/>

        <Route path="/search" render={() => (
            <Search
            onChangeShelf={changeShelf}
            />
          )}/>

      </div>
    )
  }
}

export default BooksApp