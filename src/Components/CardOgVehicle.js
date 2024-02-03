import React, {useEffect, useState} from 'react';
import {Card, CardBody, Col, Row} from "reactstrap";
import {getVehicles} from "../client/ApiMetaLegends";

const CardOgVehicle = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [perkOgVehicles, setPerkOgVehicles] = useState([]);

  const OgVehicles = () => {
    if (perkOgVehicles.length === 0) {
      return (<></>);
    }

    return (<>
      <div className="justify-content-between d-flex align-items-center mt-3 mb-4">
        <h5 className="mb-0 pb-1 ">Perk OG Vehicles collection</h5>
      </div>
      {perkOgVehicles.map((vehicle, key) => (
      <Col key={key} sm={4} md={3} xl={2} xxl={1}>
        <Card>
          <CardBody>
            <h6 className="mb-2">
              Vehicle <span className="text-secondary">#{vehicle.tokenId}</span>
            </h6>
          </CardBody>
          <img className="img-fluid" src={vehicle.image} alt={`OG Vehicle #${vehicle.tokenId}`} />
        </Card>
      </Col>
      ))}
    </>)
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