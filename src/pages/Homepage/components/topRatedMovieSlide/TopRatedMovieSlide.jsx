import React from 'react'
import Alert from 'react-bootstrap/Alert';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCard from '../movieCard/MovieCard';
import "./TopRatedMovieSlide.style.css";
import {responsive} from "../../../../utils/reponsiveSlider"
import { useTopRatedMoviesQuery } from '../../../../hooks/useTopRatedMovies';

const TopRatedMovieSlide = () => {
  const {data, isLoading, isError, error} = useTopRatedMoviesQuery();

  if(isLoading){
    return <h1>Loading...</h1>
  }

  if(isError){
    return <Alert key="danger" variant="danger">{error.message}</Alert>
  }


  return (
    <div>
    <h3>Top Rated Movies</h3>
    <Carousel
    infinite = {true}
    centerMode={true}
    itemClass = "movie-slider p-1"
    containerClass = "carousel-container"
    responsive={responsive}
>
{data.results.map((movie, index) => <MovieCard movie={movie} key={index}/>)}
</Carousel>
    </div>
    
  )
}

export default TopRatedMovieSlide