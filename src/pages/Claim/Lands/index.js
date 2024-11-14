import React, {useEffect, useState} from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Spinner
} from "reactstrap";

import LAND_CONTRACT from '../../../contracts/lands/MetaLifeLand.json';
import Faq from "./Faq";

import {getWeb3Data} from "../../../Components/Common/LibWeb3";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import {addLandWishes, getLands} from "../../../client/ApiMetaLegends";

import LAND_CEL_1 from "../../../assets/images/metalegends/land/CELESTIAL-AREA-1.png";
import LAND_CEL_2 from "../../../assets/images/metalegends/land/CELESTIAL-AREA-2.png";
import LAND_CEL_3 from "../../../assets/images/metalegends/land/CELESTIAL-AREA-3.png";
import LAND_BUR_1 from "../../../assets/images/metalegends/land/BURNER-AREA-1.png";
import LAND_BUR_2 from "../../../assets/images/metalegends/land/BURNER-AREA-2.png";
import LAND_BUR_3 from "../../../assets/images/metalegends/land/BURNER-AREA-3.png";
import LAND_ROB_1 from "../../../assets/images/metalegends/land/ROBOTER-AREA-1.png";
import LAND_ROB_2 from "../../../assets/images/metalegends/land/ROBOTER-AREA-2.png";
import LAND_ROB_3 from "../../../assets/images/metalegends/land/ROBOTER-AREA-3.png";
import LAND_GOL_1 from "../../../assets/images/metalegends/land/GOLDBOI-AREA-1.png";
import LAND_GOL_2 from "../../../assets/images/metalegends/land/GOLDBOI-AREA-2.png";
import LAND_GOL_3 from "../../../assets/images/metalegends/land/GOLDBOI-AREA-3.png";
import LAND_MAT_1 from "../../../assets/images/metalegends/land/MATRIX-AREA-1.png";
import LAND_MAT_2 from "../../../assets/images/metalegends/land/MATRIX-AREA-2.png";
import LAND_MAT_3 from "../../../assets/images/metalegends/land/MATRIX-AREA-3.png";
import LAND_CYB_1 from "../../../assets/images/metalegends/land/CYBER-AREA-1.png";
import LAND_CYB_2 from "../../../assets/images/metalegends/land/CYBER-AREA-2.png";
import LAND_CYB_3 from "../../../assets/images/metalegends/land/CYBER-AREA-3.png";
import LAND_ROU_1 from "../../../assets/images/metalegends/land/ROUGH-AREA-1.png";
import LAND_ROU_2 from "../../../assets/images/metalegends/land/ROUGH-AREA-2.png";
import LAND_ROU_3 from "../../../assets/images/metalegends/land/ROUGH-AREA-3.png";

import Allowlist from "./Allowlist";
import {notif} from "../../../Components/Common/Notification";
import {Link} from "react-router-dom";
import WarningEthereum from "../../../Components/Modal/WarningEthereum";

const Lands = () => {
  const CHAIN_ID = 1;
  const LAND_ENV = "mainnet";

  const LANDS_IMG = {
    celestial: {
      '1': LAND_CEL_1,
      '2': LAND_CEL_2,
      '3': LAND_CEL_3,
    },
    burner: {
      '1': LAND_BUR_1,
      '2': LAND_BUR_2,
      '3': LAND_BUR_3,
    },
    roboter: {
      '1': LAND_ROB_1,
      '2': LAND_ROB_2,
      '3': LAND_ROB_3,
    },
    goldboi: {
      '1': LAND_GOL_1,
      '2': LAND_GOL_2,
      '3': LAND_GOL_3,
    },
    'matrix-angel': {
      '1': LAND_MAT_1,
      '2': LAND_MAT_2,
      '3': LAND_MAT_3,
    },
    cyber: {
      '1': LAND_CYB_1,
      '2': LAND_CYB_2,
      '3': LAND_CYB_3,
    },
    rough: {
      '1': LAND_ROU_1,
      '2': LAND_ROU_2,
      '3': LAND_ROU_3,
    },
  }

  const [lands, setLands] = useState([]);
  const [landSelected, setLandSelected] = useState([]);
  const [landMinted, setLandMinted] = useState([]);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [remaining, setRemaining] = useState(null);
  const [modal, setModal] = useState(false);
  const [picture, setPicture] = useState(null);
  const [currentTiers, setCurrentTiers] = useState(null);
  const [holderTiers, setHolderTiers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mintModal, setMintModal] = useState(false);

  const mint = () => {
    const nb = landSelected.length;
    setLoading(true);
    setMintModal(true);
    contract.methods.mint(nb).send({from: account}).then((res) => {
      if (nb === 1) {
        addLandWishes({
          tokenId: res.events.Minted.returnValues.tokenId,
          landId: landSelected[0].item.id
        }).then((res) => {
          notif(
            'success',
            `Land ${landSelected[0].item.class} - area ${landSelected[0].item.area} minted`);
        });
      } else {
        const tokenIds = [];
        res.events.Minted.forEach((tx) => {
          tokenIds.push(tx.returnValues.tokenId);
        });
        if (landSelected.length !== tokenIds.length) {
          notif('danger', 'Contact @handosensei');
          return;
        }
        const payload = [];
        for (let i = 0; i < landSelected.length; i++) {
          payload.push({
            tokenId: tokenIds[i],
            landId: landSelected[i].item.id
          })
        }
        addLandWishes(payload).then((res) => {
          notif('success', `${tokenIds.length} lands minted`);
        }).catch((error) => {
          notif('danger', error.message);
        });
        const rest = remaining - tokenIds.length;
        setRemaining(rest);
        setLandMinted(landSelected);
        setLandSelected([]);
      }
      setLoading(false);
    }).catch((error) => {
      setMintModal(false);
      notif('danger', error.message);
    });
  }

  const toggleMintModal = () => {
    setMintModal(!mintModal);
  }

  const MintModal = () => {
    if (loading) {
      return (
        <Modal size="md" isOpen={mintModal} contentClassName="stakinginprogress">
          <ModalHeader className="modal-title">
            Mint NFT Land in progress
          </ModalHeader>
          <ModalBody >
            <div className="loader-overlay">
              <Spinner color="primary" />
            </div>
          </ModalBody>
        </Modal>
      );
    }

    return (
      <Modal size="xl" isOpen={mintModal} toggle={toggleMintModal} >
        <ModalBody className="text-center">
          <h5 className="fs-16">
            Congrats ! {landMinted.length} {landMinted.length === 1 ? 'Land' : 'Lands'} minted
          </h5>
          <ListLandMinted />
        </ModalBody>
      </Modal>
    );
  }

  const ListLandMinted = () => {
    return (
      <figure className="figure mt-5">
        {landMinted.map((elt, key) => (
          <img key={key} width="200" className="figure-img img-thumbnail img-fluid rounded m-2" src={LANDS_IMG[elt.item.class][elt.item.area]} alt="" />
        ))}
      </figure>
    );
  }

  function selectLand(land) {
    setLandSelected([...(landSelected), land]);
  }

  const ButtonMint = () => {
    if (landSelected.length === 0 || canMint === false) {
      return (
        <Button className="btn btn-light waves-effect"><i className="las la-hammer"></i> Mint</Button>
      );
    }

    return (
      <Button className="btn btn-secondary waves-effect" onClick={() => mint()}><i className="las la-hammer"></i> Mint</Button>
    );
  }

  const ButtonAdd = ({landRemaining, land}) => {
    if (landRemaining === 0) {
      return (<Button className="btn btn-soft-dark waves-effect waves-light btn-sm">Out of stock</Button>);
    }
    if (remaining > landSelected.length && canMint()) {
      return (<Button className="btn btn-primary btn-sm" onClick={() => selectLand(land)}>Add land</Button>);
    }

    return (<Button className="btn btn-soft-dark waves-effect waves-light btn-sm">Add land</Button>);

  }

  const removeLandSelected = (key) => {
    const updatedSelection = [...landSelected];
    updatedSelection.splice(key, 1);
    setLandSelected(updatedSelection);
  };

  const LandSelected = () => {
    if (landSelected.length === 0) {
      return (
        <div className="h3 text-muted mt-3" style={{textAlign: "center", verticalAlign: "text-top", height: "40px"}}>Empty</div>
      );
    }
    return (
      <table className="table table-centered table-hover align-middle table-nowrap mb-0">
        <tbody>
        {landSelected.map((elt, key) => (
          <tr key={key}>
            <td>
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0 me-2">
                  <img src={LANDS_IMG[elt.item.class][elt.item.area]} alt="" className="avatar-sm p-2" />
                </div>
                <div>
                  <h5 className="fs-14 my-1 fw-medium">{elt.item.class.toUpperCase()} - area {elt.item.area}</h5>
                </div>
              </div>
            </td>
            <td>
              <div style={{textAlign: "right"}}>
                <Button className="btn btn-soft-danger" onClick={() => removeLandSelected(key)}>
                  <i className="ri-delete-bin-2-line"></i>
                </Button>
              </div>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    );
  }
  const openImg = (picture) => {
    if (document.documentElement.clientWidth < 600) {
      return;
    }
    toggleModal();
    setPicture(picture);
  }

  const toggleModal = () => {
    setModal(!modal);
  }

  const canMint = () => {
    if (remaining === 0) {
      return false;
    }
    if (currentTiers < holderTiers) {
      return false;
    }
    return true;
  }

  useEffect(() => {
    if (lands.length === 0) {
      getLands().then(res => setLands(res));
    }

    if (account === null) {
      getWeb3Data(LAND_CONTRACT[LAND_ENV], CHAIN_ID).then((res) => {
        const contractML = res[0];
        const holderAccount = res[1];
        setAccount(holderAccount);
        setContract(contractML);

        contractML.methods.allowlist(holderAccount).call().then((res) => {
          setRemaining(res['total'] - res['claimed']);
        });
        contractML.methods.getTiers().call().then((res) => setCurrentTiers(res));
        contractML.methods.holderTiers(holderAccount).call().then((res) => setHolderTiers(res));
      }).catch((err) => {
        console.log(err);
      });
    }
  });

  return (
    <React.Fragment>

      <WarningEthereum />

      <MintModal />

      <Modal size="lg" id="modal" isOpen={modal} toggle={() => toggleModal()}  >
        <div className="ratio ratio-16x9 " style={{aspectRatio: 1 / 1}}>
          <img src={picture} alt="" onClick={() => toggleModal()} />
        </div>
      </Modal>

      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="OG Lands" pageTitle="Claim"/>
          <Row>
            <Col xxl={8}>
              <Row>
                <Allowlist contract={contract} account={account} />
              </Row>
              <Row>
                {lands.map((land, key) => (
                  <Col key={key}  xs={6} sm={4} md={3} xl={2} xxl={2}>
                    <Card>
                      <CardHeader>{land.item.class.toUpperCase()} - area {land.item.area}</CardHeader>
                      <img className="img-fluid" src={LANDS_IMG[land.item.class][land.item.area]}
                        alt={`Land ${land.item.class.toUpperCase()} - area ${land.item.area}`}
                        onClick={() => openImg(LANDS_IMG[land.item.class][land.item.area])}/>
                      <CardBody>
                        <div className="list-group-item d-flex justify-content-between align-items-center mb-2">
                          Available
                          <div className="flex-shrink-0">
                            <span className="text-white">{land.remaining}</span>
                          </div>
                        </div>
                        <div className="d-grid gap-2">
                          <ButtonAdd landRemaining={land.remaining} land={land}/>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
            <Col xxl={4}>
              <Row className="mb-4"><Col><Faq /></Col></Row>
              <Row>
                <Col>
                  <Card>
                    <CardHeader>
                      <div className="d-flex align-items-center">

                        <div className="flex-grow-1">
                          <h5 className="card-title mb-0">Selected land</h5>
                        </div>

                        <div className="toolbar d-flex align-items-start justify-content-center flex-wrap gap-2">
                          <ButtonMint />
                        </div>

                      </div>
                    </CardHeader>
                    <CardBody>
                    <div className="table-responsive table-card">
                      <LandSelected />
                    </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default Lands;
