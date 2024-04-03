import React, { useEffect, useState } from 'react';
import './App.css';
import MovieBox from './MovieBox';
import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';

const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=f2a4bf708f75ea777fb7d51aeb7a41ba";
const API_SEARCH = "https://api.themoviedb.org/3/search/movie?api_key=f2a4bf708f75ea777fb7d51aeb7a41ba&query=";
const TRENDING_URL = "https://api.themoviedb.org/3/trending/movie/day?api_key=f2a4bf708f75ea777fb7d51aeb7a41ba";

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchMovies(API_URL);
  }, []);

  const fetchMovies = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const searchMovie = async (e) => {
    e.preventDefault();
    try {
      const url = `${API_SEARCH}${query}`;
      fetchMovies(url);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  const changeHandler = (e) => {
    setQuery(e.target.value);
  };

  const handleTrendingClick = () => {
    fetchMovies(TRENDING_URL);
  };

  return (
    <>
      <Navbar bg="dark" expand="lg" variant='dark' fluid>
        <Container >
          <Navbar.Brand href='/home'>MovieDb App</Navbar.Brand>
          <Nav className='me-auto my-2 my-lg-3' style={{ maxHeight: '100px' }} navbarScroll>
            <Nav.Link href='#' onClick={handleTrendingClick}>Trending</Nav.Link>
          </Nav>
          <Navbar.Toggle aria-controls='navbarScroll' />
          <Navbar.Collapse id='navbarScroll'>
            <Form className="d-flex" onSubmit={searchMovie}>
              <FormControl
                type='search' placeholder='movieSearch' aria-label='search'
                className="me-2" name='query' value={query} onChange={changeHandler}></FormControl>
              <Button variant='secondary' type='submit'>Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className='container'>
        <div className="grid">
          {movies.map((movieReq) => <MovieBox key={movieReq.id} {...movieReq} />)}
        </div>
      </div>
    </>
  );
}

export default App;
