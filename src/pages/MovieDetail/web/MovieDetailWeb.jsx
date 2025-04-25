import React, { useEffect, useState } from 'react'
import { useMovieDetailQuery } from '../../../hooks/useMovieDetail';
import { useParams } from 'react-router-dom';
import { Alert, Badge } from 'react-bootstrap';
import "./MovieDetailWeb.style.css";
import { useMovieAgeQuery } from '../../../hooks/useMovieAge';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const MovieDetailWeb = () => {
  const [isWide, setIsWide] = useState(window.innerWidth > 1392);
  const [isOpen, setIsOpen] = useState(false);

  //더보기-접기 버튼
  const handleOpenClick = () => {
    setIsOpen((prev) => !prev);
  }

  //화면너비 감지
  useEffect(() => {
    const handleResize = () => setIsWide(window.innerWidth > 1392);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //id읽어오기
  const { id } = useParams();
  const {data, isLoading, isError, error} = useMovieDetailQuery({id});
  const {data:ageData} = useMovieAgeQuery({id});

  //관람연령 읽어오기
  const showAge = (ageData) => {
    const ageObj = ageData?.find((item) => {return item.iso_3166_1 === "KR"})
    return ageObj?.release_dates[0].certification;
  }

  if(isLoading){
    return <h1>Loading...</h1>
  }

  if(isError){
    return <Alert key="danger" variant="danger">{error.message}</Alert>
  }

  return (
    <div style={{backgroundImage: "url(" + `https://image.tmdb.org/t/p/original${data.backdrop_path}` + ")"}} className={`detail-img ${isOpen ? "expanded" : ""}`}>
      <Box sx={{ flexGrow: 1, height: isOpen? "auto" : "56vh", width: "100vw", padding: "0 4rem",}}>
          <Grid
            container
            direction="row"
            sx={{
              alignItems: "center",
              height: "100%",
              width: "100%"
            }}
          >
              <Grid
                size={6}
                sx={{
                  padding: "2rem",
                }}
              >
                <h1 className='data-title'>{data.title}</h1>
                <div className='movie-info'>
                  <div>{showAge(ageData)? showAge(ageData) : "미정"}</div>
                  <div>{data.release_date.slice(0, 4)}</div>
                  <div>{`${data.runtime}분`}</div>
                </div>
                <div className='genre-badge'>{data.genres.map((item) =>  <Badge bg="danger">{item.name}</Badge>)}</div>
                <div className='overview'><p className={`movie-description ${isOpen ? 'expanded' : ''}`}>{data.overview}</p></div>
                {!isWide && <button onClick={handleOpenClick}>{isOpen? "닫기" : "더보기"}</button>}
              </Grid>
              <Grid size={2}></Grid>
              <Grid 
              size={4}
              sx={{
                padding: "2rem",
                display: "flex",
                justifyContent: "center",
              }}
              >
                <img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${data.poster_path}`} className='poster-img'/>
              </Grid>
          </Grid>
      </Box>
    </div>
  )
}

export default MovieDetailWeb