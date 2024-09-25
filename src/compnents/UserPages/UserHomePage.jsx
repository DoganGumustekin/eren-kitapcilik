import React, { useState } from 'react';
import './UserHomePage.css';

const UserHomePage = ({ books }) => {
  const [selectedBook, setSelectedBook] = useState(null);

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const handleClosePopup = () => {
    setSelectedBook(null);
  };

  return (
    <>
      <div className='books'>
        {books.length > 0 ? (
          books.map((book) => (
            <div className="book-container" key={book.id} onClick={() => handleBookClick(book)}>
              <img className='book-image' src={book.image} alt={book.bookName} />
              <div className="book-details">
                <h2 className="book-name">{book.bookName}</h2>
                <h3 className="author">Author: {book.authorName}</h3>
                <p className="printing-house">Yayın Evi: {book.printingHouse}</p>
                <p className="price">Fiyat: ${book.price.toFixed(2)}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-books">Kitap bulunamadı</p>
        )}
      </div>

      {selectedBook && (
        <div className="popup">
          <div className="popup-content">
            <span className="close-btn" onClick={handleClosePopup}>&times;</span>
            <h2 className="book-name">{selectedBook.bookName}</h2>
            <h3 className="author">Author: {selectedBook.authorName}</h3>
            <p className="printing-house">Yayın Evi: {selectedBook.printingHouse}</p>
            <p className="price">Fiyat: ${selectedBook.price.toFixed(2)}</p>
            <img className='book-image' src={selectedBook.image} alt={selectedBook.bookName} />
          </div>
        </div>
      )}
    </>
  );
};

export default UserHomePage;
