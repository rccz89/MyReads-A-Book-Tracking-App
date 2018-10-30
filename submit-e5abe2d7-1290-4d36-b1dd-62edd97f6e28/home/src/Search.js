import React from 'react'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import Shelfs from './Shelfs'

class Search extends React.Component {
  state = {
    query: '',
    books: []
  }

  updateQuery = (query) => {
    this.search(query.trim())
    this.setState({ query: query })
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  search = (query) => {
    BooksAPI.search(query, 10).then((results) => {
      this.setState({
        books: results
      })
    })
  }

  render() {
    const { query, books } = this.state
    let showingBooks
    if (books.length > 0) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingBooks = books.filter((book) => match.test(book.title))
    } else {
      showingBooks = books
    }
    books.length > 0 && showingBooks.sort(sortBy('title'))

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search" >Close</Link>
          <div className="search-books-input-wrapper">
            
            <input autoFocus type="text" placeholder="Search by title or author" value={query}
            onChange={(event) => this.updateQuery(event.target.value)
            }/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {(books.length > 0 &&
              <Shelfs
              shelfTitle='Results'
              shelf='results'
              books={books}
              onChangeShelf={this.props.onChangeShelf}
              />
              )}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search 