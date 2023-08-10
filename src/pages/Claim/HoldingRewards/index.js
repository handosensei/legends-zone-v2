import React, {useEffect, useState} from "react";
import {Button, Col, Container, Row} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import Hold_WeaponCyber from "../../../assets/images/metalegends/holding-reward/WeaponCyber.png";
import Hold_ArmorCyber from "../../../assets/images/metalegends/holding-reward/ArmorCyber.png";
import Hold_PetRough from "../../../assets/images/metalegends/holding-reward/PetRough.png";
import Hold_WeaponRoboter from "../../../assets/images/metalegends/holding-reward/WeaponRoboter.png";
import Hold_MatrixAngelCar from "../../../assets/images/metalegends/holding-reward/MatrixAngelCar.png";
import Hold_HealingDrone from "../../../assets/images/metalegends/holding-reward/HealingDrone.png";
import Reward from "./Reward";
import {getLegends} from "../../../client/ApiMetaLegends";
import moment from "moment/moment";
import {
  MINPERIOD_HOLD_COSMETIC_EFFECT,
  MINPERIOD_HOLD_CYBER_ARMOR,
  MINPERIOD_HOLD_CYBER_WEAPON,
  MINPERIOD_HOLD_HEALING_DRONE,
  MINPERIOD_HOLD_MA_VEHICLE,
  MINPERIOD_HOLD_ML_NETWORK_PASS,
  MINPERIOD_HOLD_ROBOTER_WEAPON,
  MINPERIOD_HOLD_ROUGH_PETS, MINPERIOD_HOLD_SHADOW_GEM
} from "../../Progress/HoldingReward";

const HoldingRewards = () => {

  document.title = "Holding rewards | Legends Zone";
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const defineInfo = (legends) => {
    const data = [
      { img: Hold_WeaponCyber, code:'cyber-weapon', item: 'Weapon', typeClass: 'Cyber', period: '1 month', quantity: 0},
      { img: Hold_ArmorCyber, code:'cyber-armor', item: 'Armor', typeClass: 'Cyber', period: '3 months', quantity: 0},
      { img: Hold_PetRough, code:'rough-pet', item: 'Pet', typeClass: 'Rough', period: '6 months', quantity: 0},
      { img: Hold_WeaponRoboter, code:'roboter-weapon', item: 'Weapon', typeClass: 'Roboter', period: '9 months', quantity: 0},
      { img: Hold_MatrixAngelCar, code: 'matrix-angel-car', item: 'Car', typeClass: 'Matrix Angel', period: '12 months', quantity: 0},
      { img: Hold_HealingDrone, code: 'healing-drone', item: 'Healing drone', typeClass: '', period: '15 months', quantity: 0},
      { img: '', code: 'ml-network-pass', item: 'ML Network pass', typeClass: '', period: '18 months', quantity: 0},
      { img: '', code: 'particles-cosmetic-effect', item: 'Particles cosmetic effect', typeClass: '', period: '21 months', quantity: 0},
      { img: '', code: 'shadow-gem', item: 'Shadow gem', typeClass: '', period: '24 months', quantity: 0},
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
      if (MINPERIOD_HOLD_ML_NETWORK_PASS <= monthsDiff) {
        data[6]['quantity']++;
      }
      if (MINPERIOD_HOLD_COSMETIC_EFFECT <= monthsDiff) {
        data[7]['quantity']++;
      }
      if (MINPERIOD_HOLD_SHADOW_GEM <= monthsDiff) {
        data[8]['quantity']++;
      }
    });
    setAssets(data);
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await getLegends();
      defineInfo(result);
      setIsLoading(true);
    }

    if (sessionStorage.getItem("authUser")) {
      const obj = JSON.parse(sessionStorage.getItem("authUser"));
      fetchData(obj.wallet.toLowerCase());
    }


  }, []);

  return (
  <React.Fragment>
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Holding rewards" pageTitle="Claim"/>


        <Row className="mb-4">
          <Col xxl={12}>
            <div className="card ribbon-box border shadow-none mb-lg-0 right">
              <div className="card-body text-muted">
                <span className="ribbon-three ribbon-three-info"><span>Info</span></span>
                <h3 className="text-white lh-base">Informations</h3>
                <p>
                  <ul className="text-body">
                    <li>
                      Eligibility: Theoretical eligibility calculated according to acquisition date
                    </li>
                    <li>
                      Claim pending: Request to be added to next claim
                    </li>
                    <li>
                      Remaining to be claim: Eligibility recorded in the smart contract
                    </li>
                  </ul>
                </p>
                <div className="hstack gap-2">
                  <Button color="primary" className="">Estimate next claim</Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          {assets.map((asset, key) => (
            <Col key={key} xl={4}>
              <Reward asset={asset} />
            </Col>
          ))}
        </Row>

      </Container>
    </div>
  </React.Fragment>
  ) ;
}

export default HoldingRewards;
