import React from 'react';
import {Card, CardBody, Col, Container, Row} from 'reactstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import PreviewCardSimpleHeader from "../../Components/Common/PreviewCardSimpleHeader";
import PetsPlayer from "./PetsPlayer";
import 'video.js/dist/video-js.css';

const Claim = () => {

  const videoSources = [
    {src: 'https://meta-life.io/img/gallery/wildlife/video/4.mp4', type: 'video/mp4'},
    {src: 'https://meta-life.io/img/gallery/wildlife/video/5.mp4', type: 'video/mp4'},
    {src: 'https://meta-life.io/img/gallery/wildlife/video/6.mp4', type: 'video/mp4'},
    {src: 'https://meta-life.io/img/gallery/wildlife/video/7.mp4', type: 'video/mp4'},
  ];

  document.title = "Claim Pet | Legends Zone";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Pet" pageTitle="Claim"/>
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

            <Col xl={3}>
              <Card>
                <PreviewCardSimpleHeader title="Claimable"/>
                <CardBody>
                  <div className="live-preview">
                    <ul className="list-group">
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Perk mint package
                        <div className="flex-shrink-0">
                          <span className="text-success">2</span>
                        </div>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Top 10 Whale
                        <div className="flex-shrink-0">
                          <span className="text-success">0</span>
                        </div>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Honorary
                        <div className="flex-shrink-0">
                          <span className="text-success">0</span>
                        </div>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Council
                        <div className="flex-shrink-0">
                          <span className="text-success">0</span>
                        </div>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Judge
                        <div className="flex-shrink-0">
                          <span className="text-success">0</span>
                        </div>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Guardian
                        <div className="flex-shrink-0">
                          <span className="text-success">0</span>
                        </div>
                      </li>
                    </ul>
                  </div>

                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Claim;
