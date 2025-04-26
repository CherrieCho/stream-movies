import React from 'react'
import { useShowReviewsQuery } from '../../../../hooks/useShowReviews';
import { useParams } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import ReviewCard from './ReviewCard';

const Reviews = () => {
  //id읽어오기
  const { id } = useParams();
  const {data, isLoading, isError, error} = useShowReviewsQuery({id});

  console.log(data);

  if(isLoading){
    return <h1>Loading...</h1>
  }

  if(isError){
    return <Alert key="danger" variant="danger">{error.message}</Alert>
  }

  return (
    <div>
      {data.results.length === 0 ? <h3>등록된 리뷰가 없습니다.</h3> :
      <div>
        {data.results.map((item) => <ReviewCard key={item.id} author={item.author} content={item.content} />)}
      </div>}
    </div>
  )
}

export default Reviews