import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/SetImagePage.css';
import constans from '../../utilities/constans';

const SetImagePage = () => {
    const [books, setBooks] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedBookId, setSelectedBookId] = useState(null);
    const navigate = useNavigate();

    const getAllBooks = async () => {
        const url = constans.API_URL_BOOK_GETALL;
        const response = await fetch(url);
        const data = await response.json();
        if (data.data) {
            setBooks(data.data);
        }
    };

    useEffect(() => {
        getAllBooks();
    }, []);

    const handleImageUpload = (event, bookId) => {
        setSelectedFile(event.target.files[0]);
        setSelectedBookId(bookId);
    };

    const handleSaveImage = async () => {
        if (!selectedFile || !selectedBookId) return;

        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = async () => {
            const base64Image = reader.result.split(',')[1];

            const url = constans.API_URL_BOOK_IMAGE_UPDATE;
            const requestBody = {
                bookId: selectedBookId,
                image: base64Image
            };
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
            if (response.status === 200) {
                alert("Resim başarıyla güncellendi");
                getAllBooks();
            } else {
                console.error("Resim güncellenirken hata oluştu.");
            }
        };
    };

    return (
        <div>
            <nav className="navbar">
                <button onClick={() => navigate('/adminhomepage')} className="home-btn">Anasayfa</button>
                <h1 className="page-title">Kitap Resimlerini Güncelleme Sayfası</h1>
            </nav>

            <div className="books-row">
                {books.map((book) => (
                    <div className="book-cart" key={book.id}>
                        <img className="book-image" src={book.image} alt={book.bookName} />
                        <div className="book-details">
                            <h2 className="book-name">{book.bookName}</h2>
                            <p className="author-name">{book.authorName}</p>
                        </div>
                        <div className="image-upload">
                            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, book.id)} />
                            <button onClick={handleSaveImage} className="save-btn">
                                Kitap Resmini Kaydet
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SetImagePage;
