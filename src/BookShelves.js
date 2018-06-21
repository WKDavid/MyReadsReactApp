import React, { Component } from 'react'

class BookShelves extends Component {

  render() {
    const { booksToShow, onPutToShelf, onShelfCheck, onAuthorsDilemma, onCheckImg } = this.props
    return (
      <div className="shelves">
        <div>
          <span className="shelfName">Currently reading:</span>
          {booksToShow && (
          <ol className="searchResults">
            {booksToShow.filter((eachBook) => eachBook.shelf === "currentlyReading").map(eachBook => (
              <li key={eachBook.id} className="shelf-item">
                  <img className="book-shelf-thumb" src={onCheckImg(eachBook.imageLinks)} alt="book cover"/>
                  <div className="book-info">
                    <p>{eachBook.title}</p>
                    <p>{onAuthorsDilemma(eachBook.authors)}</p>
                    <select className="select-box" value={onShelfCheck(eachBook.id)} onChange={(event) => onPutToShelf(eachBook, event.target.value)}>
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
        </div>
        <div>
          <span className="shelfName">Want to read:</span>
          {booksToShow && (
          <ol className="searchResults">
            {booksToShow.filter((eachBook) => eachBook.shelf === "wantToRead").map(eachBook => (
              <li key={eachBook.id} className="shelf-item">
                  <img className="book-shelf-thumb" src={onCheckImg(eachBook.imageLinks)} alt="book cover"/>
                  <div className="book-info">
                    <p>{eachBook.title}</p>
                    <p>{onAuthorsDilemma(eachBook.authors)}</p>
                    <select className="select-box" value={onShelfCheck(eachBook.id)} onChange={(event) => onPutToShelf(eachBook, event.target.value)}>
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
        </div>
        <div>
          <span className="shelfName">Read:</span>
          {booksToShow && (
          <ol className="searchResults">
            {booksToShow.filter((eachBook) => eachBook.shelf === "read").map(eachBook => (
              <li key={eachBook.id} className="shelf-item">
                  <img className="book-shelf-thumb" src={onCheckImg(eachBook.imageLinks)} alt="book cover"/>
                  <div className="book-info">
                    <p>{eachBook.title}</p>
                    <p>{onAuthorsDilemma(eachBook.authors)}</p>
                    <select className="select-box" value={onShelfCheck(eachBook.id)} onChange={(event) => onPutToShelf(eachBook, event.target.value)}>
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
        </div>
      </div>
    )
  }
}

export default BookShelves;
