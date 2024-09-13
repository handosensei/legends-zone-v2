import React, {useEffect, useState} from 'react';
import {Card, CardBody, Col, Modal, Row} from "reactstrap";
import {getPerkOgPets} from "../client/ApiMetaLegends";
import Player from "./Player";
import 'video.js/dist/video-js.css';
import LinkProjectFileUrl from "./LinkProjectFileUrl";

const CardOgPet = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [perkOgPets, setPerkOgPets] = useState([]);
  const [modal, setModal] = useState(false);
  const [mp4, setMp4] = useState('');
  const [classNamePlayer, setClassNamePlayer] = useState('');

  function toggleModal() {
    setModal(!modal);
  }

  const OgPets = () => {
    if (perkOgPets.length === 0) {
      return (<>
        <div className="row align-items-center" width="100%">
          <div className="col-sm-12 text-center">
            <h3>No OG Pet asset ...</h3>

            <p className="m-5">
              <a className="btn btn-secondary btn-label waves-effect waves-light w-lg" href="https://opensea.io/collection/metalife-og-pets" target="_blank" rel="noreferrer">
                <i className="ri-money-dollar-circle-line label-icon align-middle fs-16 me-2"></i> OG Pet
              </a>
            </p>
          </div>
        </div>
      </>);
    }

    return (<>

      <Modal size="lg" id="modal" isOpen={modal} toggle={() => toggleModal()} className={classNamePlayer} >
        <div className="ratio ratio-16x9 " style={{aspectRatio: 1 / 1}}>
          <Player videos={[mp4]} path={null} />
        </div>
      </Modal>

      {perkOgPets.map((pet, key) => (
      <Col key={key} xs={6} sm={4} md={3} xl={2}>
        <Card>
          <CardBody>
            <h6 className="mb-2">
              Pet <span className="text-secondary">#{pet.tokenId}</span>
            </h6>
          </CardBody>
          <img className="img-fluid" src={pet.image} alt={`OG Pet #${pet.tokenId}`} onClick={() => { openMp4(pet.animation) }}/>
          <div className="card-footer">
            <p className="text-muted mb-0">{pet.name}</p>
            <div className="hstack gap-2 justify-content-end">
              <LinkProjectFileUrl object={pet} />
            </div>
          </div>
        </Card>
      </Col>
      ))}
    </>)
  }

  const openMp4 = (urlMp4) => {
    if (document.documentElement.clientWidth < 600) {
      return;
    }
    toggleModal();
    setMp4(urlMp4);
  }

  const Display = () => {
    if (isLoading) {
      return (
      <>
        <OgPets />
      </>
      )
    }
  }

  useEffect(() => {

    const fetchData = async () => {
      const result = await getPerkOgPets();
      setPerkOgPets(result);
      setIsLoading(true);
    }

    if (sessionStorage.getItem("authUser")) {
      const obj = JSON.parse(sessionStorage.getItem("authUser"));
      fetchData(obj.wallet.toLowerCase());
    }
  }, []);

  return (
  <Row>
    <Display />
  </Row>
  );
}

export default CardOgPet;
