import React from 'react';
import {Card, CardBody, Col, Container, Row} from 'reactstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import PreviewCardHeader from "../../Components/Common/PreviewCardHeader";
import IndividualInterval from "../BaseUi/UiCarousel/CarouselTypes/individualInterval";
import {InduvidualIntervalExample} from "../BaseUi/UiCarousel/UiCarouselCode";

const Claim = () => {
  document.title = "Projects | Velzon - React Admin & Dashboard Template";
  return (<React.Fragment>
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Projects" pageTitle="Dashboards"/>
        <Row>
          <Col xl={6}>
            <Card>
              <PreviewCardHeader title="Individual carousel-item Interval"/>
              <CardBody>
                <div className="live-preview">
                  <IndividualInterval/>
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