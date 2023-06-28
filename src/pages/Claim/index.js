import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import PetsPlayer from "./PetsPlayer";
import {getEligibilityOgPets} from "../../client/ApiMetaLegends";
import 'video.js/dist/video-js.css';
import ClaimAsset from "./ClaimAsset";
import ClaimAssetSingle from "./ClaimAssetSingle";
import Web3 from "web3";
import MetaLifeOgPets from "../../contracts/testnet/sepolia/og-pets/MetaLifeOgPets.json";

const Claim = () => {

  const [ogPet, setOgPet] = useState({});
  const [contractOgPets, setContractOgPets] = useState({});
  const [account, setAccount] = useState('');

  document.title = "Claim \"OG Pets\" | Legends Zone";

  const getWeb3Data = async () => {
    try {
      const web3 = new Web3(window.ethereum);

      const accounts = await web3.eth.getAccounts()
      const networkId = await web3.eth.net.getId();

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
      //console.log(data[1]);
      console.log('==============')
      //console.log(data[0].methods.addressClaimbleRandom(data[1]).call().then((res) => {console.log(res)}));
      console.log(data[0]);
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
                <ClaimAsset claimable={ogPet.council}         title="Council"           func="council"  contract={contractOgPets} account={account}/>
              </Row>
              <Row>
                <ClaimAssetSingle claimable={ogPet.honorary} title="Honorary" func="honorary" contract={contractOgPets} account={account}/>
                <ClaimAssetSingle claimable={ogPet.guardian} title="Guardian" func="guardian" contract={contractOgPets} account={account}/>
              </Row>
              <Row>
                <ClaimAssetSingle claimable={ogPet.judge} title="Judge" func="judge" contract={contractOgPets} account={account}/>
                <ClaimAssetSingle claimable={ogPet.whale} title="Top 10 Whale" func="whale" contract={contractOgPets} account={account}/>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Claim;
