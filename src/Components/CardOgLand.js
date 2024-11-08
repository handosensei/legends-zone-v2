import React, {useEffect, useState} from 'react';
import {Card, CardBody, Col, Modal, Row} from "reactstrap";
import {getPerkOgLands} from "../client/ApiMetaLegends";
import Player from "./Player";
import 'video.js/dist/video-js.css';
import LinkProjectFileUrl from "./LinkProjectFileUrl";
import {notif} from "./Common/Notification";

const CardOgLand = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [perkOgLands, setPerkOgLands] = useState([]);
  const [modal, setModal] = useState(false);
  const [mp4, setMp4] = useState('');

  function toggleModal() {
    setModal(!modal);
  }

  const OgLands = () => {
    if (perkOgLands.length === 0) {
      return (<>
        <div className="row align-items-center" width="100%">
          <div className="col-sm-12 text-center">
            <h3>No OG Land asset ...</h3>

            <p className="m-5">
              <a className="btn btn-secondary btn-label waves-effect waves-light w-lg" href="https://opensea.io/collection/metalife-og-lands" target="_blank" rel="noreferrer">
                <i className="ri-money-dollar-circle-line label-icon align-middle fs-16 me-2"></i> OG Land
              </a>
            </p>
          </div>
        </div>
      </>);
    }

    return (<>

      <Modal size="lg" id="modal" isOpen={modal} toggle={() => toggleModal()} >
        <div className="ratio ratio-16x9 " style={{aspectRatio: 1 / 1}}>
          <Player videos={[mp4]} path={null} />
        </div>
      </Modal>

      {perkOgLands.map((land, key) => (
        <Col key={key} xs={6} sm={4} md={3} xl={2}>
          <Card>
            <CardBody>
              <h6 className="mb-2">
                Land <span className="text-secondary">#{land.tokenId}</span>
              </h6>
            </CardBody>
            <img className="img-fluid" src={land.image} alt={`OG Land #${land.tokenId}`} onClick={() => { openMp4(land.animation) }}/>
            <div className="card-footer">
              <p className="text-muted mb-0">{land.name}</p>
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
          <OgLands />
        </>
      )
    }
  }

  useEffect(() => {

    const fetchData = () => {
      getPerkOgLands().then((result) => {
        setPerkOgLands(result);
        setIsLoading(true);
      })
      .catch((error) => {
        notif('danger', error.message);
      });
    }

    if (sessionStorage.getItem("authUser")) {
      fetchData();
    }
  }, []);

  return (
    <Row>
      <Display />
    </Row>
  );
}

export default CardOgLand;
