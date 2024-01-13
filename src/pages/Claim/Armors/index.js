import React, {useEffect, useState} from 'react';
import {Col, Container, Modal, ModalBody, ModalHeader, Row} from "reactstrap";
import IMG_NETWORKS_ETHEREUM from "../../../assets/images/metalegends/networks_ethereum.png";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import Player from "../../../Components/Player";
import ClaimAsset from "./ClaimAsset";

const Armor = () => {

  const [modalInformation, setModalInformation] = useState(false);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [classNamePlayer, setClassNamePlayer] = useState('');
  const [armorNameVideos, ] = useState(['1', '2', '3', '4', '5', '6']);

  const ML_IPFS = 'https://metalegends.mypinata.cloud/ipfs/';
  const ARMOR_CID = 'QmWhLmvNXqkTajFZYDWXLBKUBArxadaLsqwWKC5aC6m8YH/mp4';
  const URL_MP4 = `${ML_IPFS}${ARMOR_CID}/`

  document.title = "Claim perk Armor | Legends Zone";

  useEffect(() => {

    var windowSize = document.documentElement.clientWidth;
    if (windowSize < 1200) {
      setClassNamePlayer('d-none');
    }

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
          <BreadCrumb title="Armors" pageTitle="Claim"/>
          <Row>
            <Col xl="6" className={classNamePlayer}>
              <Player videos={armorNameVideos} path={URL_MP4}/>
            </Col>

            <Col xl="6">
              {/*<Row>*/}
              {/*  <ClaimAsset contract={contract} account={account} title="Perk package + OG" func="random"/>*/}
              {/*  <ClaimAsset contract={contract} account={account} title="Council" func="council"/>*/}
              {/*</Row>*/}
            {/*  <Row>*/}
            {/*    <ClaimAsset contract={contract} account={account} title="Honorary" func="honorary" />*/}
            {/*    <ClaimAsset contract={contract} account={account} title="Whale" func="whale" />*/}
            {/*  </Row>*/}
            {/*  <Row>*/}
            {/*    <ClaimAssetSingle contract={contract} account={account} title="Judge" func="judge" />*/}
            {/*    <ClaimAssetSingle contract={contract} account={account} title="Guardian" func="guardian" />*/}
            {/*  </Row>*/}
            </Col>

          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default Armor;
