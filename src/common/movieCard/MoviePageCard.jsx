import React from 'react'
import { Badge } from 'react-bootstrap'
import "./MovieCard.style.css"
import { useNavigate } from 'react-router-dom'
import { useShowGenre } from '../../hooks/useShowGenre'
import StarIcon from '@mui/icons-material/Star';
import "./MoviePageCard.style.css";

const MovieCard = ({movie, key}) => {

  const navigate = useNavigate();

  const goToDetail = () =>{
    navigate(`/movies/${movie.id}`);
  }

  const {showGenre} = useShowGenre();

  return (
    <div style={{backgroundImage: "url(" + `https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}` + ")"}} className='movie-cards' onClick={goToDetail}>
      <div className='over-lay'>
        <h2 className='movie-title'>{movie.title}</h2>
        <div className='movie-genre'>
        {showGenre(movie.genre_ids).map((id) =>  <Badge bg="danger">{id}</Badge>)}
        </div>
        <div className='movie-ratings'>
          <div><StarIcon/></div>
          <div>{movie.vote_average}</div>
        </div>
      </div>
    </div>
  )
}

export default MovieCard