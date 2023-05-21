import React, {useEffect, useState} from 'react';
import {Button, Card, CardBody, Col, Container, Input, Row} from 'reactstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import PreviewCardSimpleHeader from "../../Components/Common/PreviewCardSimpleHeader";
import PetsPlayer from "./PetsPlayer";
import EligibilityOgPet from "./EligibilityOgPet";

import 'video.js/dist/video-js.css';

const Claim = () => {

  const videoSources = [
    {src: 'https://meta-life.io/img/gallery/wildlife/video/4.mp4', type: 'video/mp4'},
    {src: 'https://meta-life.io/img/gallery/wildlife/video/5.mp4', type: 'video/mp4'},
    {src: 'https://meta-life.io/img/gallery/wildlife/video/6.mp4', type: 'video/mp4'},
    {src: 'https://meta-life.io/img/gallery/wildlife/video/7.mp4', type: 'video/mp4'},
  ];

  document.title = "Claim \"OG Pets\" | Legends Zone";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="OG Pets" pageTitle="Claim"/>
          <Row>

            <Col xl={9}>
              <Card>
                <CardBody>
                  <div className="ratio ratio-16x9">
                    <PetsPlayer sources={videoSources}/>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <EligibilityOgPet />

          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Claim;
