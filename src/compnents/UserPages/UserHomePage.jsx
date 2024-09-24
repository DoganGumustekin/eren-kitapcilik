import React from 'react';
import './UserHomePage.css'


const UserHomePage = ({ books }) => {
  return (<div className='books'>
    {books.map((book)=>(
      <div className="book-container" key={book.id}>
        <img key={book.id} className='book-image' src={book.image} alt={book.bookName}/>
        <div className="book-details">
          <h2 className="book-name">{book.bookName}</h2>
          <h3 className="author">Author: {book.authorName}</h3>
          <p className="printing-house">Yayın Evi: {book.printingHouse}</p>
          <p className="price">Fiyat: ${book.price.toFixed(2)}</p>
        </div>
      </div>
    ))}
  </div>);
}

export default UserHomePage;
