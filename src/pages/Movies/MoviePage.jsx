import React, { useEffect, useState } from 'react'
import { useSearchMovieQuery } from '../../hooks/useSearchMovies'
import { useSearchParams } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import MoviePageCard from '../../common/movieCard/MoviePageCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./MoviePage.style.css";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useMovieGenreQuery } from '../../hooks/useMoviegenre';

//1. movies 카테고리 클릭해서 진입(popular영화 보여주기)
//2. 키워드 검색해서 진입
const MoviePage = () => {
  const [switchGenre, setSwitchGenre] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [sortData, setSortData] = useState([]);
  const [page, setPage] = useState(1);
  const [sortTitle, setSortTitle] = useState('인기순');
  const [genreSortTitle, setGenreSortTitle] = useState('전체 장르');
  const [query, setQuery] = useSearchParams();
  const { data: genreData } = useMovieGenreQuery();

  //url에서 쿼리값 읽어와서 키워드로 설정하고 서치훅에 넘겨주기
  const keyword = query.get("q");
  const {data, isLoading, isError, error} = useSearchMovieQuery({keyword, page});

  //데이터 정렬하기
  const handleSortPopular = () => {
    const sorted = [...filteredData].sort((a, b) => b.popularity - a.popularity); //인기도 숫자 내림차순
    setSortData(sorted);
    setSortTitle('인기순');
  };
  
  const handleSortLatest = () => {
    const sorted = [...filteredData].sort((a, b) => new Date(b.release_date) - new Date(a.release_date)); //날짜 내림차순
    setSortData(sorted);
    setSortTitle('최신순');
  };
  
  const handleSortABC = () => {
    const sorted = [...filteredData].sort((a, b) => a.title.localeCompare(b.title));
    setSortData(sorted);
    setSortTitle('가나다순');
  };

  const handleSortGenre = (selectedID, selectedName) => {
    const filtered = [...data.results].filter((item) => item.genre_ids.includes(selectedID));
    setFilteredData(filtered);
    setSortData(filtered); // 필터링 결과를 정렬 기준 없이 먼저 보여줌
    setGenreSortTitle(selectedName);
    setPage(1);
    setSwitchGenre(true);
  }

  const resetGenre = () => {
    setFilteredData(data.results);
    setSortData(data.results);
    setGenreSortTitle('전체 장르');
    setSwitchGenre(false);
    setPage(1);
  }

  //전체페이지 수 계산
  const totalPages = () => {
    if(!switchGenre){
      if(data?.total_pages > 500){
        return 500;
      } else{
        return data.total_pages;
      }
    } else{
      if(Math.ceil(filteredData.length / 20) === 0){
        return 1;
      } else{
        return Math.ceil(filteredData.length / 20);
      }
    }
  }

  //클릭한 숫자로 페이지 바꾸기
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  //keyword가 바뀌면 페이지 초기화
  useEffect(() => {
    setPage(1);
    if (keyword) {
      setSortTitle('정렬');
    } else {
      setSortTitle('인기순');
    }
  }, [keyword]);

  //데이터 로드될때마다 필터링-정렬안된 기본데이터로 초기화
  useEffect(() => {
    if (data?.results) {
      setFilteredData(data.results);
      setSortData(data.results);
      setGenreSortTitle('전체 장르');
      setSwitchGenre(false);
      if (keyword) {
        setSortTitle('정렬');
      } else {
        setSortTitle('인기순');
      }
    }
  }, [data]);

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
    return <h1>검색 결과가 없습니다.</h1>
  }
  return (
    <div>
      <div className='dropdowns'>
        <div className='top-info'>
          <div className='section-title'>
            {keyword? <h1>Search Results</h1> : <h1>Movies</h1>}
          </div>
          <div>
          <DropdownButton id="dropdown-basic-button" title={genreSortTitle} variant="secondary" data-bs-theme="dark" className={keyword ? "hidden" : ""}>
            {genreData?.map((item) => <Dropdown.Item onClick={() => handleSortGenre(item.id, item.name)}>{item.name}</Dropdown.Item>)}
            <Dropdown.Item onClick={resetGenre}>전체 장르</Dropdown.Item>
          </DropdownButton>
          </div>
        </div>
      </div>
      <Container>
        <div className='dropdown-sort'>
          <DropdownButton id="dropdown-basic-button-sort" title={sortTitle} data-bs-theme="dark">
            <Dropdown.Item onClick={handleSortPopular}>인기순</Dropdown.Item>
            <Dropdown.Item onClick={handleSortLatest}>최신순</Dropdown.Item>
            <Dropdown.Item onClick={handleSortABC}>가나다순</Dropdown.Item>
          </DropdownButton>
        </div>
        <Row>
          {sortData?.map((movie, index) => (
            <Col xl={3} md={4} sm={6} key={index} className='movie-result'>
              <MoviePageCard movie={movie} key={index}/>
            </Col>
          ))}
        </Row>
        <Row>
          <Col className="d-flex justify-content-center mt-4">
          <Stack spacing={2}>
              <Pagination
                count={totalPages()}
                page={page}
                onChange={handlePageChange}
                size={paginationSize}
                color='secondary'
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