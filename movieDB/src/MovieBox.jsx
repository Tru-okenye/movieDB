import React, {useState} from 'react';
import{ Modal } from 'react-bootstrap';
const API_IMG ="https://image.tmdb.org/t/p/w500/"
 
const MovieBox = ({title, poster_path, vote_average, release_date, overview}) => {
    const [show, setShow] =useState(false)
    const handleShow =()=> setShow(true)
    const handleClose =()=> setShow(false)
  return (
    <div className='card text-center bg-secondary mb-3'>
        <div className="card-body">
            <img src={API_IMG+poster_path} alt="" className="card-img-top" />
            <div className="card-body">
                <button type='button'  className="btn btn-dark" onClick={handleShow}>View More</button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                         <img src={API_IMG+poster_path} alt="" className="card-img-top" />
                        <h3>{title}</h3>
                        <h4>ImDb: {vote_average}</h4>
                        <h5>Release date: {release_date}</h5>
                        <br></br>
                        <h6>Overview</h6>
                        <p>{overview}</p>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
        </div>
  )
}

export default MovieBox