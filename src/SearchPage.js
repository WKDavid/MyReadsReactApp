import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import nothingGif from './images/nothing.gif'

class SearchPage extends Component {

  state = {
    query: ''
  }

  updateQuery = (query) => {
    if (query.length > 0 && query.startsWith(' ') === false) {
      this.setState({ query: query })
      BooksAPI.search(query.trim()).then((books) => {
        this.props.onSearchBooks(books)
      })
    } else {
      this.setState({ query: '' })
      this.props.onSearchBooks({error: "empty query", items: Array(0)})
    }
  }

  render() {
    const { query } = this.state
    const { books, onPutToShelf, onShelfCheck, onAuthorsDilemma, onCheckImg } = this.props
    return (
      <div>
        <div className="searchContainer">
          <Link className="back-to-main" to="/">Back</Link>
          <input className="searchBar" type="text" name="search" placeholder="Search by title or author" value={query} onChange={(event) => this.updateQuery(event.target.value)}/>
        </div>
        {query.length > 0 && books.length > 0 && (
        <ol className="searchResults">
          {books.map((book) => (
            <li key={book.id} className="book-item">
              <img className="book-thumb" src={onCheckImg(book.imageLinks)} alt="book cover"/>
              <div className="book-info">
                <p>{book.title}</p>
                <p>{onAuthorsDilemma(book.authors)}</p>
                <select className="select-box" value={onShelfCheck(book.id)} onChange={(event) => onPutToShelf(book, event.target.value)}>
                  <option value="moveTo" disabled>Move to shelf:</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </li> ))}
        </ol>
        )}
        {books.length === 0 && (
          <div className="nothing-container">
            <img className="nothing" src={nothingGif} alt="no search results"/>
          </div>
        )}
      </div>
    )
  }
}

export default SearchPage;
