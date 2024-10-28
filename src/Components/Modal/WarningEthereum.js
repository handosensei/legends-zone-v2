import React, {useEffect, useState} from 'react';
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import IMG_NETWORKS_ETHEREUM from "../../assets/images/metalegends/networks_ethereum.png";
import Web3 from "web3";

const WarningEthereum = () => {

  const [modalInformation, setModalInformation] = useState(false);

  const toggleChangeNetworkNotification = () => {
    setModalInformation(true);
  }

  const networkIsValid = () => {
    const web3 = new Web3(window.ethereum);
    web3.eth.net.getId().then((networkId) => {
      if (networkId !== 1) {
        toggleChangeNetworkNotification();
      }
    });
  }

  useEffect(() => {
    networkIsValid();
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
          <img width="350" className="figure-img img-thumbnail img-fluid rounded m-2" src={IMG_NETWORKS_ETHEREUM} alt="Ethereum" />
        </figure>
      </ModalBody>
    </Modal>
  </React.Fragment>
  );
}

export default WarningEthereum;
