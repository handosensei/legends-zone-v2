import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
  Row
} from 'reactstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import SimpleBar from 'simplebar-react';
import { Link } from 'react-router-dom';
import List from 'list.js';
//Import Flatepicker
import Flatpickr from "react-flatpickr";
import ModalBadgeReward from "../Progress/ModalBadgeReward";


const Holder = () => {
  const [isLoad, setIsLoad] = useState(false);

  document.title = "Holders list | Legends Zone";

  const handleChange = (event) => {
    const value = event.target.value;
    if (value.trim().length === 42) {
      setIsLoad(true);

      /*
          test if holder
          - list mint package
          - list og pet
          - list og vehicle
          - list LZ rewards

          list asset
          - list ML
          - list og armor
          - list og pet
          - list og vehicle
       */
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Holders" pageTitle="Home" />
          <Row>
            <Col>
              <Card>
                <CardHeader className="align-items-center d-flex">
                  <h4 className="card-title mb-0 flex-grow-1">Search holder data</h4>
                </CardHeader>
                <CardBody>
                  <div className="input-group">
                    <span className="input-group-text" id="inputGroup-sizing-sm">Holder wallet</span>
                    <Input type="text" className="form-control" aria-describedby="inputGroup-sizing-default"
                           onChange={handleChange} />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>


        </Container>
      </div>
    </React.Fragment>
  );
}

export default Holder;