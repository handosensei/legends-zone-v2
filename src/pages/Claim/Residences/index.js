import React, {useEffect, useState} from 'react';
import {Card, CardBody, Col, Container, Row} from "reactstrap";

import BreadCrumb from "../../../Components/Common/BreadCrumb";
import Player from "../../../Components/Player";
import Claim from "./Claim";

import MetaLifeResidence from "../../../contracts/mainnet/og-residence/MetaLifeResidence.json";
import Web3 from "web3";

const Residence = () => {

  const ML_IPFS = 'https://metalegends.mypinata.cloud/ipfs/';
  const RESIDENCE_DEMO_CID = 'QmVk2zayexHG23igKa5FTHRD8E2UfKTygywTTsktmuBzF1';
  const URL_MP4 = `${ML_IPFS}${RESIDENCE_DEMO_CID}`

  document.title = "Claim perk \"OG Residence\" | Legends Zone";

  const [contract, setContract] = useState({});
  const [account, setAccount] = useState('');
  const [supply, setSupply] = useState(0);
  const residenceList = [''];

  const getWeb3Data = async () => {
    const web3 = new Web3(window.ethereum);
    const networkId = await web3.eth.net.getId();
    const accounts = await web3.eth.getAccounts()

    if (networkId !== 1 && networkId !== 11155111) {
      return [null, accounts[0]];
    }

    try {
      const contractDeployed = MetaLifeResidence.networks[networkId];
      const instanceContractResidence = new web3.eth.Contract(MetaLifeResidence.abi, contractDeployed && contractDeployed.address);

      return [instanceContractResidence, accounts[0]];
    } catch (error) {
      // Catch any errors for any of the above operations.
      console.log(
      `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  const getSupply = () => {
    if (contract == null) {
      return;
    }
    if (contract.methods === undefined) {
      return;
    }
    contract.methods.totalSupply().call().then((res) => {
      setSupply(res);
    });

    return supply;
  }

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
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="OG Residence" pageTitle="Claim perk"/>
          <Row>
            <Col xl="5">
              <Player videos={residenceList} path={URL_MP4}/>
            </Col>

            <Col xl="7">
              <Card>
                <CardBody>
                  <h2>Perk Residence</h2>

                  <Row className="mt-5">
                    <Col lg={6} sm={6}>
                      <div className="p-2 border border-dashed rounded text-center">
                        <div>
                          <p className="text-muted fw-medium mb-1">Supply :</p>
                          <h4 className="fs-20 mb-0">
                            <i className="mdi mdi-panorama-sphere-outline me-1"></i> {getSupply()} / 700
                          </h4>
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <div className="mt-5 text-muted">
                    <h5 className="fs-14">Description :</h5>
                    <p>
                      Meta-Life Legends-Zone, mint your perk Residence NFT, a supply of 700 NFTs.
                      Representing each classes of residences, each with 3 different areas.
                      Exclusively accessible to members who have minted their NFTs at a minimum of 2 ETH, the mint residence
                      offers a unique opportunity to acquire an exceptional residence.
                    </p>
                  </div>

                  <div className="product-content mt-5">
                    <h5 className="fs-14">Rarity description :</h5>
                    <p className="text-muted">
                      Each class has 100 residences with 3 types of area:
                    </p>
                    <ul className="text-muted">
                      <li>10 "Grand" residences per class</li>
                      <li>40 "Comfortable" residences per class</li>
                      <li>50 "Compact" residences per class</li>
                    </ul>
                  </div>

                  <Claim contract={contract} account={account} />

                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Residence;
