import React, {useEffect, useState} from 'react';

import Hold_WeaponCyber from "../../assets/images/metalegends/holding-reward/WeaponCyber.png";
import Hold_ArmorCyber from "../../assets/images/metalegends/holding-reward/ArmorCyber.png";
import Hold_CyberPet from "../../assets/images/metalegends/holding-reward/CyberPet.png";
import Hold_WeaponRoboter from "../../assets/images/metalegends/holding-reward/WeaponRoboter.png";
import Hold_MatrixAngelCar from "../../assets/images/metalegends/holding-reward/MatrixAngelCar.png";
import Hold_HealingDrone from "../../assets/images/metalegends/holding-reward/HealingDrone.png";

import moment from "moment";
import {Card, CardBody, CardHeader, Col} from "reactstrap";


export const MINPERIOD_HOLD_CYBER_WEAPON = 1;
export const MINPERIOD_HOLD_CYBER_ARMOR = 2;
export const MINPERIOD_HOLD_ROUGH_PETS = 5;
export const MINPERIOD_HOLD_ROBOTER_WEAPON = 8;
export const MINPERIOD_HOLD_MA_VEHICLE = 11;
export const MINPERIOD_HOLD_HEALING_DRONE = 15;


const HoldingReward = ({legends}) => {
  const [, setLegends] = useState([]);
  const [assets, setAssets] = useState([]);

  const defineAssets = () => {
    const data = [
      { label: 'Cyber Weapons', period: '1 month', quantity: 0, img: Hold_WeaponCyber},
      { label: 'Cyber Armors', period: '3 months', quantity: 0, img: Hold_ArmorCyber},
      { label: 'Rough Pets', period: '6 months', quantity: 0, img: Hold_CyberPet},
      { label: 'Robober Weapons', period: '9 months', quantity: 0, img: Hold_WeaponRoboter},
      { label: 'Matrix Angel Vehicles', period: '12 months', quantity: 0, img: Hold_MatrixAngelCar},
      { label: 'Healing Drones', period: '15 months', quantity: 0, img: Hold_HealingDrone},
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


    if (legends.length > 0) {
      defineAssets(legends);
    }
  }, [legends]);

  return (
    <React.Fragment>
      <Col xl={4}>
        <Card className="card-height-100">
          <CardHeader className="align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">Holding rewards</h4>
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