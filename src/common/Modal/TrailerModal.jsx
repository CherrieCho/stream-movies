import React from 'react'
import { Alert } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useVideoQuery } from '../../hooks/useMovieVids';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';

const TrailerModal = (show, onHide) => {
  const { id } = useParams();
  const {data, isLoading, isError, error} = useVideoQuery({id});
  console.log(data);

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      controls: 1,
    },
  };

  if(isLoading){
    return (
      <Modal
      {...show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      data-bs-theme="dark"
    >
      <Modal.Header closeButton/>
      <Modal.Body>
        <h1>Loading...</h1>
      </Modal.Body>
    </Modal>
    )
  }

  if(isError){
    return  (
      <Modal
      {...show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      data-bs-theme="dark"
    >
      <Modal.Header closeButton/>
      <Modal.Body>
        <Alert key="danger" variant="danger">{error.message}</Alert>
      </Modal.Body>
    </Modal>
    )
  }

  return (
    <div>
      <Modal
      {...show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      data-bs-theme="dark"
    >
      <Modal.Header closeButton/>
      <Modal.Body>
        <div style={{textAlign: "center"}}>
        <YouTube videoId={data.results[0].key} opts={opts} />
        </div>
      </Modal.Body>
    </Modal>
    </div>
  )
}

export default TrailerModal