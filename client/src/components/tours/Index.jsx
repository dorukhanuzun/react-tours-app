// Fill in the missing code
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Index = function ({user}) {

  const [tours, setTours] = useState([]);

  useEffect(() => {
    (async () => {
      await getTours();
    })();
  }, []);

  const getTours = async() => {
    const tourResponse = await Axios.get('/api/tours');
    if(tourResponse.status === 200){
      setTours(tourResponse.data);
    }
  };

  const deleteTour = async tour => {
    try{
      const response = await Axios.post('/api/tours/delete', {
        id: tour._id
      });

      if (response.status === 200) {
        toast("The tour was successfully deleted!!!",
        {type: toast.TYPE.SUCCESS})};

      await getTours();  
      }catch(error){
        toast("There was an error while deleting this tour!!!",
        {type: toast.TYPE.ERROR});
      }
    }
  

  return (
    <Container className="my-5">
      <header>
        <h1>Tours</h1>
      </header>

      <hr/>

      <div className="content">
        {tours && tours.map((tour, i) => (
          <div key={i} className="card my-3">
            <div className="card-header">
              <h5 className="card-title">
                {tour.title}
              </h5>
            </div>

            <div className="card-body">
              <p className="card-text">
                A {tour.groupSize} {tour.groupSize > 1 ? 'people' : 'person'} group for the "{tour.tourType}" haunted tour on the date of {tour.date}.
              </p>
            </div>

            {user ? (
              <div className="card-footer">
                <Link to={{
                  pathname: "/tours/edit",
                  state: {
                    id: tour._id
                  }
                }}>
                  <i className="fa fa-edit"></i>
                </Link>

                <button type="button" onClick={() => deleteTour(tour)}>
                  <i className="fa fa-trash"></i>
                </button>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </Container>
  );

};

export default Index;