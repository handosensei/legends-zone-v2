import React, {useEffect, useState} from "react";
import {Button, Col, Container, Modal, ModalBody, ModalHeader, Row, CardBody, Card} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import Hold_WeaponCyber from "../../../assets/images/metalegends/holding-reward/WeaponCyber.png";
import Hold_ArmorCyber from "../../../assets/images/metalegends/holding-reward/ArmorCyber.png";
import Hold_PetRough from "../../../assets/images/metalegends/holding-reward/PetRough.png";
import Hold_WeaponRoboter from "../../../assets/images/metalegends/holding-reward/WeaponRoboter.png";
import Hold_MatrixAngelCar from "../../../assets/images/metalegends/holding-reward/MatrixAngelCar.png";
import Hold_ParticlesCosmeticEffect from "../../../assets/images/metalegends/holding-reward/ParticlesCosmeticEffect.png";
import Hold_ShadowGem from "../../../assets/images/metalegends/holding-reward/ShadowGem.png";
import Hold_MLNetworkPass from "../../../assets/images/metalegends/holding-reward/MLNetworkPass.png";
import IMG_NETWORKS_POLYGON from "../../../assets/images/metalegends/networks_polygon.png";

import Reward from "./Reward";
import {getLegends, holdingRewardEstimate, getHoldingRewardsSaved} from "../../../client/ApiMetaLegends";
import {wait} from "@testing-library/user-event/dist/utils";
import Web3 from "web3";
import MetaLifeHoldingReward from "../../../contracts/testnet/holding-reward/MetaLifeHoldingReward.json";
import MetaLifeLZReward from "../../../contracts/mainnet/lz-rewards/LegendsZoneRewards.json";
import {
  LZREWARD_RIBBON_CYBER_WEAPON,
  LZREWARD_RIBBON_CYBER_ARMOR,
  LZREWARD_RIBBON_ROUGH_PET,
  LZREWARD_RIBBON_ROBOTER_WEAPON,
  LZREWARD_RIBBON_MATRIX_ANGEL_CAR,
  LZREWARD_RIBBON_ML_NETWORK_PASS,
  LZREWARD_RIBBON_PARTICLES_COSMETIC_EFFECT,
  LZREWARD_RIBBON_SHADOW_GEM
} from "../../../enum/HoldingReward";

const HoldingRewards = () => {

  document.title = "Holding rewards | Legends Zone";

  const [assets, setAssets] = useState([]);
  const [modalExecuteInProgress, setModalExecuteInProgress] = useState(false);
  const [modalExecuted, setModalExecuted] = useState(false);
  const [modalNoUpdate, setModalNoUpdate] = useState(false);
  const [modalInformation, setModalInformation] = useState(false);
  const [assetsProcessed, setAssetsProcessed] = useState([]);

  const [contractHoldingRewards, setContractHoldingRewards] = useState({});
  const [account, setAccount] = useState('');

  const getWeb3Data = async () => {
    const web3 = new Web3(window.ethereum);
    const networkId = await web3.eth.net.getId();
    const accounts = await web3.eth.getAccounts()

    if (networkId !== 137 && networkId !== 11155111) {
      toggleChangeNetworkNotification();
      return [null, accounts[0]];
    }

    try {
      if (networkId == 11155111) {
        const contractDeployed = MetaLifeHoldingReward.networks[networkId];
        const instanceContractHoldingReward = new web3.eth.Contract(MetaLifeHoldingReward.abi, contractDeployed && contractDeployed.address);

        return [instanceContractHoldingReward, accounts[0]];
      }
      // Mainnet: Polygon
      const contractDeployed = MetaLifeLZReward.networks[networkId];
      const instanceContractHoldingReward = new web3.eth.Contract(MetaLifeLZReward.abi, contractDeployed && contractDeployed.address);

      return [instanceContractHoldingReward, accounts[0]];
    } catch (error) {
      // Catch any errors for any of the above operations.
      console.log(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  const toggleChangeNetworkNotification = () => {
    setModalInformation(true);
  }

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
      { tokenId: 1, ribbon: LZREWARD_RIBBON_CYBER_WEAPON, img: Hold_WeaponCyber, code:'cyber-weapon', item: 'Weapon', typeClass: 'Cyber', period: '1 month', quantity: 0, quantitySaved: 0},
      { tokenId: 2, ribbon: LZREWARD_RIBBON_CYBER_ARMOR, img: Hold_ArmorCyber, code:'cyber-armor', item: 'Armor', typeClass: 'Cyber', period: '3 months', quantity: 0, quantitySaved: 0},
      { tokenId: 3, ribbon: LZREWARD_RIBBON_ROUGH_PET, img: Hold_PetRough, code:'rough-pet', item: 'Pet', typeClass: 'Rough', period: '6 months', quantity: 0, quantitySaved: 0},
      { tokenId: 4, ribbon: LZREWARD_RIBBON_ROBOTER_WEAPON, img: Hold_WeaponRoboter, code:'roboter-weapon', item: 'Weapon', typeClass: 'Roboter', period: '9 months', quantity: 0, quantitySaved: 0},
      { tokenId: 5, ribbon: LZREWARD_RIBBON_MATRIX_ANGEL_CAR, img: Hold_MatrixAngelCar, code: 'matrix-angel-car', item: 'Car', typeClass: 'Matrix Angel', period: '12 months', quantity: 0, quantitySaved: 0},
      { tokenId: 6, ribbon: LZREWARD_RIBBON_ML_NETWORK_PASS, img: Hold_MLNetworkPass, code: 'ml-network-pass', item: 'ML Network pass', typeClass: '', period: '18 months', quantity: 0, quantitySaved: 0},
      { tokenId: 7, ribbon: LZREWARD_RIBBON_PARTICLES_COSMETIC_EFFECT, img: Hold_ParticlesCosmeticEffect, code: 'particles-cosmetic-effect', item: 'Particles cosmetic effect', typeClass: '', period: '21 months', quantity: 0, quantitySaved: 0},
      { tokenId: 8, ribbon: LZREWARD_RIBBON_SHADOW_GEM, img: Hold_ShadowGem, code: 'shadow-gem', item: 'Shadow gem', typeClass: '', period: '24 months', quantity: 0, quantitySaved: 0},
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
    getWeb3Data().then((data) => {
      setContractHoldingRewards(data[0]);
      setAccount(data[1]);
    }).catch((err) => {
      console.error(err)
    });

    const fetchData = async () => {
      defineAssets();
    }

    if (sessionStorage.getItem("authUser")) {
      fetchData();
    }

  }, []);

  return (
  <React.Fragment>

    <Modal size="lg" id="flipModalInformation" isOpen={modalInformation} toggle={() => {setModalInformation(false) }} modalClassName="zoomIn" centered >
      <ModalHeader className="modal-title" id="flipModalInformationLabel">
        Warning !
      </ModalHeader>
      <ModalBody className="text-center">
        <p className="text-white">Select "Polygon" network on top right corner. You could log in again to mint reward.</p>
        <figure className="figure mt-5">
          <img width="350" className="figure-img img-thumbnail img-fluid rounded m-2" src={IMG_NETWORKS_POLYGON}  />
        </figure>
      </ModalBody>
    </Modal>

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
                  <li>
                    To claim, you must use Polygon network (top right corner of your screen) and have some $MATIC in your wallet
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
              <Reward asset={asset} contract={contractHoldingRewards} account={account}/>
            </Col>
          ))}
        </Row>

      </Container>
    </div>
  </React.Fragment>
  ) ;
}

export default HoldingRewards;

export class getInitHoldingRewards {
}