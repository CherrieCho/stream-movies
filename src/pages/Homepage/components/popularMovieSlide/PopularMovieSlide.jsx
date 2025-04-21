import React from 'react'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'
import Alert from 'react-bootstrap/Alert';
import 'react-multi-carousel/lib/styles.css';
import MovieSlider from '../../../../common/movieSlide/MovieSlider';

const PopularMovieSlide = () => {
  const {data, isLoading, isError, error} = usePopularMoviesQuery();

  if(isLoading){
    return <h1>Loading...</h1>
  }

  if(isError){
    return <Alert key="danger" variant="danger">{error.message}</Alert>
  }


  return (
    <div>
      <MovieSlider title="What's Popular" movies={data.results}/>
    </div>
    
  )
}

export default PopularMovieSlide