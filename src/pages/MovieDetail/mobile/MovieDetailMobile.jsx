import React, { useEffect, useRef, useState } from 'react'
import { useMovieDetailQuery } from '../../../hooks/useMovieDetail';
import { useParams } from 'react-router-dom';
import { Alert, Badge } from 'react-bootstrap';
import "./MovieDetailMobile.style.css";
import { useMovieAgeQuery } from '../../../hooks/useMovieAge';

const MovieDetailWeb = () => {

  //id읽어오기
  const { id } = useParams();
  const {data, isLoading, isError, error} = useMovieDetailQuery({id});
  const {data:ageData} = useMovieAgeQuery({id});

  //텍스트 더보기/접기
  const [isOpen, setIsOpen] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isMeasured, setIsMeasured] = useState(false)
  const overviewRef = useRef(null);

  const handleOpenClick = () => {
    setIsOpen(prev => !prev)
  }

  //관람연령 읽어오기
  const showAge = (ageData) => {
    const ageObj = ageData?.find((item) => {return item.iso_3166_1 === "KR"})
    return ageObj?.release_dates[0].certification;
  }

  //5줄 넘어가면 자르고 더보기버튼 띄우기
  useEffect(() => {
    if (overviewRef.current) {
      const lineHeight = parseFloat(window.getComputedStyle(overviewRef.current).lineHeight)
      const maxHeight = lineHeight * 5
      const scrollHeight = overviewRef.current.scrollHeight

      if (scrollHeight > maxHeight) {
        setIsOverflowing(true)
      }
      setIsMeasured(true)
    }
  }, [data?.overview])

  if(isLoading){
    return <h1>Loading...</h1>
  }

  if(isError){
    return <Alert key="danger" variant="danger">{error.message}</Alert>
  }

  return (
    <div>
      <div style={{backgroundImage: "url(" + `https://image.tmdb.org/t/p/original${data.backdrop_path}` + ")"}} className="detail-img-mobile"/>
      <div className='detail-container'>
        <h1>{data.title}</h1>
        <div className='movie-info'>
          <div>{data.release_date.slice(0, 4)}</div>
          <div>{`${data.runtime}분`}</div>
          <div>{showAge(ageData)? showAge(ageData) : "미정"}</div>
        </div>
        <div className='genre-badge'>{data.genres.map((item) =>  <Badge bg="danger">{item.name}</Badge>)}</div>
        <div className={`movie-overview ${isOpen ? 'expanded' : isMeasured ? 'clamped' : ''}`}>
          <p ref={overviewRef}>{data.overview}</p>
          {isOverflowing && (
            <div className="more-button-area">
              <button onClick={handleOpenClick}>
                {isOpen ? "접기" : "더보기"}
              </button>
            </div>
          )}
        </div>
        <div className='button-area'><button>트레일러 보기</button></div>
      </div>
    </div>
  )
}

export default MovieDetailWeb