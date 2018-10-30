import React from 'react'
import ShowBook from './ShowBook'

class Shelfs extends React.Component {

  render() {
    let { onChangeShelf } = this.props

    return (
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {this.props.books.map((book) => (
                  <ShowBook
                  key={book.id}
                  id={book.id}
                  onChangeShelf={onChangeShelf}
                  book={book}
                  />
              ))}
            </ol>
          </div>
        </div>
    )
  }
}

export default Shelfs
