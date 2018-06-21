import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import MainHeader from './MainHeader'
import BookShelves from './BookShelves'
import SearchPage from './SearchPage'
import * as BooksAPI from './BooksAPI'
import imgs from './images/cover.jpg'

class App extends Component {

  state = {
    allBooks: [],
    shelvesWithInfo: []
  }

  componentWillMount() {
    BooksAPI.getAll().then((booksInfo) => {
      this.setState({ shelvesWithInfo: booksInfo })
    })
  }

  updateBooks = (books) => {
    if (books.error) {
      this.setState({ allBooks: [] })
    } else {
      this.setState({ allBooks: books })
    }
  }

  shelfUpdate = (book, shelf) => {
    BooksAPI.update(book, shelf).then((data) => {
      this.setState({ shelves: data })
    })
    BooksAPI.getAll().then((booksInfo) => {
      this.setState({ shelvesWithInfo: booksInfo })
    })
  }

  authorsDilemma = (authors) => {
    if (authors == null) {
      return 'Authors: no information'
    } else if (authors.length === 1) {
      return `Author: ${authors}`
    } else {
      return `Authors: ${authors.join(', ')}`
    }
  }

  checkImg = (imgLinks) => {
    if (imgLinks == null) {
      return imgs
    } else {
      return imgLinks.thumbnail
    }
  }

  shelfCheck = (aBookID) => {
    let shelfToSearchRender = this.state.shelvesWithInfo.filter((eachBook) => eachBook.id === aBookID).map(eachBook => (eachBook.shelf))
    if (shelfToSearchRender.length === 0) {
      return "none"
    } else {
      return shelfToSearchRender.toString()
    }
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
            <div>
              <MainHeader/>
              <BookShelves booksToShow={this.state.shelvesWithInfo} onPutToShelf={(book, shelf) => { this.shelfUpdate(book, shelf) }}
              onShelfCheck={(aBookID) => { return this.shelfCheck(aBookID) }} onAuthorsDilemma={(authors) => { return this.authorsDilemma(authors) }}
              onCheckImg={(imgLinks) => { return this.checkImg(imgLinks) }}/>
            </div>
          )}
        />

        <Route exact path='/search' render={() => (
            <SearchPage books={this.state.allBooks} currentShelf={this.state.shelvesWithInfo} onSearchBooks={(books) => {
              this.updateBooks(books) }} onPutToShelf={(book, shelf) => { this.shelfUpdate(book, shelf) }}
              onShelfCheck={(aBookID) => { return this.shelfCheck(aBookID) }} onAuthorsDilemma={(authors) => { return this.authorsDilemma(authors) }}
              onCheckImg={(imgLinks) => { return this.checkImg(imgLinks) }}/>
          )}
        />
      </div>
    )
  }
}

export default App;
