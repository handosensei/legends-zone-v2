import React, {useEffect, useState} from 'react';
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Input, Modal, ModalHeader, ModalBody
} from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import Player from "./Player";
import Rarity from "./Rarity";
import Claim from "./Claim";
import SupplyData from "./SupplyData";

import Web3 from "web3";
import MetaLifeHealingDroneTestnet from "../../../contracts/testnet/healing-drone/MetaLifeHealingDrone.json";
import MetaLifeHealingDrone from "../../../contracts/mainnet/healing-drone/MetaLifeHealingDrone.json";
import IMG_NETWORKS_POLYGON from "../../../assets/images/metalegends/networks_polygon.png";


const HealingDrone = () => {

  const [modalInformation, setModalInformation] = useState(false);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');

  document.title = "Claim \"Healing drone\" reward | Legends Zone";

  const toggleChangeNetworkNotification = () => {
    setModalInformation(true);
  }

  const getWeb3Data = async () => {
    const web3 = new Web3(window.ethereum);
    const networkId = await web3.eth.net.getId();
    const accounts = await web3.eth.getAccounts()

    if (networkId !== 137 && networkId !== 11155111) {
      toggleChangeNetworkNotification();
      return [null, accounts[0]];
    }

    try {
      if (networkId === 11155111) {
        const contractDeployed = MetaLifeHealingDroneTestnet.networks[networkId];
        const instanceContractHoldingReward = new web3.eth.Contract(MetaLifeHealingDroneTestnet.abi, contractDeployed && contractDeployed.address);

        return [instanceContractHoldingReward, accounts[0]];
      }
      // Mainnet: Polygon
      const contractDeployed = MetaLifeHealingDrone.networks[networkId];
      const instanceContractHoldingReward = new web3.eth.Contract(MetaLifeHealingDrone.abi, contractDeployed && contractDeployed.address);

      return [instanceContractHoldingReward, accounts[0]];
    } catch (error) {
      // Catch any errors for any of the above operations.
      console.log(
      `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  useEffect(() => {
    getWeb3Data().then((data) => {
      setContract(data[0]);
      setAccount(data[1]);
    }).catch((err) => {
      console.error(err)
    });
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

      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Healing drones" pageTitle="Claim"/>
          <Row>
            <Col xl="5">
              <Player/>
            </Col>

            <Col xl="7">
              <Card>
                <CardBody>
                  <h2>Healing Drone</h2>

                  <SupplyData contract={contract} />

                  <div className="mt-5 text-muted">
                    <h5 className="fs-14">Description :</h5>
                    <p>
                      Meta-Life LegendsZone, the Healing drone is the 6th holding reward (NFT ERC-721) for holders who have kept their NFT Legends for more than 15 months.
                    </p>
                  </div>

                  <Rarity />

                  <Claim contract={contract} account={account} />

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
