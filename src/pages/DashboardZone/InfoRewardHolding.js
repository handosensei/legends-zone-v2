import React, {useEffect, useState} from 'react';
import {Card, Col, Row} from "reactstrap";
import Hold_WeaponCyber from "../../assets/images/metalegends/holding-reward/WeaponCyber.png";
import Hold_ArmorCyber from "../../assets/images/metalegends/holding-reward/ArmorCyber.png";
import Hold_PetRough from "../../assets/images/metalegends/holding-reward/PetRough.png";
import Hold_WeaponRoboter from "../../assets/images/metalegends/holding-reward/WeaponRoboter.png";
import Hold_MatrixAngelCar from "../../assets/images/metalegends/holding-reward/MatrixAngelCar.png";
import Hold_HealingDrone from "../../assets/images/metalegends/holding-reward/HealingDrone.png";

const InfoRewardHolding = () => {
  const [assets, setAssets] = useState([]);
  const defineInfo = () => {
    const data = [
      {img: Hold_WeaponCyber, item: 'Weapon', typeClass: 'Cyber', period: '1 month'},
      {img: Hold_ArmorCyber, item: 'Armor', typeClass: 'Cyber', period: '3 months'},
      {img: Hold_PetRough, item: 'Pet', typeClass: 'Rough', period: '6 months'},
      {img: Hold_WeaponRoboter, item: 'Weapon', typeClass: 'Roboter', period: '9 months'},
      {img: Hold_MatrixAngelCar, item: 'Car', typeClass: 'Matrix Angel', period: '12 months'},
      {img: Hold_HealingDrone, item: 'Healing drone', typeClass: '', period: '15 months'},
    ];

    setAssets(data);
  }

  useEffect(() => {
    defineInfo();
  }, []);


  return (
    <Row className="mb-4">
      <Col xxl={12}>
        <div className="card ribbon-box border shadow-none mb-lg-0 right">
          <div className="card-body text-muted">
            <span className="ribbon-three ribbon-three-info"><span>Info</span></span>
            <h5 className="fs-14 mb-3">Holding reward information</h5>

              <Col className="col-12">
                <Row className="row-cols-xxl-6 row-cols-lg-3 row-cols-1">
                  {assets.map((element, key) => (
                    <Col key={key}>
                      <Card className="card-body">
                        <div className="d-flex mb-4 align-items-center">
                          <div className="flex-shrink-0">
                            <img src={element.img} alt="" className="avatar-sm rounded" />
                          </div>
                          <div className="flex-grow-1 ms-2">
                            <h5 className="card-title mb-1">{element.item}</h5>
                            <p className="text-muted mb-0">{element.typeClass}</p>
                          </div>
                        </div>
                        <h6 className="mb-1">{element.period}</h6>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Col>

          </div>
        </div>
      </Col>
    </Row>
  );
}

export default InfoRewardHolding;