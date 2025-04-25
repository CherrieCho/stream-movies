import React from 'react'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'
import Alert from 'react-bootstrap/Alert';
import "./Banner.style.css";
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';

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
    <Carousel>
      <Carousel.Item>
        <Link to={`/movies/${data.results[0].id}`} style={{ textDecoration: "none", color: "white"}}>
          <div style={{
        backgroundImage: "url(" + `https://image.tmdb.org/t/p/original${data?.results[0].backdrop_path}` + ")"}} className='banner'>
              <div className='text-area'>
                  <h1>{data.results[0].title}</h1>
                  <div className="text-description">
                      <p>{data.results[0].overview}</p>
                  </div>
              </div>
          </div>
        </Link>
    </Carousel.Item>
    <Carousel.Item>
      <Link to={`/movies/${data.results[7].id}`} style={{ textDecoration: "none", color: "white"}}>
            <div style={{
          backgroundImage: "url(" + `https://image.tmdb.org/t/p/original${data?.results[7].backdrop_path}` + ")"}} className='banner'>
                <div className='text-area'>
                    <h1>{data.results[7].title}</h1>
                    <div className="text-description">
                        <p>{data.results[7].overview}</p>
                    </div>
                </div>
            </div>
      </Link>
    </Carousel.Item>
    <Carousel.Item>
      <Link to={`/movies/${data.results[12].id}`} style={{ textDecoration: "none", color: "white"}}>
          <div style={{
        backgroundImage: "url(" + `https://image.tmdb.org/t/p/original${data?.results[12].backdrop_path}` + ")"}} className='banner'>
              <div className='text-area'>
                  <h1>{data.results[12].title}</h1>
                  <div className="text-description">
                      <p>{data.results[12].overview}</p>
                  </div>
              </div>
          </div>
      </Link>
    </Carousel.Item>
    <Carousel.Item>
      <Link to={`/movies/${data.results[19].id}`} style={{ textDecoration: "none", color: "white"}}>
        <div style={{
      backgroundImage: "url(" + `https://image.tmdb.org/t/p/original${data?.results[19].backdrop_path}` + ")"}} className='banner'>
            <div className='text-area'>
                <h1>{data.results[19].title}</h1>
                <div className="text-description">
                    <p>{data.results[19].overview}</p>
                </div>
            </div>
        </div>
      </Link>
    </Carousel.Item>
</Carousel>
  )
}

export default Banner