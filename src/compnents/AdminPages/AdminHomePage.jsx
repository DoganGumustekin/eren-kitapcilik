import { useEffect, useState } from 'react'
import './css/AdminHomePage.css';
import constans from '../../utilities/constans';
import { useNavigate } from 'react-router-dom';

const AdminHomePage = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

useEffect(() => {
    getAllBooks();
}, [])

const getAllBooks = async () => {
  const url = constans.API_URL_BOOK_GETALL;
  const response = await fetch(url);
  const data = await response.json();
  if (data.data) {
    setBooks(data.data);
  }
};

const handleDelete = async (id) => {
  try {
      const url = `${constans.API_URL_BOOK_DELETE}/${id}`; 
      const response = await fetch(url, { method: 'DELETE' });
      if(response.status === 200){
        getAllBooks();
      }
  } catch (error) {
      console.error("Error deleting book: ", error);
  }
};

const handleUpdate = (id) => {
  // Güncelleme işlemi için gerekli kodu buraya ekleyin
  alert(`Güncelle butonuna tıklandı, kitap ID: ${id}`);
};

const goProductAddPage = ()=>{
  navigate('/addproductspage')
}

return (
  <div className="books-container">
      <h1>Kitap Listesi</h1>
      <button onClick={goProductAddPage} className='addbook-btn'>Kitap Ekle</button>
      <div className="books">
          {books.length > 0 ? (
              books.map((book) => (
                  <div className="book-container" key={book.id}>
                      <img className="book-image" src={book.image} alt={book.bookName} />
                      <div className="book-details">
                          <h2 className="book-name">{book.bookName}</h2>
                          <p className="author">{book.authorName}</p>
                          <p className="printing-house">{book.printingHouse}</p>
                          <p className="price">${book.price.toFixed(2)}</p>
                          <div className="button-container">
                              <button onClick={() => handleUpdate(book.id)} className="update-btn">Güncelle</button>
                              <button onClick={() => handleDelete(book.id)} className="delete-btn">Sil</button>
                          </div>
                      </div>
                  </div>
              ))
          ) : (
              <p>Henüz Eklemediniz.</p>
          )}
      </div>
  </div>
);
}

export default AdminHomePage;