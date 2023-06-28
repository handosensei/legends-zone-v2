import React, {useEffect, useState} from "react";
import {Card, CardBody, CardHeader, Col, Input} from "reactstrap";
import Web3 from "web3";
import MetaLifeOgPets from "../../contracts/testnet/sepolia/og-pets/MetaLifeOgPets.json";

const ClaimAsset = ({claimable, title, func, contract, account}) => {

  const [counter, setCounter] = useState(0);
  const [remainingToClaim, setRemainingToClaim] = useState(0);

  const getRemainingToClaimRandom = () => {
    if (contract.methods != undefined) {
      contract.methods.addressClaimbleRandom(account).call()
        .then((res) => {
          setRemainingToClaim(res);
        });
      return remainingToClaim;
    }
    return 0;
  }

  const getRemainingToClaimCouncil = () => {
    if (contract.methods != undefined) {
      contract.methods.addressClaimbleCouncil(account).call()
      .then((res) => {
        setRemainingToClaim(res);
      });
      return remainingToClaim;
    }
    return 0;
  }

  const getRemainingToClaim = () => {
    switch (func) {
      case 'random':
        return getRemainingToClaimRandom();
      case 'council':
        return getRemainingToClaimCouncil();
      default:
        console.log(`Sorry, ${func} unknown.`);
    }
  }

  const RemainingToClaim = () => {
    const restToClaim = getRemainingToClaim();
    if (restToClaim > 0) {
      return (<span className="text-success">{restToClaim}</span>)

    }
    return (
      <span className="text-muted">{restToClaim}</span>
    );
  }

  const claim = () => {
    console.log(func);
    switch (func) {
      case 'random':
        mintRandom();
        break;
      case 'council':
        mintCouncil();
        break;
      default:
        console.log(`Sorry, ${func} unknown.`);
    }
  }

  const mintCouncil = async () => {
    if (contract.methods == undefined) {
      return;
    }

    contract.methods.mintCouncil(counter).send({ from: account })
    .then((res) => {
      console.log(res);
      setCounter(0);
    })
    .catch((err) => {
      console.log('Add item failed','Error');
      console.log(err)
    });
  }

  const mintRandom = async () => {
    if (contract.methods == undefined) {
      return;
    }

    contract.methods.mintRandom(counter).send({ from: account })
    .then((res) => {
      setCounter(0);
    })
    .catch((err) => {
      console.log('Add item failed','Error');
      console.log(err)
    });
  }

  function countUp(prev_data_attr) {
    if (prev_data_attr < remainingToClaim) {
      setCounter(prev_data_attr + 1);
    }
  }

  function countDown(prev_data_attr) {
    if (prev_data_attr >= 1) {
      setCounter(prev_data_attr - 1);
    }
  }

  const ClaimButton = () => {
    if (remainingToClaim > 0) {
      return (<button className="btn btn-primary" onClick={() => { claim(); }}>Claim</button>);
    }

    return (<button className="btn btn-light">Claim</button>);
  }

  return (
    <Col xl="6">
      <Card>
        <CardHeader>{title}</CardHeader>
        <CardBody>
          <div className="list-group-item d-flex justify-content-between align-items-center">
            Eligible
            <div className="flex-shrink-0">
              <span className={claimable > 0 ? "text-success": "text-muted"}>{claimable}</span>
            </div>
          </div>

          <div className="list-group-item d-flex justify-content-between align-items-center">
            Remaining to be claim
            <div className="flex-shrink-0">
              <RemainingToClaim />
            </div>
          </div>

          <div className="d-grid gap-2 mt-3">
            <div className="input-step full-width">
              <button type="button" className="minus" onClick={() => { countDown(counter); }} >
                –
              </button>
              <Input type="number" className="product-quantity" value={counter} min="0" max="20" readOnly />
              <button type="button" className="plus" onClick={() => { countUp(counter); }} >
                +
              </button>
            </div>
            <ClaimButton onClick={() => { claim(); }}/>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
}

export default ClaimAsset;