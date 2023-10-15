import React, {useEffect, useState} from 'react';
import {Card, CardBody, Col, Row} from "reactstrap";
import {getHealingDrones} from "../client/ApiMetaLegends";

const CardHealingDrone = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [drones, setDrones] = useState([]);

  const HealingDrone = () => {
    if (drones.length === 0) {
      return (<></>);
    }

    return (<>
      <div className="justify-content-between d-flex align-items-center mt-3 mb-4">
        <h5 className="mb-0 pb-1 ">Healing drone collection</h5>
      </div>
      {drones.map((drone, key) => (
      <Col key={key} sm={4} md={3} xl={2} xxl={1}>
        <Card>
          <CardBody>
            <h6 className="mb-2">
              Healing Drone <span className="text-secondary">#{drone.tokenId}</span>
            </h6>
          </CardBody>
          <img className="img-fluid" src={drone.image} alt={`H.Drone #${drone.tokenId}`} />
          <div className="card-footer">
            <p className="text-muted mb-0">{drone.name}</p>
          </div>
        </Card>
      </Col>
      ))}
    </>)
  }

  const Display = () => {
    if (isLoading) {
      return (
      <>
        <HealingDrone />
      </>
      )
    }
  }

  useEffect(() => {

    const fetchData = async () => {
      const result = await getHealingDrones();
      setDrones(result);
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

export default CardHealingDrone;