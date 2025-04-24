import React from 'react'
import { Badge } from 'react-bootstrap'
import "./MovieCard.style.css"
import { useNavigate } from 'react-router-dom'
import { useShowGenre } from '../../hooks/useShowGenre'

const MovieCard = ({movie, key}) => {

  const navigate = useNavigate();

  const goToDetail = () =>{
    navigate(`/movies/${movie.id}`);
  }

  const {showGenre} = useShowGenre();

  return (
    <div style={{backgroundImage: "url(" + `https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}` + ")"}} className='movie-card' onClick={goToDetail}>
      <div className='overlay'>
        <h1>{movie.title}</h1>
        {showGenre(movie.genre_ids).map((id) =>  <Badge bg="danger">{id}</Badge>)}
        <div>
          <div>{movie.vote_average}</div>
          <div>{movie.popularity}</div>
        </div>
      </div>
    </div>
  )
}

export default MovieCard