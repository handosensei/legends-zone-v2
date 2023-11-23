import React, {useEffect, useState} from "react";
import { Button, Card, CardBody, CardHeader, Col, Input, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import {getVehicles} from "../../../client/ApiMetaLegends";

export const IMG_HONORARY = 'https://metalegends.mypinata.cloud/ipfs/QmfEaKN1rSCdFQYV4jDPApjWhcLykUMA5hT9nJGxrZbLHQ/gif/burner-speed-tank-honorary.gif';
export const IMG_WHALE = 'https://metalegends.mypinata.cloud/ipfs/QmfEaKN1rSCdFQYV4jDPApjWhcLykUMA5hT9nJGxrZbLHQ/gif/celestial-speedster-whale.gif';
export const IMG_COUNCIL = 'https://metalegends.mypinata.cloud/ipfs/QmfEaKN1rSCdFQYV4jDPApjWhcLykUMA5hT9nJGxrZbLHQ/gif/roboter-hovertank-council.gif';

const ClaimAsset = ({contract, account, title, func}) => {
  const [counter, setCounter] = useState(0);

  const [allowlistTotal, setAllowlistTotal] = useState('0');
  const [allowlistClaimed, setAllowlistClaimed] = useState('0');
  const [allowlistRemaining, setAllowlistRemaining] = useState('0');

  const [tokenIdsMinted, setTokenIdsMinted] = useState([]);
  const [tokensToDisplay, setTokensToDisplay] = useState([]);
  const [tokenSpecialMinted, setTokenSpecialMinted] = useState([]);

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

  function countUp(prev_data_attr) {
    if (prev_data_attr < allowlistRemaining && prev_data_attr < 10) {
      setCounter(prev_data_attr + 1);
    }
  }

  function countDown(prev_data_attr) {
    if (prev_data_attr >= 1) {
      setCounter(prev_data_attr - 1);
    }
  }

  const claim = () => {
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
      case 'whale':
        mintWhale();
        break;
      case 'honorary':
        mintHonorary();
        break;
      default:
        console.log(`Sorry, ${func} unknown.`);
    }
  }

  const mintRandom = () => {
    contract.methods.mintRandom(counter).send({ from: account })
    .then((res) => {
      setCounter(0);
      let ids = [];
      if (res.events.Transfer.length === undefined) {
        ids.push(parseInt(res.events.Transfer.returnValues.id));
      } else {
        res.events.Transfer.forEach((transfer) => {
          ids.push(parseInt(transfer.returnValues.id));
        });
      }
      setTokenIdsMinted(ids);
      setTimeout(() => {
        getVehicles().then((vehicles) => {
          const items = [];
          vehicles.forEach((vehicle) => {
            if (ids.includes(vehicle.tokenId)) {
              items.push(vehicle);
            }
          });
          setTokensToDisplay(items);
        });
        minted();
      }, 5000);
    })
    .catch((err) => {
      mintCancel();
      console.log(err)
    });
  }

  const mintCouncil = () => {
    contract.methods.mintCouncil(counter).send({ from: account })
    .then((res) => {
      setCounter(0);
      setTokenIdsMinted(res.events.MintedCouncil.returnValues[2]);
      const council = {
        'image': IMG_COUNCIL,
        'name': 'roboter-hovertank-council',
      }

      setTokenSpecialMinted(council);
      minted();
      // save mint in BDD
    })
    .catch((err) => {
      mintCancel();
      console.log(err);
    });
  }
  const mintWhale = () => {
    contract.methods.mintWhale(counter).send({ from: account })
    .then((res) => {
      setCounter(0);
      setTokenIdsMinted(res.events.MintedWhale.returnValues[2]);
      const whale = {
        'image': IMG_WHALE,
        'name': 'celestial-speedster-whale',
      }

      setTokenSpecialMinted(whale);
      minted();
    })
    .catch((err) => {
      mintCancel();
      console.log(err);
    });
  }
  const mintHonorary = () => {
    contract.methods.mintHonorary(counter).send({ from: account })
    .then((res) => {
      setCounter(0);
      setTokenIdsMinted(res.events.MintedHonorary.returnValues[2]);

      const honorary = {
        'image': IMG_HONORARY,
        'name': 'burner-speed-tank-honorary',
      }

      setTokenSpecialMinted(honorary);
      minted();
    })
    .catch((err) => {
      mintCancel();
      console.log(err);
    });
  }

  const ClaimButton = () => {
    if (allowlistRemaining > 0) {
      return (<button className="btn btn-primary" onClick={() => { claim(); }}>Claim</button>);
    }
    return (<button className="btn btn-light">Claim</button>);
  }

  const getRemainingToClaimWhale = () => {
    if (contract === null) {
      return 0;
    }
    if (contract.methods !== undefined) {
      contract.methods.allowlistWhale(account).call()
      .then((res) => {
        setAllowlistTotal(res.total);
        setAllowlistClaimed(res.claimed);
        setAllowlistRemaining(res.total - res.claimed);
      });
      return allowlistRemaining;
    }
    return 0;
  }

  const getRemainingToHonorary = () => {
    if (contract === null) {
      return 0;
    }
    if (contract.methods !== undefined) {
      contract.methods.allowlistHonorary(account).call()
      .then((res) => {
        setAllowlistTotal(res.total);
        setAllowlistClaimed(res.claimed);
        setAllowlistRemaining(res.total - res.claimed);
      });
      return allowlistRemaining;
    }
    return 0;
  }

  const getRemainingToClaimCouncil = () => {
    if (contract === null) {
      return 0;
    }
    if (contract.methods !== undefined) {
      contract.methods.allowlistCouncil(account).call()
      .then((res) => {
        setAllowlistTotal(res.total);
        setAllowlistClaimed(res.claimed);
        setAllowlistRemaining(res.total - res.claimed);
      });
      return allowlistRemaining;
    }
    return 0;
  }

  const getRemainingToClaimRandom = () => {
    if (contract === null) {
      return 0;
    }
    if (contract.methods !== undefined) {
      contract.methods.allowlistRandom(account).call()
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
      case 'random':
        restToClaim = getRemainingToClaimRandom();
        break;
      case 'whale':
        restToClaim = getRemainingToClaimWhale();
        break;
      case 'honorary':
        restToClaim = getRemainingToHonorary();
        break;
      case 'council':
        restToClaim = getRemainingToClaimCouncil();
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

  const ListRewards = () => {
    if (func === 'random') {
      return (
      <figure className="figure mt-5">
        {tokensToDisplay.map((element, key) => (
        <img key={key} width="200" className="figure-img img-thumbnail img-fluid rounded m-2" src={element.image} alt={element.name} />
        ))}
      </figure>
      );
    }

    return (
      <figure className="figure mt-5">
        {tokenIdsMinted.map((tokenId, key) => (
        <img key={key} width="200" className="figure-img img-thumbnail img-fluid rounded m-2" src={tokenSpecialMinted.image} alt={tokenSpecialMinted.name} />
        ))}
      </figure>
    );

  }

  return (
  <>
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

    <Modal size="xl" id="flipModal" isOpen={modalMinted} toggle={() => { minted(); }} modalClassName="zoomIn" centered >
      <ModalHeader className="modal-title" id="flipModalLabel" toggle={() => { minted(); }}>
      </ModalHeader>
      <ModalBody className="text-center">
        <h5 className="fs-16">
          Congrats ! {tokenIdsMinted.length} OG Vehicle minted
        </h5>
        <ListRewards />
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