import React, {useEffect, useState} from 'react';
import {Card, CardBody, Col, Container, Row} from "reactstrap";

import {getWeb3Data} from "../../../Components/Common/LibWeb3";

import WarningEthereum from "../../../Components/Modal/WarningEthereum";
import BreadCrumb from "../../../Components/Common/BreadCrumb";

const Lands = () => {

  return (
    <React.Fragment>

      <WarningEthereum />

      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="OG Lands" pageTitle="Claim"/>
        </Container>
      </div>

    </React.Fragment>
  );
}

export default Lands;
