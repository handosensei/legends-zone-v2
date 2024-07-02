import React, {useEffect, useRef, useState} from 'react';
import {Card, CardBody, Col, Row, Modal, ModalBody} from "reactstrap";
import {getPerkArmors} from "../client/ApiMetaLegends";
import {Link} from "react-router-dom";
import Player from "./Player";
import 'video.js/dist/video-js.css';
import LinkProjectFileUrl from "./LinkProjectFileUrl";

const CardPerkArmor = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [perkArmors, setPerkArmors] = useState([]);
  const [modal, setModal] = useState(false);
  const [mp4, setMp4] = useState('');
  const [classNamePlayer, setClassNamePlayer] = useState('');

  function toggleModal() {
    setModal(!modal);
  }

  const PerkArmors = () => {
    if (perkArmors.length === 0) {
      return (<>
        <div className="row align-items-center" width="100%">
          <div className="col-sm-12 text-center">
            <h3>No OG Armor asset ...</h3>

            <p className="m-5">
              <a className="btn btn-secondary btn-label waves-effect waves-light w-lg" href="https://opensea.io/collection/metalife-og-armor" target="_blank" rel="noreferrer">
                <i className="ri-money-dollar-circle-line label-icon align-middle fs-16 me-2"></i> OG Armor
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

      {perkArmors.map((armor, key) => (
        <Col key={key} sm={4} md={3} xl={2}>
          <Card>
            <CardBody>
              <h6 className="mb-2">
                Armor <span className="text-secondary">#{armor.tokenId}</span>
              </h6>
            </CardBody>
            <img className="img-fluid" src={armor.image} alt={`Armor #${armor.tokenId}`} onClick={() => { openMp4(armor.animation) }}/>
            <div className="card-footer">
              <p className="text-muted mb-0">{armor.name}</p>
              <div className="hstack gap-2 justify-content-end">
                <LinkProjectFileUrl object={armor} />
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
          <PerkArmors />
        </>
      )
    }
  }

  useEffect(() => {

    var windowSize = document.documentElement.clientWidth;
    if (windowSize < 600) {
      setClassNamePlayer('d-none');
    }

    const fetchData = async () => {
      const result = await getPerkArmors();
      setPerkArmors(result);
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

export default CardPerkArmor;
