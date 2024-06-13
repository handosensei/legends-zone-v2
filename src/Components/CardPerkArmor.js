import React, {useEffect, useRef, useState} from 'react';
import {Card, CardBody, Col, Row, Modal, ModalBody} from "reactstrap";
import {getPerkArmors} from "../client/ApiMetaLegends";
import {Link} from "react-router-dom";
import Player from "./Player";
import 'video.js/dist/video-js.css';

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
      return (<></>);
    }

    return (<>
      <Modal size="lg" id="modal" isOpen={modal} toggle={() => toggleModal()} className={classNamePlayer} >
        <div className="ratio ratio-16x9 " style={{aspectRatio: 1 / 1}}>
          <Player videos={[mp4]} path={null} />
        </div>
      </Modal>

      <div className="justify-content-between d-flex align-items-center mt-3 mb-4">
        <h5 className="mb-0 pb-1 ">Perk OG Armors collection</h5>
      </div>
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
                <LinkProjectFileUrl armor={armor} />
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

  const LinkProjectFileUrl = ({armor}) => {
    if (armor.projectFileUrl === '') {
      return (
        <button type="button" className="btn btn-light btn-sm">
          <i className="lab la-codepen align-middle lh-1"></i>
        </button>
      );
    }

    return (
      <Link to={armor.projectFileUrl} target="_blank" className="btn btn-outline-success btn-sm link-success">
        <i className="lab la-codepen align-middle lh-1"></i>
      </Link>
    );
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
