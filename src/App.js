import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from "./component/MovieList";
import MovieListHeading from "./component/MovieListHeading";
import SearchBox from "./component/SearchBox";
import AddFavourite from "./component/AddToFavourites";
import RemoveFavourites from './component/RemoveFavourites';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [favourites, setFavourites] = useState([]);

    const getMovieRequest = async (searchValue) => {
        const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;

        const response = await fetch(url);
        const responseJson = await response.json();

        if (responseJson.Search) {
            setMovies(responseJson.Search);
        }

    };

    const addFavouriteMovie = (movie) => {
        const newFavouriteList = [...favourites, movie];
        setFavourites(newFavouriteList);
        saveToLocalStorage(newFavouriteList);
    };

    const removeFavouriteMovie = (movie) => {
        const newFavouriteList = favourites.filter(
            (favourite) => favourite.imdbID !== movie.imdbID
        );

        setFavourites(newFavouriteList);
        saveToLocalStorage(newFavouriteList);
    };

    const saveToLocalStorage = (items) => {
        localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
    };


    useEffect(() => {
        getMovieRequest(searchValue);
    }, [searchValue]);

    useEffect(() => {
        const movieFavourites = JSON.parse(
            localStorage.getItem('react-movie-app-favourites')
        );

        setFavourites(movieFavourites);
    }, []);

    return (
        <div className='container-fluid movie-app'>
            <div className='row d-flex align-items-center mt-4 mb-4'>
                <MovieListHeading heading='Movies' />
                <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
            </div>

            <div className='row'>
                <MovieList movies={movies} favouriteComponent={AddFavourite} handleFavouritesClick={addFavouriteMovie}/>
            </div>
            <div className='row d-flex align-items-center mt-4 mb-4'>
                <MovieListHeading heading='Favourites' />
            </div>
            <div className='row'>
                <MovieList movies={favourites} handleFavouritesClick={removeFavouriteMovie } favouriteComponent={RemoveFavourites} />
            </div>
        </div>
    );
};

export default App;