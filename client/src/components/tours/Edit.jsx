// Fill in the missing code
import React, { useState, useEffect } from 'react';
import { Form, Container } from 'react-bootstrap';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

const Edit = function (props) {

  const id = props.location.state.id;

  const [tourTypes, setTourTypes] = useState([]);

  useEffect(() => {
    (async () => {
      await getTourTypes();
    })();
  }, []);

  const getTourTypes = async () => {
    const toursResponse = await Axios.get('/api/tours/tourTypes');
    if (toursResponse.status === 200) setTourTypes(toursResponse.data);
  };

  const [inputs, setInputs] = useState({
    title: '',
    tourType: '',
    groupSize: '',
    date: ''
  });

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    (async () => {
      const tourResponse = await Axios.get(`/api/tours/${id}`);
      if (tourResponse.status === 200) {
        setInputs(tourResponse.data)
      };
    })();
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await Axios.post('/api/tours/update', inputs);

      if (response.status === 200)  {
        toast("The tour was successfully updated ", {
          type: toast.TYPE.SUCCESS
        });
        setRedirect(true);
      } else {
        toast("There was an error while updating this tour", {
          type: toast.TYPE.ERROR
        });
      }
    } catch (error) {
      toast("There was an error while updating this tour", {
        type: toast.TYPE.ERROR
      });
    }
  };

  const handleInputChange = async event => {
    event.persist();

    const { name, value } = event.target;

    setInputs(inputs => ({
      ...inputs,
      [name]: value
    }));
  };

  if (redirect) return (<Redirect to="/tours"/>);

  return (
    <Container className="my-5">
      <header>
        <h1>Edit Tour</h1>
      </header>

      <hr/>

      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Title:</Form.Label>
            <Form.Control
              name="title"
              onChange={handleInputChange}
              value={inputs.title}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Tour Type:</Form.Label>
            <Form.Control
              as="select"
              name="tourType"
              onChange={handleInputChange}
              defaultValue={inputs.tourType}
            >
              {tourTypes.map((type, i) => (
                <option key={i} value={type}>{type}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Group Size:</Form.Label>
            <Form.Control
              type="number"
              name="groupSize"
              step="1"
              min="1"
              max="10"
              onChange={handleInputChange}
              value={inputs.groupSize}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Date:</Form.Label>
            <Form.Control
              type="date"
              name="date"
              onChange={handleInputChange}
              value={inputs.date}
            />
          </Form.Group>

          <Form.Group>
            <button type="submit" className="btn btn-primary">Update</button>
          </Form.Group>
        </Form>
      </div>
    </Container>
  );
};

export default Edit;