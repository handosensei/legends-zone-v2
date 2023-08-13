import React, {useEffect, useState} from 'react';

import Hold_WeaponCyber from "../../assets/images/metalegends/holding-reward/WeaponCyber.png";
import Hold_ArmorCyber from "../../assets/images/metalegends/holding-reward/ArmorCyber.png";
import Hold_PetRough from "../../assets/images/metalegends/holding-reward/PetRough.png";
import Hold_WeaponRoboter from "../../assets/images/metalegends/holding-reward/WeaponRoboter.png";
import Hold_MatrixAngelCar from "../../assets/images/metalegends/holding-reward/MatrixAngelCar.png";
import Hold_HealingDrone from "../../assets/images/metalegends/holding-reward/HealingDrone.png";

import moment from "moment";
import {Card, CardBody, CardHeader, Col} from "reactstrap";
import ModalHoldingReward from "./ModalHoldingReward";
import Hold_MLNetworkPass from "../../assets/images/metalegends/holding-reward/MLNetworkPass.png";
import Hold_ParticlesCosmeticEffect from "../../assets/images/metalegends/holding-reward/ParticlesCosmeticEffect.png";
import Hold_ShadowGem from "../../assets/images/metalegends/holding-reward/ShadowGem.png";

export const MINPERIOD_HOLD_CYBER_WEAPON = 1;
export const MINPERIOD_HOLD_CYBER_ARMOR = 2;
export const MINPERIOD_HOLD_ROUGH_PETS = 5;
export const MINPERIOD_HOLD_ROBOTER_WEAPON = 8;
export const MINPERIOD_HOLD_MA_VEHICLE = 12 ;
export const MINPERIOD_HOLD_HEALING_DRONE = 15;
export const MINPERIOD_HOLD_ML_NETWORK_PASS = 18;
export const MINPERIOD_HOLD_COSMETIC_EFFECT = 21;
export const MINPERIOD_HOLD_SHADOW_GEM = 24;


const HoldingReward = ({legends}) => {
  const [, setLegends] = useState([]);
  const [assets, setAssets] = useState([]);


  const defineAssets = () => {
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

    legends.map((item) => {
      const now = moment();
      const purchasedOn = moment(item.purchasedOn);
      const monthsDiff = now.diff(purchasedOn, 'months');

      if (MINPERIOD_HOLD_CYBER_WEAPON <= monthsDiff) {
        data[0]['quantity']++;
      }
      if (MINPERIOD_HOLD_CYBER_ARMOR <= monthsDiff) {
        data[1]['quantity']++;
      }
      if (MINPERIOD_HOLD_ROUGH_PETS <= monthsDiff) {
        data[2]['quantity']++;
      }
      if (MINPERIOD_HOLD_ROBOTER_WEAPON <= monthsDiff) {
        data[3]['quantity']++;
      }
      if (MINPERIOD_HOLD_MA_VEHICLE <= monthsDiff) {
        data[4]['quantity']++;
      }
      if (MINPERIOD_HOLD_HEALING_DRONE <= monthsDiff) {
        data[5]['quantity']++;
      }
    });
    setAssets(data);
  }

  useEffect(() => {
    setLegends(legends);
    defineAssets(legends);
  }, [legends]);

  return (
    <React.Fragment>
      <Col xl={4}>
        <Card className="card-height-100">
          <CardHeader className="align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">Holding rewards</h4>
            <ModalHoldingReward />
          </CardHeader>

          <CardBody>
            <div className="table-responsive table-card">
              <table className="table table-centered table-hover align-middle table-nowrap mb-0">
                <tbody>
                {assets.map((item, key) => (
                  <tr key={key}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0 me-2">
                          <img src={item.img} alt="" className="avatar-sm p-2" />
                        </div>
                        <div>
                          <h5 className="fs-14 my-1 fw-medium">{item.label}</h5>
                          <span className="text-muted">{item.period}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="mb-0">{item.quantity}</p>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </CardBody>

        </Card>
      </Col>

    </React.Fragment>
  );
}

export default HoldingReward;