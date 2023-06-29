import React, {useEffect, useState} from "react";
import { Button, Card, CardBody, CardHeader, Col, Input, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import Web3 from "web3";
import MetaLifeOgPets from "../../contracts/testnet/sepolia/og-pets/MetaLifeOgPets.json";

const ClaimAsset = ({claimable, title, func, contract, account}) => {

  const [counter, setCounter] = useState(0);
  const [tokenIdsMinted, setTokenIdsMinted] = useState([]);
  const [remainingToClaim, setRemainingToClaim] = useState(0);

  const [modalMinted, setModalMinted] = useState(false);

  function minted() {
    setModalMinted(!modalMinted);
  }

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

  const claim = async () => {
    if (counter === 0) {
      return;
    }
    if (contract.methods === undefined) {
      return;
    }

    let tokenIds = [];
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
    //   // save mint in BDD
    //   setCounterMinted(counter);
    //   setCounter(0);
    //   minted()
  }

  const mintCouncil = async () => {
    contract.methods.mintCouncil(counter).send({ from: account })
    .then((res) => {
      setCounter(0);
      console.log(res.from);
      console.log(res.transactionHash);
      setTokenIdsMinted(res.events.MintedCouncil.returnValues.tokenIds);
      minted();
      // save mint in BDD
    })
    .catch((err) => {
      console.log('Mint item failed','Error');
      console.log(err);
    });

    // .then((res) => {
    //   console.log(res);
    //   setCounterMinted(counter);
    //   setCounter(0);
    //   minted()
    // })
  }

  const mintRandom = async () => {
    contract.methods.mintRandom(counter).send({ from: account })
    .then((res) => {
      setCounter(0);
      console.log(res.from);
      console.log(res.transactionHash);
      setTokenIdsMinted(res.events.MintedRandom.returnValues.tokenIds);
      minted();
    })
    .catch((err) => {
      console.log('Add item failed','Error');
      console.log(err)
    });
  }

  function countUp(prev_data_attr) {
    if (prev_data_attr < remainingToClaim && prev_data_attr < 10) {
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
  <>
    <Modal size="xl" id="flipModal" isOpen={modalMinted} toggle={() => { minted(); }} modalClassName="zoomIn" centered >
      <ModalHeader className="modal-title" id="flipModalLabel" toggle={() => { minted(); }}>
      </ModalHeader>
      <ModalBody className="text-center">
        <h5 className="fs-16">
          Congrats ! {tokenIdsMinted.length} OG Pets minted
        </h5>
        <figure className="figure mt-5">
          {tokenIdsMinted.map((element, key) => (
            <img key={key} width="300" className="figure-img img-fluid rounded m-2" src={"https://metalegends.mypinata.cloud/ipfs/QmQ7awqZAj5q7KMZYkZpf5Kerpr1eTsKNdi2zKAUrQqojP/" + element + ".gif"} alt="Card cap" />
          ))}
        </figure>
      </ModalBody>
      <div className="modal-footer">
        <Button color="light" onClick={() => { minted(); }}> Close </Button>
      </div>
    </Modal>

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
  </>
  );
}

export default ClaimAsset;