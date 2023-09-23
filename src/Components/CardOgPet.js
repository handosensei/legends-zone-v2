import React, {useEffect, useState} from 'react';
import {Card, CardBody, Col, Row} from "reactstrap";
import {getPerkOgPets} from "../client/ApiMetaLegends";

const CardOgPet = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [perkOgPets, setPerkOgPets] = useState([]);

  const OgPets = () => {
    if (perkOgPets.length === 0) {
      return (<></>);
    }

    return (<>
      <div className="justify-content-between d-flex align-items-center mt-3 mb-4">
        <h5 className="mb-0 pb-1 ">Perk OG Pets collection</h5>
      </div>
      {perkOgPets.map((pet, key) => (
      <Col key={key} sm={4} md={3} xl={2} xxl={1}>
        <Card>
          <CardBody>
            <h6 className="mb-2">
              OG Pet <span className="text-secondary">#{pet.tokenId}</span>
            </h6>
          </CardBody>
          <img className="img-fluid" src={pet.image} alt={`OG Pet #${pet.tokenId}`} />
          <div className="card-footer">
            <p className="text-muted mb-0">{pet.name}</p>
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