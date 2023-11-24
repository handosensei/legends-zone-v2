import React, { useState } from "react";
import {Button, Card, CardBody, CardHeader, Col, Modal, ModalBody, ModalHeader} from "reactstrap";

export const IMG_GUARDIAN = 'https://metalegends.mypinata.cloud/ipfs/QmfEaKN1rSCdFQYV4jDPApjWhcLykUMA5hT9nJGxrZbLHQ/gif/goldboi-tank-guardian.gif';
export const IMG_JUDGE = 'https://metalegends.mypinata.cloud/ipfs/QmfEaKN1rSCdFQYV4jDPApjWhcLykUMA5hT9nJGxrZbLHQ/gif/cyber-bike-judge.gif';

const ClaimAssetSingle = ({contract, account, title, func}) => {

  const [remainingToClaim, setRemainingToClaim] = useState(0);
  const [tokenIdMinted, setTokenIdMinted] = useState(null);

  const [mintImage, setMintImage] = useState('');
  const [mintName, setMintName] = useState('');

  const [allowlistTotal, setAllowlistTotal] = useState('0');
  const [allowlistClaimed, setAllowlistClaimed] = useState('0');
  const [allowlistRemaining, setAllowlistRemaining] = useState('0');

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

  const getRemainingToClaimJudge = () => {
    if (contract == null) {
      return 0;
    }
    if (contract.methods !== undefined) {
      contract.methods.allowlistJudge(account).call()
      .then((res) => {
        setAllowlistTotal(res.total);
        setAllowlistClaimed(res.claimed);
        setAllowlistRemaining(res.total - res.claimed);
      });
      return allowlistRemaining;
    }
    return 0;
  }

  const getRemainingToClaimGuardian = () => {
    if (contract == null) {
      return 0;
    }
    if (contract.methods !== undefined) {
      contract.methods.allowlistGuardian(account).call()
      .then((res) => {
        setAllowlistTotal(res.total);
        setAllowlistClaimed(res.claimed);
        setAllowlistRemaining(res.total - res.claimed);
      });
      return allowlistRemaining;
    }
    return 0;
  }

  const RemainingToClaim = () => {
    let restToClaim = {};
    switch (func) {
      case 'judge':
        restToClaim = getRemainingToClaimJudge();
        break;
      case 'guardian':
        restToClaim = getRemainingToClaimGuardian();
        break;
      default:
        console.log(`Sorry, ${func} unknown.`);
    }

    if (restToClaim > 0) {
      return (<span className="text-success">{restToClaim}</span>)
    }
    return (
    <span className="text-muted">{restToClaim}</span>
    );
  }

  const mintJudge = async () => {
    contract.methods.mintJudge().send({ from: account })
    .then((res) => {
      setTokenIdMinted(res.events.MintedJudge.returnValues.tokenId);
      setMintName('Cyber Bike Judge')
      setMintImage(IMG_JUDGE)
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
      setMintName('Goldboi Tank Guardian')
      setMintImage(IMG_GUARDIAN)
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
      case 'judge':
        mintJudge();
        break;
      case 'guardian':
        mintGuardian();
        break;
      default:
        console.log(`Sorry, ${func} unknown.`);
    }
  }

  const ClaimButton = () => {
    if (allowlistRemaining > 0) {
      return (<button className="btn btn-primary" onClick={() => { claim(); }}>Claim</button>);
    }

    return (<button className="btn btn-light">Claim</button>);
  }

  return (
  <React.Fragment>

    <Modal size="lg" id="flipModalInProgress" isOpen={modalMintInProgress} toggle={() => { mintInProgress(); }} modalClassName="zoomIn" centered >
      <ModalHeader className="modal-title" id="flipModalLabel">
        Mint {func.toUpperCase()} OG Vehicle in progress
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
          Congrats ! {func.toUpperCase()} OG Vehicle minted
        </h5>
        <figure className="figure mt-5">
          <img width="200" className="figure-img img-thumbnail img-fluid rounded m-2" src={mintImage} alt={mintName} />
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
              <span className={allowlistTotal > 0 ? "text-success": "text-muted"}>{allowlistTotal}</span>
            </div>
          </div>

          <div className="list-group-item d-flex justify-content-between align-items-center">
            Claimed
            <div className="flex-shrink-0">
              <span className="text-muted">{allowlistClaimed}</span>
            </div>
          </div>

          <div className="list-group-item d-flex justify-content-between align-items-center">
            Remaining
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
