import React, { useEffect, useState } from 'react'
import { useSearchMovieQuery } from '../../hooks/useSearchMovies'
import { useSearchParams } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import MovieCard from '../../common/movieCard/MovieCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./MoviePage.style.css";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

//1. movies 카테고리 클릭해서 진입(popular영화 보여주기)
//2. 키워드 검색해서 진입
const MoviePage = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useSearchParams();
  //url에서 쿼리값 읽어와서 키워드로 설정하고 서치훅에 넘겨주기
  const keyword = query.get("q");
  const {data, isLoading, isError, error} = useSearchMovieQuery({keyword, page});


  const handlePageChange = (event, value) => {
    setPage(value);
  };

  //keyword가 바뀌면 페이지 초기화
  useEffect(() => {
    setPage(1);
  }, [keyword]);

  //페이지네이션 크기조절
  const getSize = () => window.innerWidth < 576 ? "small" : "medium";
  const [paginationSize, setPaginationSize] = useState(getSize());
  
  useEffect(() => {
    const handleResize = () => {
      setPaginationSize(getSize());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if(isLoading){
    return <h1>Loading...</h1>
  }

  if(isError){
    return <Alert key="danger" variant="danger">{error.message}</Alert>
  }

  if(data.total_results === 0){
    return <h1>No Results Found</h1>
  }
  return (
    <div>
      <div>
        {keyword? <h3>Search Results</h3> : <h3>Movies</h3>}
      </div>
      <Container>
        <Row>
          {data?.results.map((movie, index) => (
            <Col xl={3} md={6} key={index} className='movie-result'>
              <MovieCard movie={movie} key={index}/>
            </Col>
          ))}
        </Row>
        <Row>
          <Col className="d-flex justify-content-center mt-4">
          <Stack spacing={2}>
              <Pagination
                count={data?.total_pages > 500 ? 500 : data.total_pages}
                page={page}
                onChange={handlePageChange}
                size={paginationSize}
                color="primary"
                sx={{
                  '& .MuiPaginationItem-root': {
                    color: 'white', // 텍스트 색상 변경
                  }
                }}
                showFirstButton
                showLastButton
              />
            </Stack>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default MoviePage