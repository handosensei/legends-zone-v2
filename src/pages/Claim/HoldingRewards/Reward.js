import React, { useState } from "react";
import { Button, Input, Modal, ModalBody, ModalHeader } from "reactstrap";

import {LZREWARD_PATH_GIF} from "../../../enum/IPFS";
import {CONTRACT_LZ_REWARD} from "../../../enum/Contract";

const OPENSEA_HREWARD_ITEM_URL = `https://opensea.io/assets/matic/${CONTRACT_LZ_REWARD}/`;

const Reward = ({asset, contract, account}) => {
  const [counter, setCounter] = useState(0);
  const [remainingToClaim, setRemainingToClaim] = useState(0);
  const [quantityMinted, setQuantityMinted] = useState(0);
  const [tokenIdMinted, setTokenIdMinted] = useState(null);
  const [modalMinted, setModalMinted] = useState(false);
  const [modalMintInProgress, setModalMintInProgress] = useState(false);

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

  const claim = async () => {
    if (counter === 0) {
      return;
    }
    if (contract.methods === undefined) {
      return;
    }
    mintInProgress();
    contract.methods.mint(asset.tokenId, counter).send({ from: account })
    .then((res) => {
      setCounter(0);

      if (res.events.Minted !== undefined) {
        setQuantityMinted(res.events.Minted.returnValues.quantity);
        setTokenIdMinted(res.events.Minted.returnValues.tokenId);
        minted()
      } else {
        console.log(res);
        setModalMintInProgress(false);
      }
    })
    .catch((err) => {
      mintCancel();
      console.log(err)
    });
  };

  const max = () => {
    if (remainingToClaim > 0) {
      setCounter(remainingToClaim);
    }
  }

  const getRemainingToken = () => {
    if (contract == null) {
      return 0;
    }

    if (contract.methods == undefined) {
      return 0;
    }
    contract.methods.remaining(account, asset.tokenId).call()
      .then((res) => {
        setRemainingToClaim(res);
      })
      .catch((err) => {
        console.log(err)
      });
    return remainingToClaim;
  }

  const RemainingToClaim = () => {
    const restToClaim = getRemainingToken();
    if (restToClaim > 0) {
      return (<span className="text-success">{restToClaim}</span>)
    }
    return (
    <span className="text-muted">{restToClaim}</span>
    );
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

  const isOpen = () => {
    if (contract.methods != undefined) {
      contract.methods.remaining(account, asset.tokenId).call()
      .then((res) => {
        setRemainingToClaim(res);
      });
      return remainingToClaim;
    }
    return 0;
  }

  const ClaimButton = () => {
    if (remainingToClaim > 0 && isOpen()) {
      return (<button className="btn btn-primary" onClick={() => { claim(); }}>Claim</button>);
    }

    return (<button className="btn btn-light">Claim</button>);
  }

  const Quantity = ({quantity}) => {
    if (quantity === 0) {
      return (<span className="text-muted">{quantity}</span>)
    }

    return (<span className="text-white">{quantity}</span>)
  }

  const HasRibbon = ({asset}) => {
    if (asset.ribbon !== undefined) {
      return (<div className="ribbon-two ribbon-two-info"><span>{asset.ribbon}</span></div>);
    }

    return '';
  }

  return (
    <>
      <Modal size="sm" id="flipModalInProgress" isOpen={modalMintInProgress} toggle={() => { mintInProgress(); }} modalClassName="zoomIn" centered >
        <ModalHeader className="modal-title" id="flipModalLabel">
          Mint {counter} Holding reward in progress
        </ModalHeader>
        <ModalBody className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </ModalBody>
      </Modal>

      <Modal size="sm" id="flipModal" isOpen={modalMinted} toggle={() => { minted(); }} modalClassName="zoomIn" centered >
        <ModalHeader className="modal-title" id="flipModalLabel" toggle={() => { minted(); }}>
        </ModalHeader>
        <ModalBody className="text-center">
          <h5 className="fs-16">
            Congrats ! {quantityMinted} Holding reward minted
          </h5>
          <figure className="figure mt-5">

            <a target="_blank" href={OPENSEA_HREWARD_ITEM_URL + tokenIdMinted}>
              <img width="300" className="figure-img img-thumbnail img-fluid rounded m-2" src={LZREWARD_PATH_GIF + asset.code + ".gif"} alt="holding reward minted" />
            </a>

          </figure>
        </ModalBody>
        <div className="modal-footer">
          <Button color="light" onClick={() => { minted(); }}> Close </Button>
        </div>
      </Modal>

      <div className="card ribbon-box border shadow-none right">
        <div className="card-body text-muted">
          <HasRibbon asset={asset}/>
          <div className="d-flex mb-4 align-items-center">
            <div className="flex-shrink-0">
              <img src={asset.img} alt="" className="avatar-md rounded" />
            </div>
            <div className="flex-grow-1 ms-2 text-start">
              <h5 className="card-title mb-1">{asset.typeClass} {asset.item}</h5>
              <span className="text-muted">{asset.period}</span>
            </div>
          </div>

          <div className="list-group-item d-flex justify-content-between align-items-center">
            Eligibility
            <div className="flex-shrink-0">
              <Quantity quantity={asset.quantity} />
            </div>
          </div>
          <div className="list-group-item d-flex justify-content-between align-items-center">
            Claim saved
            <div className="flex-shrink-0">
              <Quantity quantity={asset.quantitySaved} />
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
            <button className="btn btn-light" onClick={() => { max() }}>Max</button>
            <ClaimButton asset={asset} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Reward;
