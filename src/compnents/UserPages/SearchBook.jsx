import { useEffect, useState } from 'react'
import constans from '../../utilities/constans';
import UserHomePage from './UserHomePage';

const SearchBook = () => {
    const [books, setBooks] = useState([])
    const [input, setInput] = useState('')

    useEffect(()=>{
        if(input.length>=3){
            getBooks()
        } else{
            getAllBooks();
            
        }
    },[input])

    const getAllBooks = async () => {
        const url = constans.API_URL_BOOK_GETALL;
            const response = await fetch(url);
            const data = await response.json();
            if (data.data) {
                setBooks(data.data);
            }
    };

    const getBooks = async ()=>{
        const url = constans.API_URL_BOOK_SEARCH;
        const response = await fetch(url + input);
        const data = await response.json();
        if(data.data){
            setBooks(data.data);
        
            data.data.forEach(book => {
                console.log(book.image);
            });
        }
        console.log(data.data);
        
    }

    return (
        <>
    <div className='input-container'>
        <input className='search-bar' type='text' value={input} onChange={(e)=>{setInput(e.target.value)}} placeholder='Search...'/>
    </div>
    <UserHomePage books={books}/>
    </>
    );
}

export default SearchBook