import {Button, Col, Input, Modal, ModalBody, ModalHeader, Row} from "reactstrap";
import React, {useState} from "react";

const Claim = ({contract, account}) => {

  const ML_IPFS = 'https://metalegends.mypinata.cloud/ipfs/';
  const DARK_DEMO_CID = 'QmeaWJVMKP1v4ASmxpsK8QeedxvqrJLXEcjAtWxgAQnwyo';
  const DARK_ARMOR_IMG = `${ML_IPFS}${DARK_DEMO_CID}/gif/armor_rough_light.gif`

  const [remainingToClaim, setRemainingToClaim] = useState(0);

  const [modalMintInProgress, setModalMintInProgress] = useState(false);
  const [modalMintDone, setModalMintDone] = useState(false);

  function mintDone() {
    setModalMintDone(!modalMintDone);
    setModalMintInProgress(false);
  }

  const getRemaining = () => {
    if (contract == null) {
      return 0;
    }
    if (contract.methods !== undefined) {
      contract.methods.remaining(account, 2).call().then((res) => {
        setRemainingToClaim(res);
      });
      return remainingToClaim;
    }
    return 0;
  }

  const claim = () => {
    if (contract.methods === undefined) {
      return;
    }
    setModalMintInProgress(true);
    contract.methods.mint(1, 2).send({ from: account }).then((res) => {
      mintDone();
    })
    .catch((err) => {
      setModalMintInProgress(false);
      alert(err);
    });
  }

  const ButtonClaim = () => {
    if (remainingToClaim > 0) {
      return (<button className="btn btn-primary" onClick={() => { claim(); }}>Claim</button>);
    }

    return (<button className="btn btn-light">Claim</button>);
  }

  return (
  <React.Fragment>

    <Modal size="lg" id="flipModalInProgress" isOpen={modalMintInProgress} toggle={() => { setModalMintInProgress(true); }} modalClassName="zoomIn" centered >
      <ModalHeader className="modal-title" id="flipModalLabel">
        Mint Dark rough light armor in progress
      </ModalHeader>
      <ModalBody className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </ModalBody>
    </Modal>

    <Modal size="xl" id="flipModal" isOpen={modalMintDone} toggle={() => { mintDone(); }} modalClassName="zoomIn" centered >
      <ModalHeader className="modal-title" id="flipModalLabel" toggle={() => { mintDone(); }}>
      </ModalHeader>
      <ModalBody className="text-center">
        <h5 className="fs-16">
          Congrats !
        </h5>
        <figure className="figure mt-5">
          <img width="400" className="figure-img img-thumbnail img-fluid rounded m-2" src={DARK_ARMOR_IMG} alt="Dark rough light armor" />
        </figure>
      </ModalBody>
      <div className="modal-footer">
        <Button color="light" onClick={() => { mintDone(); }}> Close </Button>
      </div>
    </Modal>

    <Row className="mt-5 mb-5">

      <Col xl={6} className="align-self-center">
        <div className="mt-2 list-group-item d-flex justify-content-between align-items-center">
          Remaining : {getRemaining()}
        </div>
        <div className="mt-3 d-grid gap-2">
          <ButtonClaim />
        </div>
      </Col>

    </Row>
  </React.Fragment>

  );
}

export default Claim;