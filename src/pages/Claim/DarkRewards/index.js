import React, {useEffect, useState} from 'react';
import {Card, CardBody, Col, Container, Row} from "reactstrap";

import WarningPolygon from "../../../Components/Modal/WarningPolygon";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import Player from "../../../Components/Player";
import Claim from "./Claim";

import Web3 from "web3";

import DarkLegendsRewards from "../../../contracts/mainnet/dark-rewards/DarkLegendsRewards.json";

const DarkRewards = () => {

  const ML_IPFS = 'https://metalegends.mypinata.cloud/ipfs/';
  const DARK_DEMO_CID = 'QmSJggxBLvLJGGVtBiifBvTakmMTptrGY1fJHfecMrYpXC';
  const URL_MP4 = `${ML_IPFS}${DARK_DEMO_CID}/mp4/`

  const armorsList = ['armor_roboter_medium.mp4'];

  const [contract, setContract] = useState({});
  const [account, setAccount] = useState('');

  const getWeb3Data = async () => {
    const web3 = new Web3(window.ethereum);
    const networkId = await web3.eth.net.getId();
    const accounts = await web3.eth.getAccounts()

    try {
      const contractDeployed = DarkLegendsRewards.networks[networkId];
      const instanceContract = new web3.eth.Contract(DarkLegendsRewards.abi, contractDeployed && contractDeployed.address);

      return [instanceContract, accounts[0]];
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
      <WarningPolygon />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Dark Armor" pageTitle="Claim Dark Rewards"/>
          <Row>
            <Col xl="5">
              <Player videos={armorsList} path={URL_MP4}/>
            </Col>

            <Col xl="7">
              <Card>
                <CardBody>
                  <h2>Dark Roboter Medium Armors</h2>

                  <Row className="mt-5">
                    <Col lg={6} sm={6}>
                      <div className="p-2 border border-dashed rounded text-center">
                        <div>
                          <p className="text-muted fw-medium mb-1">Supply :</p>
                          <h4 className="fs-20 mb-0">
                            <i className="mdi mdi-qqchat me-1"></i> 200
                          </h4>
                        </div>
                      </div>
                    </Col>
                    <Col lg={6} sm={6}>
                      <div className="p-2 border border-dashed rounded text-center">
                        <div>
                          <p className="text-muted fw-medium mb-1">Expire at :</p>
                          <h4 className="fs-20 mb-0">
                            <i className="ri ri-calendar-fill me-1"></i> Wednesday 15 May 2024 23:59:59 UTC
                          </h4>
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <div className="mt-5 text-muted">
                    <h5 className="fs-14">Description :</h5>
                    <p>
                      Meta-Life Dark Legends, mint your Dark roboter medium armor NFT, a supply of 200 NFTs.
                    </p>
                    <p>
                      Exclusively accessible to members who won <a href="https://zealy.io/cw/metalegends" target="_blank" rel="noreferrer"> Zealy Quest</a> S2.
                    </p>
                  </div>
                  <Claim contract={contract} account={account} />

                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default DarkRewards;