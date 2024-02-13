import React, { useState, useEffect } from 'react';
import {Card, CardBody, CardHeader, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import classnames from "classnames";
import Dashboard from "./dashboard";
import BarGraph from "./bar-graph";

const Details = ({holderWallet}) => {

  const [topBorderjustifyTab, settopBorderjustifyTab] = useState("1");
  const topBorderJustifytoggle = (tab) => {
    if (topBorderjustifyTab !== tab) {
      settopBorderjustifyTab(tab);
    }
  };

  return (
    <Row>

      <Col xxl={4}>
        <Card>
          <CardHeader>
            <h4 className="card-title mb-0">Holding rewards</h4>
          </CardHeader>
          <CardBody>
            <BarGraph holderWallet={holderWallet} dataColors='["--vz-primary", "--vz-secondary", "--vz-success", "--vz-info"]'/>
          </CardBody>
        </Card>
      </Col>

      <Col xxl={8}>
        <Card>
          <CardHeader>
            <h4 className="card-title mb-0">Meta-Legends</h4>
          </CardHeader>
          <CardBody>

          </CardBody>
        </Card>
      </Col>

    </Row>
  );
}

export default Details;
