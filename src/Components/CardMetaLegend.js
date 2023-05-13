import React, {useEffect, useState} from 'react';
import {Card, CardBody, Col, Row} from "reactstrap";
import moment from "moment";
import {getLegends} from "../client/ApiMetaLegends";

const CardMetaLegend = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [legends, setLegends] = useState([]);

  const MonthHolding = ({purchasedOnDate}) => {
    const now = moment();
    const purchasedOn = moment(purchasedOnDate);

    const monthsDiff = now.diff(purchasedOn, 'months');

    if (monthsDiff <= 1) {
      return (<p className="text-muted mb-0">{monthsDiff} month</p>)
    }

    return (<p className="text-muted mb-0">{monthsDiff} months</p>)
  }

  const Legends = () => {
    if (legends.length === 0) {
      return (
      <div className="row align-items-center" width="100%">
        <div className="col-sm-12 text-center">
          <h3>No Meta-Legends ...</h3>
          <p className="m-5">
          <a className="btn btn-secondary btn-label waves-effect waves-light" href="https://opensea.io/collection/meta-legends" target="_blank" rel="noreferrer">
            <i className="ri-money-dollar-circle-line label-icon align-middle fs-16 me-2"></i> Go on OpenSea
          </a>
          </p>
          <p>
            <a className="btn btn-warning btn-label waves-effect waves-light" href="https://blur.io/collection/meta-legends" target="_blank" rel="noreferrer">
              <i className="ri-money-dollar-circle-line label-icon align-middle fs-16 me-2"></i> Go on Blur
            </a>
          </p>

        </div>
      </div>
      );
    }
    return (<>
      {legends.map((legend, key) => (
      <Col key={key} sm={4} md={3} xl={2} xxl={1}>
        <Card>
          <CardBody>
            <h6 className="mb-2">
              ML <span className="text-secondary">#{legend.tokenId}</span>
            </h6>
          </CardBody>
          <img className="img-fluid" src={legend.media.thumbnail} alt="Card cap" />
          <div className="card-footer">
            {/*<Link to="#" className="link-success float-end">Detail</Link>*/}
            <MonthHolding purchasedOnDate={legend.purchasedOn} />
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
        <Legends />
      </>
      )
    }

    return (
      <div className="row align-items-center" width="100%">
        <div className="col-sm-12 text-center">
          <div className="spinner-border text-primary" role="status" height="100%">
            <span className="sr-only col-sm-12 text-center">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {

    const fetchData = async (address) => {
      const result = await getLegends(address);
      setLegends(result);
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

export default CardMetaLegend;