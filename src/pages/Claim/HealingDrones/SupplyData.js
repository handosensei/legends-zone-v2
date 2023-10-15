import React, {useEffect, useState} from "react";
import {Col, Row} from "reactstrap";

const SupplyData = ({contract}) => {
  const [remainingSupply, setRemainingSupply] = useState(0);

  const getRemainingSupply = () => {
    if (contract == null) {
      return 0;
    }
    if (contract.methods !== undefined) {
      contract.methods.remainingSupply().call().then((res) => {
        setRemainingSupply(res);
      });
      return remainingSupply;
    }
    return 0;
  }

  useEffect(() => {

  }, []);
  return (
    <Row className="mt-5">
      <Col lg={6} sm={6}>
        <div className="p-2 border border-dashed rounded text-center">
          <div>
            <p className="text-muted fw-medium mb-1">Supply :</p>
            <h4 className="fs-20 mb-0">
              <i className="mdi mdi-panorama-sphere-outline me-1"></i> {getRemainingSupply()} / 5432
            </h4>
          </div>
        </div>
      </Col>
      <Col lg={6} sm={6}>
        <div className="p-2 border border-dashed rounded text-center">
          <div>
            <p className="text-muted fw-medium mb-1">Ends:</p>
            <h4 className="fs-20 mb-0"><i className="mdi mdi-clock-edit-outline me-1"></i>GMT Sunday 30 June 2024 21:59:59</h4>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default SupplyData;
