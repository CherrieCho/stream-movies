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
        <Link to={`/movies/${data.results[2].id}`} style={{ textDecoration: "none", color: "white"}}>
          <div style={{
        backgroundImage: "url(" + `https://image.tmdb.org/t/p/original${data?.results[2].backdrop_path}` + ")"}} className='banner'>
              <div className='wrapText'>
                  <h1>{data.results[2].title}</h1>
                  <div className="d-none d-md-block">
                      <p>{data.results[2].overview}</p>
                  </div>
              </div>
          </div>
        </Link>
    </Carousel.Item>
    <Carousel.Item>
      <Link to={`/movies/${data.results[4].id}`} style={{ textDecoration: "none", color: "white"}}>
            <div style={{
          backgroundImage: "url(" + `https://image.tmdb.org/t/p/original${data?.results[4].backdrop_path}` + ")"}} className='banner'>
                <div className='wrapText'>
                    <h1>{data.results[4].title}</h1>
                    <div className="d-none d-md-block">
                        <p>{data.results[4].overview}</p>
                    </div>
                </div>
            </div>
      </Link>
    </Carousel.Item>
    <Carousel.Item>
      <Link to={`/movies/${data.results[12].id}`} style={{ textDecoration: "none", color: "white"}}>
          <div style={{
        backgroundImage: "url(" + `https://image.tmdb.org/t/p/original${data?.results[12].backdrop_path}` + ")"}} className='banner'>
              <div className='wrapText'>
                  <h1>{data.results[12].title}</h1>
                  <div className="d-none d-md-block">
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
            <div className='wrapText'>
                <h1>{data.results[19].title}</h1>
                <div className="d-none d-md-block">
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