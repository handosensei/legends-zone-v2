import React, {useEffect, useState} from "react";
import {Button, Col, Container, Modal, ModalBody, ModalHeader, Row, CardBody, Card} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import Hold_WeaponCyber from "../../../assets/images/metalegends/holding-reward/WeaponCyber.png";
import Hold_ArmorCyber from "../../../assets/images/metalegends/holding-reward/ArmorCyber.png";
import Hold_PetRough from "../../../assets/images/metalegends/holding-reward/PetRough.png";
import Hold_WeaponRoboter from "../../../assets/images/metalegends/holding-reward/WeaponRoboter.png";
import Hold_MatrixAngelCar from "../../../assets/images/metalegends/holding-reward/MatrixAngelCar.png";
import Hold_HealingDrone from "../../../assets/images/metalegends/holding-reward/HealingDrone.png";
import Hold_ParticlesCosmeticEffect from "../../../assets/images/metalegends/holding-reward/ParticlesCosmeticEffect.png";
import Hold_ShadowGem from "../../../assets/images/metalegends/holding-reward/ShadowGem.png";
import Hold_MLNetworkPass from "../../../assets/images/metalegends/holding-reward/MLNetworkPass.png";

import Reward from "./Reward";
import {getLegends, holdingRewardEstimate, getHoldingRewardsSaved} from "../../../client/ApiMetaLegends";
import {wait} from "@testing-library/user-event/dist/utils";

const HoldingRewards = () => {

  document.title = "Holding rewards | Legends Zone";
  const [assets, setAssets] = useState([]);
  const [modalExecuteInProgress, setModalExecuteInProgress] = useState(false);
  const [modalExecuted, setModalExecuted] = useState(false);
  const [modalNoUpdate, setModalNoUpdate] = useState(false);
  const [assetsProcessed, setAssetsProcessed] = useState([]);

  const processNextClaim = () => {
    const assetsBeingUpdated = assets;
    holdingRewardEstimate().then((res) => {
      let countUpdated = 0;
      const data = getInitHoldingRewards();
      data.forEach((holdingReward) => {
        if (res[holdingReward.code].length > 0) {
          holdingReward.quantitySaved = res[holdingReward.code].length
          countUpdated += res[holdingReward.code].length
        }
      })
      setAssetsProcessed(data);

      assetsBeingUpdated.forEach((holdingReward) => {
        holdingReward.quantitySaved += res[holdingReward.code].length
      });
      console.log(countUpdated);
      setModalExecuteInProgress(false);
      if (countUpdated > 0) {
        setModalExecuted(true);
      } else {
        setModalNoUpdate(true);
      }
    });

  }

  const getInitHoldingRewards = () => {
    return [
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
  }

  const estimateQuantity = async (holdingRewards) => {
    const legends = await getLegends();
    legends.forEach((legend) => {
      holdingRewards.forEach((holdingReward) => {
        if (legend.holdingRewards[holdingReward.code] === true) {
          holdingReward.quantity++;
        }
      });
    });
    return holdingRewards;
  }

  const defineQuantitySaved = async (holdingRewards) => {
    const data = await getHoldingRewardsSaved();
    holdingRewards.forEach((holdingReward) => {
      holdingReward.quantitySaved = data[holdingReward.code].length;
    });

    return holdingRewards;
  }

  const defineAssets = async () => {
    const holdingRewardsEmpty = getInitHoldingRewards();
    const holdingRewardsWithQuantity = await estimateQuantity(holdingRewardsEmpty);
    const data = await defineQuantitySaved(holdingRewardsWithQuantity);
    setAssets(data);
  }

  useEffect(() => {
    const fetchData = async () => {
      defineAssets();
    }

    if (sessionStorage.getItem("authUser")) {
      fetchData();
    }

  }, []);

  return (
  <React.Fragment>
    <Modal size="lg" id="flipModalInProgress" isOpen={modalExecuteInProgress} toggle={() => {setModalExecuteInProgress(false) }} modalClassName="zoomIn" centered >
      <ModalHeader className="modal-title" id="flipModalLabel">
        Estimation in progress
      </ModalHeader>
      <ModalBody className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </ModalBody>
    </Modal>

    <Modal size="lg" id="flipModalNoUpdate" isOpen={modalNoUpdate} toggle={() => {setModalNoUpdate(false) }} modalClassName="zoomIn" centered >
      <ModalBody className="text-center p-5">
        <div className="mt-4 pt-4">
          <h4>No holding reward to save</h4>
          <p className="text-muted">
            Your request does not concern any NFT generating a new holding reward.
          </p>
        </div>
      </ModalBody>
    </Modal>

    <Modal size="lg" id="flipModal" isOpen={modalExecuted} toggle={() => {setModalExecuted(false) }} modalClassName="zoomIn" centered >
      <ModalHeader className="modal-title" id="flipModalLabel" >
      </ModalHeader>
      <ModalBody className="text-center">
        <h5 className="fs-16">
          Claim request saved
        </h5>
        <Card className="mt-5">
          <CardBody>
            <div className="table-responsive table-card">
              <table className="table table-centered table-hover align-middle table-nowrap mb-0">
                <tbody>
                  {assetsProcessed.map((asset, key) => (
                    <tr key={key}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0 me-2">
                            <img src={asset.img} alt="" className="avatar-sm p-2" />
                          </div>
                          <div className="text-start">
                            <h5 className="fs-14 my-1 fw-medium">{asset.typeClass} {asset.item}</h5>
                            <span className="text-muted">{asset.period}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="mb-0">{asset.quantitySaved}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </ModalBody>
      <div className="modal-footer">
        <Button color="light" onClick={() => { setModalExecuted(false); }}> Close </Button>
      </div>
    </Modal>

    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Holding rewards" pageTitle="Claim"/>

        <Row className="mb-4">
          <Col xxl={12}>
            <div className="card ribbon-box border shadow-none mb-lg-0 right">
              <div className="card-body text-muted">
                <span className="ribbon-three ribbon-three-info"><span>Info</span></span>
                <h3 className="text-white lh-base">Informations</h3>

                <ul className="text-body">
                  <li>
                    Eligibility: Theoretical eligibility calculated according to acquisition date
                  </li>
                  <li>
                    Claim saved: Request to be added to next claim
                  </li>
                  <li>
                    Remaining to be claim: Eligibility recorded in the smart contract
                  </li>
                </ul>

                <div className="hstack gap-2">
                  <Button color="primary" onClick={() => {
                    setModalExecuteInProgress(true);
                    wait(1000).then(() => {
                      processNextClaim();
                    });
                  }}>Estimate next claim</Button>
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
