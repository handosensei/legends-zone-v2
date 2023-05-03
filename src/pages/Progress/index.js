import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import AssetStaked from "./AssetStaked";
import BadgeReward from "./BadgeReward";

const Progress = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Progress" pageTitle="Dashboards"/>
          <Row>
            <Col>
              <div className="h-100">
                <Row>
                  <AssetStaked />
                  <BadgeReward />
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default Progress;