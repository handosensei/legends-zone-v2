import React, {useEffect, useState} from 'react';
import {Card, CardBody, Col, Row} from "reactstrap";
import {getHealingDrones} from "../client/ApiMetaLegends";
import LinkProjectFileUrl from "./LinkProjectFileUrl";

const CardHealingDrone = () => {

  const [drones, setDrones] = useState([]);

  const HealingDrone = () => {
    if (drones.length === 0) {
      return (<>
        <div className="row align-items-center" width="100%">
          <div className="col-sm-12 text-center">
            <h3>No healing drone asset ...</h3>

            <p className="m-5">
              <a className="btn btn-secondary btn-label waves-effect waves-light w-lg" href="https://opensea.io/collection/meta-life-healing-drone" target="_blank" rel="noreferrer">
                <i className="ri-money-dollar-circle-line label-icon align-middle fs-16 me-2"></i> Healing drone
              </a>
            </p>
          </div>
        </div>
      </>);
    }

    return (<>
      {drones.map((drone, key) => (
      <Col key={key} sm={4} md={3} xl={2}>
        <Card>
          <CardBody>
            <h6 className="mb-2">
              Healing Drone <span className="text-secondary">#{drone.tokenId}</span>
            </h6>
          </CardBody>
          <img className="img-fluid" src={drone.image} alt={`H.Drone #${drone.tokenId}`} />
          <div className="card-footer">
            <p className="text-muted mb-0">{drone.name}</p>
            <div className="hstack gap-2 justify-content-end">
              <LinkProjectFileUrl object={drone} />
            </div>
          </div>
        </Card>
      </Col>
      ))}
    </>)
  }

  useEffect(() => {

    const fetchData = async () => {
      const result = await getHealingDrones();
      setDrones(result);
    }

    if (sessionStorage.getItem("authUser")) {
      const obj = JSON.parse(sessionStorage.getItem("authUser"));
      fetchData(obj.wallet.toLowerCase());
    }
  }, []);

  return (
  <Row>
    <HealingDrone />
  </Row>
  );
}

export default CardHealingDrone;
