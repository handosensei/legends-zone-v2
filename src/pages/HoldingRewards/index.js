import React from "react";
import { Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";

const HoldingRewards = () => {

  document.title = "Holding rewards | Legends Zone";

  return (
  <React.Fragment>
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Holding rewards" pageTitle="Home"/>

        <Row>
          <Col>
            <div className="h-100">
              <div className="justify-content-between d-flex align-items-center mt-3 mb-4">
                <h5 className="mb-0 pb-1 text-decoration-underline">Holding rewards</h5>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  </React.Fragment>
  ) ;
}

export default HoldingRewards;
