import React, { useEffect, useState } from 'react';
import {Card, CardBody, Col} from "reactstrap";

const Allowlist = () => {
  return (
    <React.Fragment>
      <Col xxl={3}>
        <Card>
          <CardBody>
            <div className="d-flex align-items-center">
              <div className="flex-grow-1">
                <p className="text-uppercase fw-medium mb-0 text-muted">Eligibility</p>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <div className="flex-shrink-0">
                <i className="display-6 text-muted ri-fingerprint-line"></i>
              </div>

              <div className="flex-grow-1 ms-3">
                <h2 className="mb-0">
                  <span className="counter-value">2</span>
                </h2>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
      <Col xxl={3}>
        <Card>
          <CardBody>
            <div className="d-flex align-items-center">
              <div className="flex-grow-1">
                <p className="text-uppercase fw-medium mb-0 text-muted">Minted</p>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <div className="flex-shrink-0">
                <i className="mdi mdi-hammer display-6 text-muted"></i>
              </div>

              <div className="flex-grow-1 ms-3">
                <h2 className="mb-0">
                  <span className="counter-value">0</span>
                </h2>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
      <Col xxl={3}>
        <Card>
          <CardBody>
            <div className="d-flex align-items-center">
              <div className="flex-grow-1">
                <p className="text-uppercase fw-medium mb-0 text-muted">Remaining</p>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <div className="flex-shrink-0">
                <i className="display-6 text-muted ri-file-history-fill"></i>
              </div>

              <div className="flex-grow-1 ms-3">
                <h2 className="mb-0">
                  <span className="counter-value">2</span>
                </h2>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
      <Col xxl={3}>
        <Card>
          <CardBody>
            <div className="d-flex align-items-center">
              <div className="flex-grow-1">
                <p className={"text-uppercase fw-medium mb-0 text-muted"}>Queue position</p>
              </div>
              <div className="flex-shrink-0">
                <h5 className={"fs-14 mb-0 text-danger"}>
                  <i className={"fs-13 align-middle"}></i> Close
                </h5>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <div className="flex-shrink-0">
                <i className="display-6 text-muted ri-file-list-3-line"></i>
              </div>

              <div className="flex-grow-1 ms-3">
                <h2 className="mb-0">
                  <span className="counter-value">2</span>
                </h2>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
}

export default Allowlist;
