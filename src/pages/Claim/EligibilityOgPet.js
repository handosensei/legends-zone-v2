import React, {useEffect, useState} from "react";
import {Card, CardBody, Col, Input} from "reactstrap";
import PreviewCardSimpleHeader from "../../Components/Common/PreviewCardSimpleHeader";
import MetaLifeOgPets from "../../contracts/testnet/sepolia/test-og-pets/MetaLifeOgPets.json";
import Web3 from "web3";
// USELESS PAGE
const EligibilityOgPet = ({ogPet}) => {

  const [defaultCounter, setDefaultCounter] = useState(0);
  const [total, setTotal] = useState('0');
  const [contractOgPets, setContractOgPets] = useState({});
  const [account, setAccount] = useState('');

  function countUP(id, prev_data_attr) {
    if (prev_data_attr < total) {
      id(prev_data_attr + 1);
    }
  }

  function countDown(id, prev_data_attr) {
    if (prev_data_attr >= 1) {
      id(prev_data_attr - 1);
    }
  }

  const DisplayEligibility = ({nbEligibility}) => {
    let classSpan = 'text-success';
    if (nbEligibility === 0) {
      classSpan = "text-muted";
    }

    return (
    <div className="flex-shrink-0">
      <span className={classSpan}>{nbEligibility}</span>
    </div>
    );
  }

  const claim = () => {
    mint(defaultCounter);
    console.log(defaultCounter);
  }

  const mint = async (nb) => {
    console.log(nb);
    contractOgPets.methods.mintEligible(nb).send({ from: account })
    .then((res) => {
      console.log(res);

    })
    .catch((err) => {
      console.log('Add item failed','Error');
      console.log(err)
    });
  }

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
    setTotal(Number(
      ogPet.council+
      ogPet.guardian+
      ogPet.honorary+
      ogPet.judge+
      ogPet.mint+
      ogPet.whale+
      ogPet.og
    ));

  }, [ogPet]);

  useEffect(() => {

    getWeb3Data().then((data) => {
      setContractOgPets(data[0]);
      setAccount(data[1]);
    }).catch((err) => {
      console.error(err)
    });
  }, []);

  return (
  <Col xl={6}>
    <Card>
      <PreviewCardSimpleHeader title="Claimable"/>
      <CardBody>
        <div className="live-preview">
          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Perk mint package
              <DisplayEligibility nbEligibility={ogPet.mint} />
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Top 10 Whale
              <DisplayEligibility nbEligibility={ogPet.whale} />
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Honorary
              <DisplayEligibility nbEligibility={ogPet.honorary} />
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Council
              <DisplayEligibility nbEligibility={ogPet.council} />
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              OG
              <DisplayEligibility nbEligibility={ogPet.og} />
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Judge
              <DisplayEligibility nbEligibility={ogPet.judge} />
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Guardian
              <DisplayEligibility nbEligibility={ogPet.guardian} />
            </li>
          </ul>
        </div>
      </CardBody>
    </Card>
  </Col>
  );
}

export default EligibilityOgPet;