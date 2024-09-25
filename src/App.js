import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginSignup from './compnents/LoginSignup/LoginSignup'
import UserHome from './compnents/UserPages/UserHomePage'
import AdminHomePage from './compnents/AdminPages/AdminHomePage'
import AddProductsPage from './compnents/AdminPages/AddBooksPage'
import SearchBook from './compnents/UserPages/SearchBook'
import SetImagePage from './compnents/AdminPages/SetImagePage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup/>}/>
        <Route path="/userhomepage" element={<UserHome/>}/>
        <Route path="/adminhomepage" element={<AdminHomePage/>}/>
        <Route path="/addproductspage" element={<AddProductsPage/>}/>
        <Route path="/searchbook" element={<SearchBook/>}/>
        <Route path="/setimagepage" element={<SetImagePage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
