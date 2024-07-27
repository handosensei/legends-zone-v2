import React, {useEffect, useState} from 'react';
import {Card, CardBody, Col, Container, Modal, ModalBody, ModalHeader, Row} from "reactstrap";
import IMG_NETWORKS_ETHEREUM from "../../../assets/images/metalegends/networks_ethereum.png";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import Player from "../../../Components/Player";
import Rarity from "./Rarity";
import Claim from "./Claim";
import Web3 from "web3";
import MetaLifeArmor from "../../../contracts/mainnet/og-armor/MetaLifeArmor.json";
const contractAddress = "0xE091774B4a6d0990d0ba7d9478de6e00f7175f7f";

/**

Process pour ajouter des amors à minter
 1 - verifier si le wallet peut minter avec "publicAllowList"
 2 - si le wallet ne peut pas minter, utilser "setPublicAllowList"
 3 - Verifier le nombre que le wallet peut minter avec "walletMintsVerify"
 4 - Définir le nombre de NFT à minter en fonction de "walletMintsVerify" en additionnant la quantité
 5 - Ajouter les wallets avec le nombre à minter

 setPublicAllowList(1)
 -> write - set wallet to allow mint ["0x24DF9F5A2624Db695ee695399fd43DEB62c475Bd"]
 publicAllowList(1)
 -> read - wallet should mint
 setWalletMintsVerify(2)
 -> write - add wallet and quantity to allowlist
 walletMintsModified(1)
 -> read - how many time public allow mint modified
 walletMintsVerify(1)
 -> read - how many can mint

 */
const Armor = () => {

  const [modalInformation, setModalInformation] = useState(false);
  const [account, setAccount] = useState('');
  const [supplyTotal, setSupplyTotal] = useState(0);
  const [classNamePlayer, setClassNamePlayer] = useState('');
  const [armorNameVideos, ] = useState(['1.mp4', '2.mp4', '3.mp4', '4.mp4', '5.mp4', '6.mp4']);

  const ML_IPFS = 'https://metalegends.mypinata.cloud/ipfs/';
  const ARMOR_CID = 'QmWhLmvNXqkTajFZYDWXLBKUBArxadaLsqwWKC5aC6m8YH/mp4';
  const URL_MP4 = `${ML_IPFS}${ARMOR_CID}/`

  document.title = "Claim perk Armor | Legends Zone";

  const toggleChangeNetworkNotification = () => {
    setModalInformation(true);
  }

  const getWeb3Data = async () => {
    const web3 = new Web3(window.ethereum);
    const networkId = await web3.eth.net.getId();
    const accounts = await web3.eth.getAccounts()

    if (networkId !== 1) {
      toggleChangeNetworkNotification();
      return [null, accounts[0]];
    }

    const contractDeployed = {
      "events": {},
      "links": {},
      "address": contractAddress,
      "transactionHash": "0x6d79e3bca72a9d19caec939c21549b4139225e5b61ffe265afa402b30b4e82cc"
    }

    try {
      const instance = new web3.eth.Contract(MetaLifeArmor, contractDeployed && contractAddress);
      return [instance, accounts[0]];
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

      setAccount(data[1]);

      data[0].methods.totalSupply().call().then((res) => {
        setSupplyTotal(res);
      });

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
          <BreadCrumb title="Armors" pageTitle="Claim"/>
          <Row>

            <Col xl="5" className={classNamePlayer}>
              <Player videos={armorNameVideos} path={URL_MP4}/>
            </Col>

            <Col xl="7">
              <Card>
                <CardBody>
                  <h2>OG Armors</h2>

                  <Row className="mt-5">
                    <Col lg={6} sm={6}>
                      <div className="p-2 border border-dashed rounded text-center">
                        <div>
                          <p className="text-muted fw-medium mb-1">Supply :</p>
                          <h4 className="fs-20 mb-0">
                            <i className="mdi mdi-panorama-sphere-outline me-1"></i> {supplyTotal}/1661
                          </h4>
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <div className="mt-5 text-muted">
                    <h5 className="fs-14">Description :</h5>
                    <p>
                      The Meta-Life Armors is the first perks for holders who minted their NFT Legends at least 0.5 ETH.
                    </p>
                    <p>
                      Open this <a href="https://docs.google.com/spreadsheets/d/1ZXiERq44tG6FZsKtrHrrOMZ1vJazHxKPKkBalzg8Aas/edit?usp=sharing" target="_blank" rel="noreferrer">Google sheet file</a> to find out if you are eligible
                    </p>
                  </div>
                  <Rarity />
                  <Claim account={account} />
                </CardBody>
              </Card>
            </Col>

          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default Armor;
