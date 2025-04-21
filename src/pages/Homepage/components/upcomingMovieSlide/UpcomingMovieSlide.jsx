import React from 'react'
import Alert from 'react-bootstrap/Alert';
import 'react-multi-carousel/lib/styles.css';
import { useUpcomingrMoviesQuery } from '../../../../hooks/useUpcomingMovies';
import MovieSlider from '../../../../common/movieSlide/MovieSlider';


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
      <MovieSlider title="Upcoming Movies" movies={data.results}/>
    </div>
    
  )
}

export default UpcomingMovieSlide