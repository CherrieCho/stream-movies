import React from 'react'
import { Badge } from 'react-bootstrap'
import "./MovieCard.style.css"
import { useMovieGenreQuery } from '../../hooks/useMoviegenre'

const MovieCard = ({movie, key}) => {

  //콜론으로 이름 재정의
  const {data:genreData} = useMovieGenreQuery();

  //장르id를 장르명(텍스트)로 변환시켜주는 함수
  const showGenre = (genreIDList) => {
    if(!genreData) return [];
    const genreNameList = genreIDList.map((id) => {
      //genreData의 id와 해당 영화의 장르 id가 일치하는 요소(객체)를 genreData 배열에서 찾음
      const genreObj = genreData.find(genre => genre.id === id);
      //그 중에서 장르이름 key만 리턴(장르id배열의 요소가 장르명으로 바뀜)
      return genreObj.name;
    });

    return genreNameList
  }




  return (
    <div style={{backgroundImage: "url(" + `https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}` + ")"}} className='movie-card'>
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