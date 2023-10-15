import React, {useState} from 'react';
import {
  Card,
  CardBody,
  Col,
  Container,
  CardHeader,
  Row,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Input
} from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import Player from "./Player";

import {Link} from "react-router-dom";


import iconCelestial from "../../../assets/images/metalegends/healing-drone/ico-celestial.png";
import iconBurner from "../../../assets/images/metalegends/healing-drone/ico-burner.png";
import iconRoboter from "../../../assets/images/metalegends/healing-drone/ico-roboter.png";
import iconGoldboi from "../../../assets/images/metalegends/healing-drone/ico-goldboi.png";
import iconMatrixAngel from "../../../assets/images/metalegends/healing-drone/ico-matrix-angel.png";
import iconCyber from "../../../assets/images/metalegends/healing-drone/ico-cyber.png";
import iconRough from "../../../assets/images/metalegends/healing-drone/ico-rough.png";



const HealingDrone = () => {

  const [counter, setCounter] = useState(0);
  const [remainingToClaim, setRemainingToClaim] = useState(0);

  document.title = "Claim \"Healing drone\" reward | Legends Zone";

  function countUp(prev_data_attr) {
    if (prev_data_attr < remainingToClaim && prev_data_attr < 10) {
      setCounter(prev_data_attr + 1);
    }
  }

  function countDown(prev_data_attr) {
    if (prev_data_attr >= 1) {
      setCounter(prev_data_attr - 1);
    }
  }

  const ClaimButton = () => {
    if (remainingToClaim > 0) {
      return (<button className="btn btn-primary">Claim</button>);
    }
    return (<button className="btn btn-light">Claim</button>);
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Healing drones" pageTitle="Claim"/>
          <Row>
            <Col xl="5">
              <Card>

                  <Player/>

              </Card>
            </Col>

            <Col xl="7">
              <Card>
                <CardBody>
                  <h2>Healing Drone</h2>

                  <Row className="mt-5">
                    <Col lg={3} sm={6}>
                      <div className="p-2 border border-dashed rounded text-center">
                        <div>
                          <p className="text-muted fw-medium mb-1">Supply :</p>
                          <h4 className="fs-20 mb-0"><i className="mdi mdi-panorama-sphere-outline me-1"></i> 1996/2000</h4>
                        </div>
                      </div>
                    </Col>
                    <Col lg={3} sm={6}>
                      <div className="p-2 border border-dashed rounded text-center">
                        <div>
                          <p className="text-muted fw-medium mb-1">Ends:</p>
                          <h4 className="fs-20 mb-0"><i className="mdi mdi-clock-edit-outline me-1"></i> June 30th, 2023</h4>
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <div className="mt-5 text-muted">
                    <h5 className="fs-14">Description :</h5>
                    <p>
                      Meta-Life LegendsZone, the Healing drone is the 6th holding reward (NFT ERC-721) for holders who have kept their NFT Legends for more than 15 months.
                    </p>
                  </div>

                  <div className="product-content mt-5">
                    <h5 className="fs-14 mb-3">Rarity description :</h5>

                    <div className="table-responsive">
                      <table className="table align-middle table-nowrap mb-0">
                        <tbody>
                        <tr>
                          <th scope="row">
                            <div className="d-flex align-items-center">
                              <img src={iconCelestial} alt="" className="avatar-sm rounded object-cover" />
                              <span className="mb-0 ms-4">Celestial drone</span>
                            </div>
                          </th>
                          <td>1%</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <img src={iconBurner} alt="" className="avatar-sm rounded object-cover" />
                              <span className="mb-0 ms-4">Burner drone</span>
                            </div>
                          </td>
                          <td>2%</td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <div className="d-flex align-items-center">
                              <img src={iconRoboter} alt="" className="avatar-sm rounded object-cover" />
                              <span className="mb-0 ms-4">Roboter drone</span>
                            </div>
                          </th>
                          <td>1%</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <img src={iconGoldboi} alt="" className="avatar-sm rounded object-cover" />
                              <span className="mb-0 ms-4">Goldboi drone</span>
                            </div>
                          </td>
                          <td>2%</td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <div className="d-flex align-items-center">
                              <img src={iconMatrixAngel} alt="" className="avatar-sm rounded object-cover" />
                              <span className="mb-0 ms-4">Matrix-Angel drone</span>
                            </div>
                          </th>
                          <td>1%</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <img src={iconCyber} alt="" className="avatar-sm rounded object-cover" />
                              <span className="mb-0 ms-4">Cyber drone</span>
                            </div>
                          </td>
                          <td>2%</td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <div className="d-flex align-items-center">
                              <img src={iconRough} alt="" className="avatar-sm rounded object-cover" />
                              <span className="mb-0 ms-4">Rough drone</span>
                            </div>
                          </th>
                          <td>1%</td>

                        </tr>

                        </tbody>
                      </table>
                    </div>
                  </div>

                  <Row className="mt-5 mb-5">
                    <Col xl={{ size: 4, offset: 4}}>
                      <div className="mt-3 list-group-item d-flex justify-content-between align-items-center">
                        Eligibility
                        <div className="flex-shrink-0">
                          <span className="text-muted">0</span>
                        </div>
                      </div>

                      <div className="mt-2 list-group-item d-flex justify-content-between align-items-center">
                        Remaining to be claim
                        <div className="flex-shrink-0">
                          <span className="text-muted">0</span>
                        </div>
                      </div>

                      <div className="d-grid gap-2 mt-5">
                        <div className="input-step full-width">
                          <button type="button" className="minus" onClick={() => { countDown(counter); }} >
                            –
                          </button>
                          <Input type="number" className="product-quantity" value={counter} min="0" max="20" readOnly />
                          <button type="button" className="plus" onClick={() => { countUp(counter); }} >
                            +
                          </button>
                        </div>
                        <button className="btn btn-light">Max</button>
                        <button className="btn btn-light">Claim</button>
                      </div>

                    </Col>
                  </Row>

                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default HealingDrone;
