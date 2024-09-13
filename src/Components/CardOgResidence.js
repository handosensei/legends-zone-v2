import React, {useEffect, useState} from 'react';
import {Card, CardBody, Col, Row} from "reactstrap";
import {getResidences} from "../client/ApiMetaLegends";

const CardOgResidence = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [perkOgResidences, setPerkOgResidences] = useState([]);

  const OgResidences = () => {
    if (perkOgResidences.length === 0) {
      return (<>
        <div className="row align-items-center" width="100%">
          <div className="col-sm-12 text-center">
            <h3>No OG Residence asset ...</h3>

            <p className="m-5">
              <a className="btn btn-secondary btn-label waves-effect waves-light w-lg" href="https://opensea.io/collection/metalife-og-residence" target="_blank" rel="noreferrer">
                <i className="ri-money-dollar-circle-line label-icon align-middle fs-16 me-2"></i> OG Residence
              </a>
            </p>
          </div>
        </div>
      </>);
    }

    return (<>
      {perkOgResidences.map((Residence, key) => (
      <Col key={key} xs={6} sm={4} md={3} xl={2}>
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
