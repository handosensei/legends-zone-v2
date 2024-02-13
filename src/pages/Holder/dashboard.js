import React, { useState, useEffect } from 'react';
import {Card, CardBody, CardHeader, Col, Row} from 'reactstrap';

import BarGraph from "./bar-graph";

import {getHolderLegends} from "../../client/ApiMetaLegends";

const Dashboard = ({holderWallet}) => {

  const [legends, setLegends] = useState([]);

  useEffect(() => {
    getHolderLegends(holderWallet).then((response) => {
      setLegends(response);
    });
  }, []);

  return (
    <React.Fragment>
      <Row>


      </Row>
    </React.Fragment>
  );
}

export default Dashboard;
