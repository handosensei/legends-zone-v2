import React, {useEffect, useState} from 'react';
import {Card, CardBody, Col, Row} from "reactstrap";
import {getResidences} from "../client/ApiMetaLegends";

const CardOgResidence = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [perkOgResidences, setPerkOgResidences] = useState([]);

  const OgResidences = () => {
    if (perkOgResidences.length === 0) {
      return (<></>);
    }

    return (<>
      <div className="justify-content-between d-flex align-items-center mt-3 mb-4">
        <h5 className="mb-0 pb-1 ">Perk OG Residences collection</h5>
      </div>
      {perkOgResidences.map((Residence, key) => (
      <Col key={key} sm={4} md={3} xl={2} xxl={1}>
        <Card>
          <CardBody>
            <h6 className="mb-2">
              Residence <span className="text-secondary">#{Residence.tokenId}</span>
            </h6>
          </CardBody>
          <img className="img-fluid" src={Residence.image} alt={`OG Residence #${Residence.tokenId}`} />
        </Card>
      </Col>
      ))}
    </>)
  }

  const Display = () => {
    if (isLoading) {
      return (
      <>
        <OgResidences />
      </>
      )
    }
  }

  useEffect(() => {

    const fetchData = async () => {
      const result = await getResidences();
      setPerkOgResidences(result);
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

export default CardOgResidence;