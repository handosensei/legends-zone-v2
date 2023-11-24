import React, {useEffect, useState} from 'react';
import {
  Col,
  Container,
  Row,
  Modal, ModalHeader, ModalBody
} from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import Player from "./Player";

import Web3 from "web3";

import IMG_NETWORKS_ETHEREUM from "../../../assets/images/metalegends/networks_ethereum.png";
import ClaimAsset from "./ClaimAsset";
import ClaimAssetSingle from "./ClaimAssetSingle";
import MetaLifeVehicleTestnet from "../../../contracts/testnet/og-vehicle/MetaLifeVehicle.json";
//import MetaLifeVehicleMainnet from "../../../contracts/mainnet/og-vehicle/MetaLifeVehicle.json";

const Vehicle = () => {

  const [modalInformation, setModalInformation] = useState(false);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [classNamePlayer, setClassNamePlayer] = useState('');

  document.title = "Claim perk Vehicle | Legends Zone";

  const toggleChangeNetworkNotification = () => {
    setModalInformation(true);
  }

  const getWeb3Data = async () => {
    const web3 = new Web3(window.ethereum);
    const networkId = await web3.eth.net.getId();
    const accounts = await web3.eth.getAccounts()

    if (networkId !== 1 && networkId !== 11155111) {
      toggleChangeNetworkNotification();
      return [null, accounts[0]];
    }

    try {
      if (networkId === 11155111) {
        const contractDeployed = MetaLifeVehicleTestnet.networks[networkId];
        const instanceContractHoldingReward = new web3.eth.Contract(MetaLifeVehicleTestnet.abi, contractDeployed && contractDeployed.address);

        return [instanceContractHoldingReward, accounts[0]];
      }
      // Mainnet: Ethereum
      // const contractDeployed = MetaLifeVehicleMainnet.networks[networkId];
      // const instanceContractHoldingReward = new web3.eth.Contract(MetaLifeVehicleMainnet.abi, contractDeployed && contractDeployed.address);

      // return [instanceContractHoldingReward, accounts[0]];
    } catch (error) {
      // Catch any errors for any of the above operations.
      console.log(
      `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  useEffect(() => {
    var windowSize = document.documentElement.clientWidth;
    if (windowSize < 1200) {
      setClassNamePlayer('d-none');
    }

    getWeb3Data().then((data) => {
      setContract(data[0]);
      setAccount(data[1]);
    }).catch((err) => {
      console.error(err);
    });
  }, []);

  return (
  <React.Fragment>

    <Modal size="lg" id="flipModalInformation" isOpen={modalInformation} toggle={() => {setModalInformation(false) }} modalClassName="zoomIn" centered >
      <ModalHeader className="modal-title" id="flipModalInformationLabel">
        Warning !
      </ModalHeader>
      <ModalBody className="text-center">
        <p className="text-white">Select "Ethereum" network on top right corner. You could log in again to mint reward.</p>
        <figure className="figure mt-5">
          <img width="350" className="figure-img img-thumbnail img-fluid rounded m-2" src={IMG_NETWORKS_ETHEREUM}   alt="img" />
        </figure>
      </ModalBody>
    </Modal>

    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Vehicles" pageTitle="Claim"/>
        <Row>
          <Col xl="6" className={classNamePlayer}>
            <Player/>
          </Col>

          <Col xl="6">
            <Row>
              <ClaimAsset contract={contract} account={account} title="Perk package + OG" func="random"/>
              <ClaimAsset contract={contract} account={account} title="Council" func="council"/>
            </Row>
            <Row>
              <ClaimAsset contract={contract} account={account} title="Honorary" func="honorary" />
              <ClaimAsset contract={contract} account={account} title="Whale" func="whale" />
            </Row>
            <Row>
              <ClaimAssetSingle contract={contract} account={account} title="Judge" func="judge" />
              <ClaimAssetSingle contract={contract} account={account} title="Guardian" func="guardian" />
            </Row>
          </Col>

        </Row>
      </Container>
    </div>
  </React.Fragment>
  );
};

export default Vehicle;
