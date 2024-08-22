import React, {useEffect, useState} from "react";
import {Col, Container, Row} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import Web3 from "web3";

import RoughSkin from "../../../assets/images/metalegends/badge-reward/RoughArmor.png";
import GoldboiWeapon from "../../../assets/images/metalegends/badge-reward/WeaponGoldboi.png";
import CyberPet from "../../../assets/images/metalegends/badge-reward/CyberPet.png";
import GoldboiVehicle from "../../../assets/images/metalegends/badge-reward/GoldboiCar.png";
import CelestialSniper from "../../../assets/images/metalegends/badge-reward/SniperRifleCelestial.png";
import BadgeRewardsContract from "../../../contracts/mainnet/badge-rewards/MetaLifeBadgeRewards.json";

import Reward from "./Reward";
import WarningPolygon from "../../../Components/Modal/WarningPolygon";

const BadgeRewards = () => {

  document.title = "Badge rewards | Legends Zone";

  const CID = 'QmX7rGciYSaiejsov74pwt5yoKox4kyoQoDQij12wqjg83';

  const GIF_ROUGH_SKIN = `https://metalegends.mypinata.cloud/ipfs/${CID}/gif/rough-armor.gif`;
  const GIF_GOLDBOI_WEAPON = `https://metalegends.mypinata.cloud/ipfs/${CID}/gif/goldboi-weapon.gif`;
  const GIF_CYBER_PET = `https://metalegends.mypinata.cloud/ipfs/${CID}/gif/cyber-pet.gif`;
  const GIF_GOLDBOI_VEHICLE = `https://metalegends.mypinata.cloud/ipfs/${CID}/gif/goldboi-vehicle.gif`;
  const GIF_CELESTIAL_SNIPER = `https://metalegends.mypinata.cloud/ipfs/${CID}/gif/celestial-sniper.gif`;

  const [account, setAccount] = useState('');
  const [assets, setAssets] = useState([]);
  const [contractBadgeRewards, setContractBadgeRewards] = useState({});

  const getWeb3Data = async () => {
    const web3 = new Web3(window.ethereum);
    const networkId = await web3.eth.net.getId();
    const accounts = await web3.eth.getAccounts()
    if (networkId !== 137) {
      return [null, accounts[0]];
    }

    try {
      const contractDeployed = BadgeRewardsContract.networks[networkId];
      const instanceContractHoldingReward = new web3.eth.Contract(BadgeRewardsContract.abi, contractDeployed && contractDeployed.address);

      return [instanceContractHoldingReward, accounts[0]];
    } catch (error) {
      // Catch any errors for any of the above operations.
      console.log(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  const getBadgeRewards = () => {
    // 📷 (3 to 5) Legend investor : Rough Armor
    // 📷(6 to 10) Virtual conservative : Goldboi Weapon
    // 📷(11 to 21) Legendary Holder : Cyber Pet
    // 📷(21 to 50) Legend Museum : Goldboi Vehicle (The on in preview )
    // 📷(51+) Legend Whale : Celestial Sniper
    return [
      { tokenId:1, gif: GIF_ROUGH_SKIN, img: RoughSkin, typeClass: 'Rough', item: 'Special Armor Skin', badge: 'Legend Investor'},
      { tokenId:2, gif: GIF_GOLDBOI_WEAPON, img: GoldboiWeapon, typeClass: 'Goldboi', item: 'Weapon', badge: 'Virtual conservative'},
      { tokenId:3, gif: GIF_CYBER_PET, img: CyberPet, typeClass: 'Cyber', item: 'Pet', badge: 'Legendary Holder'},
      { tokenId:4, gif: GIF_GOLDBOI_VEHICLE, img: GoldboiVehicle, typeClass: 'Goldboi', item: 'Vehicle', badge: 'Legend Museum'},
      { tokenId:5, gif: GIF_CELESTIAL_SNIPER, img: CelestialSniper, typeClass: 'Celestial', item: 'Sniper', badge: 'Legend Whale'}
    ]
  }

  useEffect(() => {
    setAssets(getBadgeRewards());

    getWeb3Data().then((data) => {
      setContractBadgeRewards(data[0]);
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
          <BreadCrumb title="Badge rewards" pageTitle="Claim"/>

          <Row className="mb-4">
            <Col xxl={12}>
              <div className="card ribbon-box border shadow-none mb-lg-0 right">
                <div className="card-body text-muted">
                  <span className="ribbon-three ribbon-three-info"><span>Info</span></span>
                  <h3 className="text-white lh-base">Informations</h3>
                  <p>
                    You are eligible if you had at least 3 NFT in the wallet at the time of the snapshot made on 27th July 2024.
                  </p>
                  <p>
                    To claim, you must use Polygon network (top right corner of your screen) and have some $MATIC in your wallet
                  </p>
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            {assets.map((asset, key) => (
              <Col key={key} xl={4}>
                <Reward asset={asset} contract={contractBadgeRewards} account={account}/>
              </Col>
            ))}
          </Row>

        </Container>
      </div>
    </React.Fragment>
  );
}

export default BadgeRewards;
