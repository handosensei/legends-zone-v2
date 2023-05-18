import React, {useState} from 'react';
import {Button, Card, CardBody, Col, Container, Input, Row} from 'reactstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import PreviewCardSimpleHeader from "../../Components/Common/PreviewCardSimpleHeader";
import PetsPlayer from "./PetsPlayer";
import 'video.js/dist/video-js.css';

const Claim = () => {

  const [defaultCounter, setdefaultCounter] = useState(0);
  const [maxClaim, setMaxClaim] = useState(0);

  const videoSources = [
    {src: 'https://meta-life.io/img/gallery/wildlife/video/4.mp4', type: 'video/mp4'},
    {src: 'https://meta-life.io/img/gallery/wildlife/video/5.mp4', type: 'video/mp4'},
    {src: 'https://meta-life.io/img/gallery/wildlife/video/6.mp4', type: 'video/mp4'},
    {src: 'https://meta-life.io/img/gallery/wildlife/video/7.mp4', type: 'video/mp4'},
  ];

  function countUP(id, prev_data_attr) {
    id(prev_data_attr + 1);
  }

  function countDown(id, prev_data_attr) {
    if (prev_data_attr > 1) {
      id(prev_data_attr - 1);
    }
  }

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

            <Col xl={3}>
              <Card>
                <PreviewCardSimpleHeader title="Claimable"/>
                <CardBody>
                  <div className="live-preview">
                    <ul className="list-group">
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Perk mint package
                        <div className="flex-shrink-0">
                          <span className="text-muted">(soon)</span>
                        </div>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Top 10 Whale
                        <div className="flex-shrink-0">
                          <span className="text-muted">(soon)</span>
                        </div>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Honorary
                        <div className="flex-shrink-0">
                          <span className="text-muted">(soon)</span>
                        </div>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Council
                        <div className="flex-shrink-0">
                          <span className="text-muted">(soon)</span>
                        </div>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        OG
                        <div className="flex-shrink-0">
                          <span className="text-muted">(soon)</span>
                        </div>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Judge
                        <div className="flex-shrink-0">
                          <span className="text-muted">(soon)</span>
                        </div>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Guardian
                        <div className="flex-shrink-0">
                          <span className="text-muted">(soon)</span>
                        </div>
                      </li>
                    </ul>
                    <ul className="list-group mt-3">
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Total to claim
                        <div className="flex-shrink-0">
                          <span className="text-muted">(soon)</span>
                        </div>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Remains to be claimed
                        <div className="flex-shrink-0">
                          <span className="text-muted">(soon)</span>
                        </div>
                      </li>
                    </ul>
                    <div className="d-grid gap-2 mt-3">
                      <div className="input-step full-width">
                        <button
                        type="button"
                        className="minus"
                        // onClick={() => {
                        //   countDown(setdefaultCounter, defaultCounter);
                        // }}
                        >
                          –
                        </button>
                        <Input
                        type="number"
                        className="product-quantity"
                        value={defaultCounter}
                        min="0"
                        max="100"
                        readOnly
                        />
                        <button
                        type="button"
                        className="plus"
                        // onClick={() => {
                        //   countUP(setdefaultCounter, defaultCounter);
                        // }}
                        >
                          +
                        </button>
                      </div>
                      <button className="btn btn-light">Max</button>
                      <button className="btn btn-light">Claim</button>
                    </div>
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
