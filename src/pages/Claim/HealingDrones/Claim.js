import {Button, Col, Input, Modal, ModalBody, ModalHeader, Row} from "reactstrap";
import React, {useEffect, useState} from "react";
import {getHealingDrones, getHoldingRewardsSaved, getLegends} from "../../../client/ApiMetaLegends";

const Claim = ({contract, account}) => {

  const [eligibility, setEligibility] = useState(0);
  const [eligibilitySaved, setEligibilitySaved] = useState(0);
  const [minted, setMinted] = useState(0);
  const [counter, setCounter] = useState(0);
  const [tokenIdsMinted, setTokenIdsMinted] = useState([]);
  const [tokenMinted, setTokenMinted] = useState([]);
  const [remainingToClaim, setRemainingToClaim] = useState(0);
  const [rewards, setRewards] = useState([]);

  const [modalMintInProgress, setModalMintInProgress] = useState(false);
  const [modalMintDone, setModalMintDone] = useState(false);

  function mintDone() {
    setModalMintDone(!modalMintDone);
    setModalMintInProgress(false);
  }

  const defineEligibility = async () => {
    const legends = await getLegends();
    let count = 0;
    legends.forEach((legend) => {
      if (legend.holdingRewards['healing-drone'] === true) { count++; }
    });
    setEligibility(count);
  }

  const defineEligibilitySaved = async () => {
    const holdingRewardsSaved = await getHoldingRewardsSaved();
    setEligibilitySaved(holdingRewardsSaved['healing-drone'].length);
  }

  const getMinted = () => {
    if (contract == null) {
      return 0;
    }
    if (contract.methods !== undefined) {
      contract.methods.numberMinted(account).call().then((res) => {
        setMinted(res);
      });
      return minted;
    }
    return 0;
  }

  const getRemaining = () => {
    if (contract == null) {
      return 0;
    }
    if (contract.methods !== undefined) {
      contract.methods.remaining(account).call().then((res) => {
        setRemainingToClaim(res);
      });
      return remainingToClaim;
    }
    return 0;
  }

  const claim = () => {
    if (counter === 0) {
      return;
    }
    if (contract.methods === undefined) {
      return;
    }
    setModalMintInProgress(true);
    contract.methods.mint(counter).send({ from: account }).then((res) => {

      setCounter(0);
      let idsMinted = [];
      if (res.events.Transfer.length === undefined) {
        idsMinted.push(parseInt(res.events.Transfer.returnValues.id));
      } else {
        res.events.Transfer.forEach((transfer) => {
          idsMinted.push(parseInt(transfer.returnValues.id));
        });
      }
      setTokenIdsMinted(idsMinted);

      setTimeout(() => {
        getHealingDrones().then((drones) => {
          setRewards(drones);
          const items = [];
          drones.forEach((drone) => {
            if (idsMinted.includes(drone.tokenId)) {
              items.push(drone);
            }
          });
          setTokenMinted(items);
        });
        mintDone();
      }, 5000);

    })
    .catch((err) => {
      setModalMintInProgress(false);
      alert(err);
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

  const max = () => {
    if (remainingToClaim > 0) {
      setCounter(remainingToClaim);
    }
  }

  const ButtonMax = () => {
    if (remainingToClaim === 0) {
      return (<button className="btn btn-light">Max</button>);
    }

    return (<button className="btn btn-primary" onClick={() => max()}>Max</button>);
  }

  const ButtonClaim = () => {
    if (remainingToClaim > 0) {
      return (<button className="btn btn-primary" onClick={() => { claim(); }}>Claim</button>);
    }

    return (<button className="btn btn-light">Claim</button>);
  }

  const ListRewards = () => {
    console.log(tokenMinted);
    return (
      <figure className="figure mt-5">
        {tokenMinted.map((element, key) => (
          <img key={key} width="200" className="figure-img img-thumbnail img-fluid rounded m-2" src={element.image} alt={element.name} />
        ))}
      </figure>
    );
  }

  useEffect(() => {
    const fetchData = async () => {
      defineEligibility();
      defineEligibilitySaved();
    }

    if (sessionStorage.getItem("authUser")) {
      fetchData();
    }
  }, []);

  return (
  <React.Fragment>

    <Modal size="lg" id="flipModalInProgress" isOpen={modalMintInProgress} toggle={() => { setModalMintInProgress(true); }} modalClassName="zoomIn" centered >
      <ModalHeader className="modal-title" id="flipModalLabel">
        Mint {counter} {counter === 1 ? 'Healing drone' : 'Healing drones'} in progress
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
          Congrats ! {tokenIdsMinted.length} {tokenIdsMinted.length === 1 ? 'Healing drone' : 'Healing drones'}
        </h5>
        <ListRewards />
      </ModalBody>
      <div className="modal-footer">
        <Button color="light" onClick={() => { mintDone(); }}> Close </Button>
      </div>
    </Modal>


    <Row className="mt-5 mb-5">
      <Col xl={6} className="align-self-center">

        <div className="list-group-item d-flex justify-content-between align-items-center">
          Eligibility
          <div className="flex-shrink-0">
            <span className={eligibility > 0 ? "text-success": "text-muted"}>{eligibility}</span>
          </div>
        </div>

        <div className="mt-2 list-group-item d-flex justify-content-between align-items-center">
          Claim saved
          <div className="flex-shrink-0">
            <span className={eligibilitySaved > 0 ? "text-success": "text-muted"}>{eligibilitySaved}</span>
          </div>
        </div>

        <div className="mt-2 list-group-item d-flex justify-content-between align-items-center">
          Minted
          <div className="flex-shrink-0">
            <span className="text-muted">{getMinted()}</span>
          </div>
        </div>
        <div className="mt-2 list-group-item d-flex justify-content-between align-items-center">
          Remaining to be claim
          <div className="flex-shrink-0">
            <span className={remainingToClaim > 0 ? "text-success": "text-muted"}>{getRemaining()}</span>
          </div>
        </div>

      </Col>
      <Col xl={6}>
        <div className="d-grid gap-2">
          <div className="input-step full-width">
            <button type="button" className="minus" onClick={() => { countDown(counter); }} >
              –
            </button>
            <Input type="number" className="product-quantity" value={counter} min="0" max="20" readOnly />
            <button type="button" className="plus" onClick={() => { countUp(counter); }} >
              +
            </button>
          </div>
          <ButtonMax />
          <ButtonClaim />

        </div>

      </Col>
    </Row>
  </React.Fragment>

  );
}

export default Claim;