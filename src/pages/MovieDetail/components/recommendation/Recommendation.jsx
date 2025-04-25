import React from 'react'
import { useParams } from 'react-router-dom';
import { useRecommendationsQuery } from '../../../../hooks/useRecommendations';
import MovieSlider from '../../../../common/movieSlide/MovieSlider';
import { Alert } from 'react-bootstrap';

const Recommendation = () => {
  //id읽어오기
  const { id } = useParams();
  const {data, isLoading, isError, error} = useRecommendationsQuery({id});

  if(isLoading){
    return <h1>Loading...</h1>
  }

  if(isError){
    return <Alert key="danger" variant="danger">{error.message}</Alert>
  }

  return (
    <div>
      <MovieSlider title="이 영화는 어떠세요?" movies={data.results}/>
    </div>
  )
}

export default Recommendation