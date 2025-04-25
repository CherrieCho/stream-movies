import React from 'react'
import { useShowReviewsQuery } from '../../../../hooks/useShowReviews';
import { useParams } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

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
      <div>
        {data.results.map((item) => <div>{item.content}</div>)}
      </div>
    </div>
  )
}

export default Reviews