import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import BookDetails from './components/BookDetails';
import Nav from './components/Nav';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Addbook from './components/Addbook';
import Update from './components/Update';
import EditBook from './components/EditBook';
import NotFound from './components/NotFound';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Nav/>
        <Routes>
          <Route path="*" element={<NotFound/>}/>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/addBook" element={<Addbook />} />
          <Route path="/EditBook/:id" element={<EditBook/>} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/book" element={<BookDetails />} />
        </Routes>
      </BrowserRouter>
   
    </div>
  );
}

export default App;
