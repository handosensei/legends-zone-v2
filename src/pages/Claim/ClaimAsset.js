import React, { useState } from "react";
import { Button, Card, CardBody, CardHeader, Col, Input, Modal, ModalBody, ModalHeader, Row } from "reactstrap";

const ClaimAsset = ({claimable, title, func, contract, account}) => {

  const [counter, setCounter] = useState(0);
  const [tokenIdsMinted, setTokenIdsMinted] = useState([]);
  const [remainingToClaim, setRemainingToClaim] = useState(0);

  const [modalMinted, setModalMinted] = useState(false);
  const [modalMintInProgress, setModalMintInProgress] = useState(false);

  const OPENSEA_OG_PETS_ITEM_URL = "https://opensea.io/assets/ethereum/0xfc634bfc0f00a2d3dcc93ceb4558da9de840fdbc/";
  const PINATA_OG_PETS_IPFS_GIF_URL="https://metalegends.mypinata.cloud/ipfs/QmWHMpnbc6mpCxZSaU797FV6q3gb7LKPusbyHL5iUATXNA/"

  function minted() {
    setModalMinted(!modalMinted);
    setModalMintInProgress(false);
  }

  function mintInProgress() {
    setModalMintInProgress(true);
  }

  function mintCancel() {
    setModalMintInProgress(false);
  }

  const getRemainingToClaimRandom = () => {
    if (contract === null) {
      return 0;
    }
    if (contract.methods !== undefined) {
      contract.methods.addressClaimbleRandom(account).call()
        .then((res) => {
          setRemainingToClaim(res);
        });
      return remainingToClaim;
    }
    return 0;
  }

  const getRemainingToClaimCouncil = () => {
    if (contract === null) {
      return 0;
    }
    if (contract.methods !== undefined) {
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
    mintInProgress();
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
    contract.methods.mintCouncil(counter).send({ from: account })
    .then((res) => {
      setCounter(0);
      setTokenIdsMinted(res.events.MintedCouncil.returnValues.tokenIds);
      minted();
      // save mint in BDD
    })
    .catch((err) => {
      mintCancel();
      console.log(err);
    });
  }

  const mintRandom = async () => {
    contract.methods.mintRandom(counter).send({ from: account })
    .then((res) => {
      setCounter(0);
      let ids = [];
      if (res.events.Transfer.length === undefined) {
        ids.push(res.events.Transfer.returnValues.id);
      } else {
        res.events.Transfer.forEach((transfer) => {
          ids.push(transfer.returnValues.id);
        });
      }
      setTokenIdsMinted(ids);

      minted();
    })
    .catch((err) => {
      mintCancel();
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
    <Modal size="lg" id="flipModalInProgress" isOpen={modalMintInProgress} toggle={() => { mintInProgress(); }} modalClassName="zoomIn" centered >
      <ModalHeader className="modal-title" id="flipModalLabel">
        Mint {func.toUpperCase()} OG Pets in progress
      </ModalHeader>
      <ModalBody className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </ModalBody>
    </Modal>

    <Modal size="xl" id="flipModal" isOpen={modalMinted} toggle={() => { minted(); }} modalClassName="zoomIn" centered >
      <ModalHeader className="modal-title" id="flipModalLabel" toggle={() => { minted(); }}>
      </ModalHeader>
      <ModalBody className="text-center">
        <h5 className="fs-16">
          Congrats ! {tokenIdsMinted.length} OG Pets minted
        </h5>
        <figure className="figure mt-5">
          {tokenIdsMinted.map((element, key) => (
            <a key={key} target="_blank" href={OPENSEA_OG_PETS_ITEM_URL + element} rel="noopener">
              <img key={key} width="300" className="figure-img img-thumbnail img-fluid rounded m-2" src={PINATA_OG_PETS_IPFS_GIF_URL + element + ".gif"} alt="Card cap" />
            </a>
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