import React, { useState } from "react";
import {Button, Card, CardBody, CardHeader, Col, Modal, ModalBody, ModalHeader} from "reactstrap";

const ClaimAssetSingle = ({claimable, title, func, contract, account}) => {

  const [remainingToClaim, setRemainingToClaim] = useState(0);
  const [tokenIdMinted, setTokenIdMinted] = useState(null);

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

  const getRemainingToClaimWhale = () => {
    if (contract == null) {
      return 0;
    }
    if (contract.methods !== undefined) {
      contract.methods.addressClaimbleWhale(account).call()
      .then((res) => {
        setRemainingToClaim(res);
      });
      return remainingToClaim;
    }
    return 0;
  }

  const getRemainingToClaimJudge = () => {
    if (contract == null) {
      return 0;
    }
    if (contract.methods !== undefined) {
      contract.methods.addressClaimbleJudge(account).call()
      .then((res) => {
        setRemainingToClaim(res);
      });
      return remainingToClaim;
    }
    return 0;
  }

  const getRemainingToClaimGuardian = () => {
    if (contract == null) {
      return 0;
    }
    if (contract.methods !== undefined) {
      contract.methods.addressClaimbleGuardian(account).call()
      .then((res) => {
        setRemainingToClaim(res);
      });
      return remainingToClaim;
    }
    return 0;
  }

  const getRemainingToClaimHonorary = () => {
    if (contract == null) {
      return 0;
    }
    if (contract.methods !== undefined) {
      contract.methods.addressClaimbleHonorary(account).call()
      .then((res) => {
        setRemainingToClaim(res);
      });
      return remainingToClaim;
    }
    return 0;
  }

  const getRemainingToClaim = () => {
    switch (func) {
      case 'whale':
        return getRemainingToClaimWhale();
      case 'judge':
        return getRemainingToClaimJudge();
      case 'guardian':
        return getRemainingToClaimGuardian();
      case 'honorary':
        return getRemainingToClaimHonorary();
      default:
        console.log(`Sorry, ${func} unknown.`);
    }
  }

  const mintWhale = async () => {
    contract.methods.mintWhale().send({ from: account })
    .then((res) => {
      setTokenIdMinted(res.events.MintedWhale.returnValues.tokenId);
      minted();
    })
    .catch((err) => {
      mintCancel();
      console.log(err)
    });
  }

  const mintJudge = async () => {
    contract.methods.mintJudge().send({ from: account })
    .then((res) => {
      setTokenIdMinted(res.events.MintedJudge.returnValues.tokenId);
      minted();
    })
    .catch((err) => {
      mintCancel();
      console.log(err)
    });
  }

  const mintGuardian = async () => {
    contract.methods.mintGuardian().send({ from: account })
    .then((res) => {
      setTokenIdMinted(res.events.MintedGuardian.returnValues.tokenId);
      minted();
    })
    .catch((err) => {
      mintCancel();
      console.log(err)
    });
  }

  const mintHonorary = async () => {
    contract.methods.mintHonorary().send({ from: account })
    .then((res) => {
      setTokenIdMinted(res.events.MintedHonorary.returnValues.tokenId);
      minted();
    })
    .catch((err) => {
      mintCancel();
      console.log(err)
    });
  }

  function claim() {
    if (contract.methods === undefined) {
      return;
    }
    mintInProgress();

    switch (func) {
      case 'whale':
        mintWhale();
        break;
      case 'judge':
        mintJudge();
        break;
      case 'guardian':
        mintGuardian();
        break;
      case 'honorary':
        mintHonorary();
        break;
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

  const ClaimButton = () => {
    if (remainingToClaim > 0) {
      return (<button className="btn btn-primary" onClick={() => { claim(); }}>Claim</button>);
    }

    return (<button className="btn btn-light">Claim</button>);
  }

  return (
  <React.Fragment>

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

    <Modal size="lg" id="flipModalMinted" isOpen={modalMinted} toggle={() => { minted(); }} modalClassName="zoomIn" centered >
      <ModalHeader className="modal-title" id="flipModalLabel" toggle={() => { minted(); }}>
      </ModalHeader>
      <ModalBody className="text-center">
        <h5 className="fs-16">
          Congrats ! {func.toUpperCase()} OG Pets minted
        </h5>
        <figure className="figure mt-5">

          <a target="_blank" href={OPENSEA_OG_PETS_ITEM_URL + tokenIdMinted} rel="noopener">
            <img width="300" className="figure-img img-thumbnail img-fluid rounded m-2" src={PINATA_OG_PETS_IPFS_GIF_URL + tokenIdMinted + ".gif"} alt="Card cap" />
          </a>
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
            <ClaimButton />
          </div>
        </CardBody>
      </Card>
    </Col>

  </React.Fragment>
  );
}

export default ClaimAssetSingle;
