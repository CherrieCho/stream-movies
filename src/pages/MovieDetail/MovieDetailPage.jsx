import React from 'react'
import { useMovieDetailQuery } from '../../hooks/useMovieDetail';
import { useParams } from 'react-router-dom';
import { Alert, Badge } from 'react-bootstrap';
import "./MovieDetailPage.style.css";

const MovieDetailPage = () => {
  //id읽어오기
  const { id } = useParams();

  const {data, isLoading, isError, error} = useMovieDetailQuery({id});
  console.log("데이터:", data);

  if(isLoading){
    return <h1>Loading...</h1>
  }

  if(isError){
    return <Alert key="danger" variant="danger">{error.message}</Alert>
  }

  return (
    <div style={{backgroundImage: "url(" + `https://image.tmdb.org/t/p/original${data.backdrop_path}` + ")"}} className='detail-img'>
      <h1>{data.title}</h1>
      <div>{data.release_date.slice(0, 4)}</div>
      <div>{`${data.runtime} minutes`}</div>
      <div>{data.genres.map((item) =>  <Badge bg="danger">{item.name}</Badge>)}</div>
      <div><p>{data.overview}</p></div>
      

    </div>
  )
}

export default MovieDetailPage