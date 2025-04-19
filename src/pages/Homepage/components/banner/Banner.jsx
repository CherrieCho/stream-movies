import React from 'react'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'
import Alert from 'react-bootstrap/Alert';
import "./Banner.style.css";

const Banner = () => {

  const {data, isLoading, isError, error} = usePopularMoviesQuery();
  console.log(data);

  if(isLoading){
    return <h1>Loading...</h1>
  }

  if(isError){
    return <Alert key="danger" variant="danger">{error.message}</Alert>
  }

  return (
    <div style={{
      backgroundImage: "url(" + `https://image.tmdb.org/t/p/original${data?.results[2].poster_path}` + ")"}} className='banner'>
        <div className='text-white banner-text-area'>
          <h1>{data.results[2].title}</h1>
          <p className='banner-text-description'>{data.results[2].overview}</p>
        </div>
      </div>

      // {data.results.map((item) => <div>{item.original_title}</div>)}
  )
}

export default Banner