import React, {useEffect, useState} from 'react';
import {Card, CardBody, Col, Row} from "reactstrap";
import CardHealingDrone from "./CardHealingDrone";
import {getLZAssets} from "../client/ApiMetaLegends";

const CardHoldingReward = () => {

  const [lzAssets, setLzAssets] = useState([]);

  const LzAssets = () => {
    if (lzAssets.length === 0) {
      return (<>
        <div className="row align-items-center" width="100%">
          <div className="col-sm-12 text-center">
            <h3>No holding rewards asset ...</h3>

            <p className="m-5">
              <a className="btn btn-secondary btn-label waves-effect waves-light w-lg" href="https://opensea.io/collection/legends-zone-rewards" target="_blank" rel="noreferrer">
                <i className="ri-money-dollar-circle-line label-icon align-middle fs-16 me-2"></i> Council stones
              </a>
            </p>
          </div>
        </div>
      </>);
    }

    return (
      <Row>
        {lzAssets.map((asset, key) => (
          <Col key={key} sm={4} md={3} xl={2} xxl={2}>
            <Card>
              <CardBody>
                <h6 className="mb-2">
                  Token <span className="text-secondary">#{asset.tokenId}</span>
                </h6>
              </CardBody>
              <img className="img-fluid" src={asset.image} alt={`OG Pet #${asset.tokenId}`} />
              <div className="card-footer">
                <p className="text-muted mb-0">Balance: {asset.balance}</p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };

  useEffect( () => {
    const fetchData = async () => {
      getLZAssets().then((resLzAssets) => {
        setLzAssets(resLzAssets);
      })
    }
    if (sessionStorage.getItem("authUser")) {
      const obj = JSON.parse(sessionStorage.getItem("authUser"));
      fetchData(obj.wallet.toLowerCase());
    }
  }, []);

  return (
    <React.Fragment>
      <LzAssets />
    </React.Fragment>
  )
}

export default CardHoldingReward;
