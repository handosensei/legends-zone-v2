import React from "react";
import {Col, Row} from "reactstrap";

const SupplyData = () => {

  return (
    <Row className="mt-5">
      <Col lg={6} sm={6}>
        <div className="p-2 border border-dashed rounded text-center">
          <div>
            <p className="text-muted fw-medium mb-1">Supply :</p>
            <h4 className="fs-20 mb-0">
              <i className="mdi mdi-panorama-sphere-outline me-1"></i> 1661
            </h4>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default SupplyData;
