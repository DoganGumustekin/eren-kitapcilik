import { useEffect, useState } from 'react';
import './css/AdminHomePage.css';
import constans from '../../utilities/constans';
import { useNavigate } from 'react-router-dom';

const AdminHomePage = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [updatedBook, setUpdatedBook] = useState({
    bookName: '',
    authorName: '',
    printingHouse: '',
    price: ''
  });

  useEffect(() => {
    getAllBooks();
  }, []);

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
      if (response.status === 200) {
        getAllBooks();
      }
    } catch (error) {
      console.error("Error deleting book: ", error);
    }
  };

  const handleUpdate = (book) => {
    setSelectedBook(book);
    setUpdatedBook({
      bookName: book.bookName,
      authorName: book.authorName,
      printingHouse: book.printingHouse,
      price: book.price
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    
      const url = `${constans.API_URL_BOOK_UPDATE}`;
      
      const bookToUpdate = {
        id: selectedBook.id,
        bookName: updatedBook.bookName,
        authorName: updatedBook.authorName,
        price: updatedBook.price
      };
  
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookToUpdate)
      });
  
      if (response.status === 200) {
        getAllBooks();
        setIsModalOpen(false);
      } else {
        console.error(`hata: ${response.status}`);
      }
  };
  

  const goProductAddPage = () => {
    navigate('/addproductspage');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBook({ ...updatedBook, [name]: value });
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-content">
          <h1>Kitap Listesi</h1>
        </div>
      </nav>
      <div className="books-container">
        <button onClick={goProductAddPage} className="addbook-btn">Kitap Ekle</button>
        <div className="books">
          {books.length > 0 ? (
            books.map((book) => (
              <div className="book-container" key={book.id}>
                <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}><img className="book-image" src={book.image} alt={book.image} /></div>
                
                <div className="book-details">
                  <h2 className="book-name">{book.bookName}</h2>
                  <p className="author">{book.authorName}</p>
                  <p className="printing-house">{book.printingHouse}</p>
                  <p className="price">${book.price.toFixed(2)}</p>
                  <div className="button-container">
                    <button onClick={() => handleUpdate(book)} className="update-btn">Güncelle</button>
                    <button onClick={() => handleDelete(book.id)} className="delete-btn">Sil</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Henüz Kitap Eklemediniz.</p>
          )}
        </div>
        
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Kitap Bilgilerini Güncelle</h2>
              <label>Kitap Adı:</label>
              <input
                type="text"
                name="bookName"
                value={updatedBook.bookName}
                onChange={handleInputChange}
              />
              <label>Yazar Adı:</label>
              <input
                type="text"
                name="authorName"
                value={updatedBook.authorName}
                onChange={handleInputChange}
              /> <br />
              <label>Yayın Evi:</label>
              <input
                type="text"
                name="printingHouse"
                value={updatedBook.printingHouse}
                onChange={handleInputChange}
              />
              <label>Fiyat:</label>
              <input
                type="number"
                name="price"
                value={updatedBook.price}
                onChange={handleInputChange}
              />
              <div className="modal-buttons">
                <button onClick={handleSave} className="save-btn">Kaydet</button>
                <button onClick={() => setIsModalOpen(false)} className="close-btn">Kapat</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AdminHomePage;