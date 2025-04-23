import React, { useEffect, useState } from 'react'
import { useSearchMovieQuery } from '../../hooks/useSearchMovies'
import { useSearchParams } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import MovieCard from '../../common/movieCard/MovieCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ReactPaginate from 'react-paginate';
import "./MoviePage.style.css";

//1. movies 카테고리 클릭해서 진입(popular영화 보여주기)
//2. 키워드 검색해서 진입
const MoviePage = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useSearchParams();
  //url에서 쿼리값 읽어와서 키워드로 설정하고 서치훅에 넘겨주기
  const keyword = query.get("q");
  console.log(keyword);
  const {data, isLoading, isError, error} = useSearchMovieQuery({keyword, page});


  const handlePageClick = ({selected}) => {
    setPage(selected + 1);  //선택한 페이지로 바꿔주기(3을 선택하면 2로 인식해서 +1 해줘야함)
  }

  //keyword가 바뀌면 페이지 초기화
  useEffect(() => {
    setPage(1);
  }, [keyword]);

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
            <Col xl={3} lg={4} md={6} key={index}>
              <MovieCard movie={movie} key={index}/>
            </Col>
          ))}
        </Row>
        <Row>
          <Col>
          <ReactPaginate
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        pageCount={data?.total_pages > 500 ? 500 : data.total_pages}  //전체페이지
        forcePage={page-1}  //현재페이지(0부터 카운트함)
        previousLabel="<"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default MoviePage