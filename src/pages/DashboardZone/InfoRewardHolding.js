import React, {useEffect, useState} from 'react';
import {Card, Col, Row} from "reactstrap";
import Hold_WeaponCyber from "../../assets/images/metalegends/holding-reward/WeaponCyber.png";
import Hold_ArmorCyber from "../../assets/images/metalegends/holding-reward/ArmorCyber.png";
import Hold_PetRough from "../../assets/images/metalegends/holding-reward/PetRough.png";
import Hold_WeaponRoboter from "../../assets/images/metalegends/holding-reward/WeaponRoboter.png";
import Hold_MatrixAngelCar from "../../assets/images/metalegends/holding-reward/MatrixAngelCar.png";
import Hold_HealingDrone from "../../assets/images/metalegends/holding-reward/HealingDrone.png";
import Hold_MLNetworkPass from "../../assets/images/metalegends/holding-reward/MLNetworkPass.png";
import Hold_ParticlesCosmeticEffect from "../../assets/images/metalegends/holding-reward/ParticlesCosmeticEffect.png";
import Hold_ShadowGem from "../../assets/images/metalegends/holding-reward/ShadowGem.png";

const InfoRewardHolding = () => {
  const [assets, setAssets] = useState([]);
  const defineInfo = () => {
    const data = [
      { img: Hold_WeaponCyber, code:'cyber-weapon', item: 'Weapon', typeClass: 'Cyber', period: '1 month', quantity: 0, quantitySaved: 0},
      { img: Hold_ArmorCyber, code:'cyber-armor', item: 'Armor', typeClass: 'Cyber', period: '3 months', quantity: 0, quantitySaved: 0},
      { img: Hold_PetRough, code:'rough-pet', item: 'Pet', typeClass: 'Rough', period: '6 months', quantity: 0, quantitySaved: 0},
      { img: Hold_WeaponRoboter, code:'roboter-weapon', item: 'Weapon', typeClass: 'Roboter', period: '9 months', quantity: 0, quantitySaved: 0},
      { img: Hold_MatrixAngelCar, code: 'matrix-angel-car', item: 'Car', typeClass: 'Matrix Angel', period: '12 months', quantity: 0, quantitySaved: 0},
      { img: Hold_HealingDrone, code: 'healing-drone', item: 'Healing drone', typeClass: '', period: '15 months', quantity: 0, quantitySaved: 0},
      { img: Hold_MLNetworkPass, code: 'ml-network-pass', item: 'ML Network pass', typeClass: '', period: '18 months', quantity: 0, quantitySaved: 0},
      { img: Hold_ParticlesCosmeticEffect, code: 'particles-cosmetic-effect', item: 'Particles cosmetic effect', typeClass: '', period: '21 months', quantity: 0, quantitySaved: 0},
      { img: Hold_ShadowGem, code: 'shadow-gem', item: 'Shadow gem', typeClass: '', period: '24 months', quantity: 0, quantitySaved: 0},
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
                <Row className="row-cols-xxl-5 row-cols-lg-3 row-cols-1">
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