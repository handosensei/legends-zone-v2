import React from 'react';
import {Card, Col, Row} from "reactstrap";
import Hold_WeaponCyber from "../../assets/images/metalegends/holding-reward/WeaponCyber.png";
import Hold_ArmorCyber from "../../assets/images/metalegends/holding-reward/ArmorCyber.png";
import Hold_CyberPet from "../../assets/images/metalegends/holding-reward/CyberPet.png";
import Hold_WeaponRoboter from "../../assets/images/metalegends/holding-reward/WeaponRoboter.png";
import Hold_MatrixAngelCar from "../../assets/images/metalegends/holding-reward/MatrixAngelCar.png";
import Hold_HealingDrone from "../../assets/images/metalegends/holding-reward/HealingDrone.png";

const InfoRewardHolding = () => {
  return (
    <Row className="mb-4">
      <Col xxl={12}>
        <div className="card ribbon-box border shadow-none mb-lg-0 right">
          <div className="card-body text-muted">
            <span className="ribbon-three ribbon-three-info"><span>Info</span></span>
            <h5 className="fs-14 mb-3">Holding reward information</h5>
            <p className="mb-0">
              <Col className="col-12">
                <Row className="row-cols-xxl-6 row-cols-lg-3 row-cols-1">

                  <Col>
                    <Card className="card-body">
                      <div className="d-flex mb-4 align-items-center">
                        <div className="flex-shrink-0">
                          <img src={Hold_WeaponCyber} alt="" className="avatar-sm rounded" />
                        </div>
                        <div className="flex-grow-1 ms-2">
                          <h5 className="card-title mb-1">Weapon</h5>
                          <p className="text-muted mb-0">Cyber</p>
                        </div>
                      </div>
                      <h6 className="mb-1">1 month</h6>
                    </Card>
                  </Col>

                  <Col>
                    <Card className="card-body">
                      <div className="d-flex mb-4 align-items-center">
                        <div className="flex-shrink-0">
                          <img src={Hold_ArmorCyber} alt="" className="avatar-sm rounded" />
                        </div>
                        <div className="flex-grow-1 ms-2">
                          <h5 className="card-title mb-1">Armor</h5>
                          <p className="text-muted mb-0">Cyber</p>
                        </div>
                      </div>
                      <h6 className="mb-1">3 months</h6>
                    </Card>
                  </Col>

                  <Col>
                    <Card className="card-body">
                      <div className="d-flex mb-4 align-items-center">
                        <div className="flex-shrink-0">
                          <img src={Hold_CyberPet} alt="" className="avatar-sm rounded" />
                        </div>
                        <div className="flex-grow-1 ms-2">
                          <h5 className="card-title mb-1">Pet</h5>
                          <p className="text-muted mb-0">Cyber</p>
                        </div>
                      </div>
                      <h6 className="mb-1">6 months</h6>
                    </Card>
                  </Col>

                  <Col>
                    <Card className="card-body">
                      <div className="d-flex mb-4 align-items-center">
                        <div className="flex-shrink-0">
                          <img src={Hold_WeaponRoboter} alt="" className="avatar-sm rounded" />
                        </div>
                        <div className="flex-grow-1 ms-2">
                          <h5 className="card-title mb-1">Weapon</h5>
                          <p className="text-muted mb-0">Roboter</p>
                        </div>
                      </div>
                      <h6 className="mb-1">9 months</h6>
                    </Card>
                  </Col>

                  <Col>
                    <Card className="card-body">
                      <div className="d-flex mb-4 align-items-center">
                        <div className="flex-shrink-0">
                          <img src={Hold_MatrixAngelCar} alt="" className="avatar-sm rounded" />
                        </div>
                        <div className="flex-grow-1 ms-2">
                          <h5 className="card-title mb-1">Car</h5>
                          <p className="text-muted mb-0">Matrix Angel</p>
                        </div>
                      </div>
                      <h6 className="mb-1">12 months</h6>
                    </Card>
                  </Col>

                  <Col>
                    <Card className="card-body">
                      <div className="d-flex mb-4 align-items-center">
                        <div className="flex-shrink-0">
                          <img src={Hold_HealingDrone} alt="" className="avatar-sm rounded" />
                        </div>
                        <div className="flex-grow-1 ms-2">
                          <h5 className="card-title mb-1">Healing drone</h5>
                        </div>
                      </div>
                      <h6 className="mb-1">15 months</h6>
                    </Card>
                  </Col>

                </Row>
              </Col>
            </p>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default InfoRewardHolding;