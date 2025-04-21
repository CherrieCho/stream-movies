import React from 'react'
import Alert from 'react-bootstrap/Alert';
import 'react-multi-carousel/lib/styles.css';
import { useTopRatedMoviesQuery } from '../../../../hooks/useTopRatedMovies';
import MovieSlider from '../../../../common/movieSlide/MovieSlider';

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
      <MovieSlider title="Top Rated Movies" movies={data.results}/>
    </div>
    
  )
}

export default TopRatedMovieSlide