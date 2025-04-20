import React from 'react'
import Alert from 'react-bootstrap/Alert';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCard from '../movieCard/MovieCard';
import "./UpcomingMovieSlide.style.css";
import {responsive} from "../../../../utils/reponsiveSlider"
import { useUpcomingrMoviesQuery } from '../../../../hooks/useUpcomingMovies';


const UpcomingMovieSlide = () => {
  const {data, isLoading, isError, error} = useUpcomingrMoviesQuery();

  if(isLoading){
    return <h1>Loading...</h1>
  }

  if(isError){
    return <Alert key="danger" variant="danger">{error.message}</Alert>
  }


  return (
    <div>
    <h3>Upcoming Movies</h3>
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

export default UpcomingMovieSlide