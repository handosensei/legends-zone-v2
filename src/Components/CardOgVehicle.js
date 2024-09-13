import React, {useEffect, useState} from 'react';
import {Card, CardBody, Col, Modal, Row} from "reactstrap";
import {getVehicles} from "../client/ApiMetaLegends";
import LinkProjectFileUrl from "./LinkProjectFileUrl";
import Player from "./Player";

const CardOgVehicle = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [perkOgVehicles, setPerkOgVehicles] = useState([]);
  const [modal, setModal] = useState(false);
  const [mp4, setMp4] = useState('');
  const [classNamePlayer, setClassNamePlayer] = useState('');

  function toggleModal() {
    setModal(!modal);
  }

  const OgVehicles = () => {
    if (perkOgVehicles.length === 0) {
      return (<>
        <div className="row align-items-center" width="100%">
          <div className="col-sm-12 text-center">
            <h3>No OG Vehicle asset ...</h3>

            <p className="m-5">
              <a className="btn btn-secondary btn-label waves-effect waves-light w-lg" href="https://opensea.io/collection/metalife-og-vehicle" target="_blank" rel="noreferrer">
                <i className="ri-money-dollar-circle-line label-icon align-middle fs-16 me-2"></i> OG Vehicle
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

      {perkOgVehicles.map((vehicle, key) => (
      <Col key={key} xs={6} sm={4} md={3} xl={2}>
        <Card>
          <CardBody>
            <h6 className="mb-2">
              Vehicle <span className="text-secondary">#{vehicle.tokenId}</span>
            </h6>
          </CardBody>
          <img className="img-fluid" src={vehicle.image} alt={`OG Vehicle #${vehicle.tokenId}`} onClick={() => { openMp4(vehicle.animation) }}/>
          <div className="card-footer">
            <p className="text-muted mb-0">{vehicle.name}</p>
            <div className="hstack gap-2 justify-content-end">
              <LinkProjectFileUrl object={vehicle} />
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
        <OgVehicles />
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
      const result = await getVehicles();
      setPerkOgVehicles(result);
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

export default CardOgVehicle;
