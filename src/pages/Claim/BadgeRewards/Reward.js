import React, { useState } from "react";
import { Button, Input, Modal, ModalBody, ModalHeader } from "reactstrap";

import {CONTRACT_BADGE_REWARD} from "../../../enum/Contract";

const OPENSEA_BREWARD_ITEM_URL = `https://opensea.io/assets/matic/${CONTRACT_BADGE_REWARD}/`;

const Reward = ({asset, contract, account}) => {

  const [errorMessage, setErrorMessage] = useState('');
  let [remainingToClaim, setRemainingToClaim] = useState(0);
  const [modalMinted, setModalMinted] = useState(false);
  const [modalMintInProgress, setModalMintInProgress] = useState(false);
  const [modalMintError, setModalMintError] = useState(false);

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
    if (remainingToClaim < 1) {
      return;
    }
    if (contract.methods === undefined) {
      return;
    }
    mintInProgress();
    contract.methods.mint(asset.tokenId, 1).send({ from: account })
      .then((res) => {
        if (res.events.Minted !== undefined) {
          minted()
        } else {
          setRemainingToClaim(remainingToClaim--)
          setModalMintInProgress(false);
        }
      })
      .catch((err) => {
        mintCancel();
        setErrorMessage(err);
        setModalMintError(true);
        console.log(err)
      });
  };

  const getRemainingToken = () => {
    if (contract === null) {
      return 0;
    }
    if (!('methods' in contract)) {
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

  const ClaimButton = () => {
    if (remainingToClaim > 0) {
      return (<button className="btn btn-primary" onClick={() => { claim(); }}>Claim</button>);
    }

    return (<button className="btn btn-light">Claim</button>);
  }

  const closeModalError = () => {
    setModalMintError(false);
  }

  return (
    <>

      <Modal size="sm" id="flipModalError" isOpen={modalMintError} toggle={() => { closeModalError(); }} modalClassName="zoomIn" centered >
        <ModalHeader className="modal-title" id="flipModaErrorlLabel">
          Error
        </ModalHeader>
        <ModalBody className="text-center">
          <div className="text-warning" role="status">
            {errorMessage}
          </div>
        </ModalBody>
      </Modal>

      <Modal size="sm" id="flipModalInProgress" isOpen={modalMintInProgress} toggle={() => { mintInProgress(); }} modalClassName="zoomIn" centered >
        <ModalHeader className="modal-title" id="flipModalLabel">
          Mint Badge Reward in progress
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
            Congrats ! Meta-Life NFT Badge Reward minted
          </h5>
          <figure className="figure mt-5">

            <a target="_blank" href={OPENSEA_BREWARD_ITEM_URL + asset.tokenId} rel="noreferrer">
              <img width="300" className="figure-img img-thumbnail img-fluid rounded m-2" src={asset.gif} alt="Badge Reward minted" />
            </a>

          </figure>
        </ModalBody>
        <div className="modal-footer">
          <Button color="light" onClick={() => { minted(); }}> Close </Button>
        </div>
      </Modal>

      <div className="card ribbon-box border shadow-none right">
        <div className="card-body text-muted">
          <div className="d-flex mb-4 align-items-center">
            <div className="flex-shrink-0">
              <img src={asset.img} alt="" className="avatar-md rounded" />
            </div>
            <div className="flex-grow-1 ms-2 text-start">
              <h5 className="card-title mb-1">{asset.typeClass} {asset.item}</h5>
              <span className="text-muted">{asset.badge}</span>
            </div>
          </div>

          <div className="list-group-item d-flex justify-content-between align-items-center">
            Remaining
            <div className="flex-shrink-0">
              <RemainingToClaim />
            </div>
          </div>

          <div className="d-grid gap-2 mt-3">
            <ClaimButton asset={asset} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Reward;
