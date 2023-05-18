import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './App.css';
import MoviesList from './components/Movies-list';
import AddReview from './components/Add-review';
import Movie from './components/Movie';
import Login from './components/Login';

function App() {
  const [user, setUser] = useState(null);

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <div className="App">
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="/">Movie-MKO</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/movies">Movie</Nav.Link>
                {user ? (
                  <Nav.Link as={Link} onClick={logout}>Logout User</Nav.Link>
                ) : (
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
          <Route exact path="/movies" element={<MoviesList />} />
          <Route path="/movies/:id/review" element={<AddReview user={user} />} />
          <Route path="/movies/:id" element={<Movie user={user} />} />
          <Route
            path="/login"
            element={<Login login={login} />}
          />
        </Routes>
    </div>
  );
}

export default App;
