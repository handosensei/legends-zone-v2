import React, { useEffect, useState } from 'react';
import {Card, CardBody, Col, Row} from "reactstrap";
import {Link} from "react-router-dom";
import spaace_coin from "../../../assets/images/spaace/coin.png";
import CountUp from "react-countup";

const Information = ({amountSpaace, countTokenStaked}) => {

  return (
    <React.Fragment>
      <Row>
        <Col xxl={6} xl={6} lg={6}>
          <Card className="card-animate">
            <CardBody>

              <div className="d-flex p-1">
                <div>
                  <p className="fs-14 lh-base">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc elementum dolor vel est porttitor, vehicula pulvinar enim pretium. Integer elementum auctor tortor.
                  </p>
                  <div className="mt-3">
                    <Link to="#" className="btn btn-secondary"><i className="ri-youtube-fill align-bottom"></i> Tutorial</Link>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <div className="avatar-lg me-3">
                    <div className="mb-4 pb-2">
                      <img src={spaace_coin} alt="" className="avatar-xl" />
                    </div>
                  </div>
                </div>
              </div>

            </CardBody>
          </Card>
        </Col>

        <Col xxl={2} xl={3} lg={6}>
          <Card className="card-animate">
            <CardBody>

              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <p className="text-uppercase fw-medium mb-0 text-muted">Amount earned</p>
                </div>
              </div>

              <div className="align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4 muted">
                    <p className="counter-value" data-target="559.25">
                      <CountUp
                        start={0}
                        prefix=""
                        suffix=" $SPAACE"
                        separator='.'
                        end={amountSpaace}
                        decimals="3"
                        duration={2}
                      />
                    </p>
                  </h4>
                </div>
              </div>

            </CardBody>
          </Card>
        </Col>

        <Col xxl={2} xl={3} lg={6}>
          <Card className="card-animate">
            <CardBody>
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <p className="text-uppercase fw-medium mb-0 text-muted">Total NFT Meta-Legends staked</p>
                </div>
              </div>
              <div className="align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4 muted">
                    <p className="counter-value" data-target="559.25">
                      <CountUp
                        start={0}
                        prefix=""
                        suffix=" NFT"
                        separator=''
                        end={countTokenStaked}
                        decimals="0"
                        duration={2}
                      />
                    </p>
                  </h4>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/*<Col xxl={2} xl={3} lg={6}>*/}
        {/*  <Card className="card-animate">*/}
        {/*    <CardBody>*/}
        {/*      <div className="d-flex align-items-center">*/}
        {/*        <div className="flex-grow-1">*/}
        {/*          <p className="text-uppercase fw-medium mb-0 text-muted">Total NFT Council Stone staked</p>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className="align-items-end justify-content-between mt-4">*/}
        {/*        <div>*/}
        {/*          <h4 className="fs-22 fw-semibold ff-secondary mb-4 muted">*/}
        {/*            <p className="counter-value" data-target="559.25">*/}
        {/*              <CountUp*/}
        {/*                start={0}*/}
        {/*                prefix=""*/}
        {/*                suffix=" NFT"*/}
        {/*                separator=''*/}
        {/*                end="4"*/}
        {/*                decimals="0"*/}
        {/*                duration={2}*/}
        {/*              />*/}
        {/*            </p>*/}
        {/*          </h4>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </CardBody>*/}
        {/*  </Card>*/}
        {/*</Col>*/}
      </Row>
    </React.Fragment>
  )
}

export default Information;
