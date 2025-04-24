import React from 'react'
import "./MovieSlider.style.css"
import Carousel from 'react-multi-carousel';
import MovieCard from '../movieCard/MovieCard'
import {responsive} from "../../constants/reponsiveSlider"

//movies == data.results
const MovieSlider = ({title, movies}) => {
  return (
    <div className='overflow'>
      <div>
            <h3>{title}</h3>
            <Carousel
            infinite = {true}
            centerMode={true}
            itemClass = "movie-slider p-1"
            containerClass = "carousel-container"
            responsive={responsive}
        >
        {movies.map((movie, index) => <MovieCard movie={movie} key={index}/>)}
        </Carousel>
      </div>
    </div>
  )
}

export default MovieSlider