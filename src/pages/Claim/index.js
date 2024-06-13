import React, { useEffect, useState } from 'react';
import {Card, CardBody, Col, Container, Modal, ModalBody, ModalHeader, Row} from 'reactstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import PetsPlayer from "./PetsPlayer";
import {getEligibilityOgPets} from "../../client/ApiMetaLegends";
import 'video.js/dist/video-js.css';
import ClaimAsset from "./ClaimAsset";
import ClaimAssetSingle from "./ClaimAssetSingle";
import Web3 from "web3";
import MetaLifeOgPets from "../../contracts/mainnet/og-pets/MetaLifeOgPets.json";
import IMG_NETWORKS_ETHEREUM from "../../assets/images/metalegends/networks_ethereum.png";

const Claim = () => {

  const [ogPet, setOgPet] = useState({});
  const [contractOgPets, setContractOgPets] = useState({});
  const [account, setAccount] = useState('');
  const [modalInformation, setModalInformation] = useState(false);

  document.title = "Claim \"OG Pets\" | Legends Zone";

  const toggleChangeNetworkNotification = () => {
    setModalInformation(true);
  }

  const getWeb3Data = async () => {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts()
    const networkId = await web3.eth.net.getId();
    if (networkId !== 1 ) {
      toggleChangeNetworkNotification();
      return [null, accounts[0]];
    }
    try {
      const contractDeployed = MetaLifeOgPets.networks[networkId];
      const instanceContractOgPets = new web3.eth.Contract(MetaLifeOgPets.abi, contractDeployed && contractDeployed.address);

      return [instanceContractOgPets, accounts[0]];

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
      setContractOgPets(data[0]);
      setAccount(data[1]);
    }).catch((err) => {
      console.error(err)
    });

    const fetchData = async () => {
      const ogPetData = await getEligibilityOgPets();
      setOgPet(ogPetData);
    }
    fetchData();
  }, []);

  return (
    <React.Fragment>

      <Modal size="lg" id="flipModalInformation" isOpen={modalInformation} toggle={() => {setModalInformation(false) }} modalClassName="zoomIn" centered >
        <ModalHeader className="modal-title" id="flipModalInformationLabel">
          Warning !
        </ModalHeader>
        <ModalBody className="text-center">
          <p className="text-white">
            Select "Ethereum" network on top right corner. You could log in again to mint reward.
          </p>

          <figure className="figure mt-5">
            <img width="350" className="figure-img img-thumbnail img-fluid rounded m-2" src={IMG_NETWORKS_ETHEREUM}  />
          </figure>
        </ModalBody>
      </Modal>

      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="OG Pets" pageTitle="Claim"/>
          <Row>

            <Col xl="8">
              <Card>
                <CardBody>
                  <div className="ratio ratio-16x9">
                    <PetsPlayer />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl="4">
              <Row>
                <ClaimAsset claimable={(ogPet.mint + ogPet.og).toString()} title="Perk package + OG" func="random"   contract={contractOgPets} account={account}/>
                {/*<ClaimAsset claimable={ogPet.council}         title="Council"           func="council"  contract={contractOgPets} account={account}/>*/}
              </Row>
              {/*<Row>*/}
                {/*<ClaimAssetSingle claimable={ogPet.honorary} title="Honorary" func="honorary" contract={contractOgPets} account={account}/>*/}
                {/*<ClaimAssetSingle claimable={ogPet.guardian} title="Guardian" func="guardian" contract={contractOgPets} account={account}/>*/}
              {/*</Row>*/}
              {/*<Row>*/}
                {/*<ClaimAssetSingle claimable={ogPet.judge} title="Judge" func="judge" contract={contractOgPets} account={account}/>*/}
                {/*<ClaimAssetSingle claimable={ogPet.whale} title="Top 10 Whale" func="whale" contract={contractOgPets} account={account}/>*/}
              {/*</Row>*/}
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Claim;
