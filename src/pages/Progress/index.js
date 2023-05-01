import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import AssetStaked from "./AssetStaked";

const Progress = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Progress" pageTitle="Dashbord"/>
          <Row>
            <Col>
              <div className="h-100">
                <Row>
                  <AssetStaked />
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