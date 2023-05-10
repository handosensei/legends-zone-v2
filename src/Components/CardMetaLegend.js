import React, {useEffect, useState} from 'react';
import {Card, CardBody, Col, Row} from "reactstrap";
import moment from "moment";
import img4 from "../assets/images/small/img-4.jpg";
import {Link} from "react-router-dom";
import {getLegends} from "../client/ApiMetaLegends";

const CardMetaLegend = () => {

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

  useEffect(() => {

    const fetchData = async (address) => {
      const result = await getLegends(address);
      setLegends(result);
    }

    if (sessionStorage.getItem("authUser")) {
      const obj = JSON.parse(sessionStorage.getItem("authUser"));
      fetchData(obj.wallet.toLowerCase());
    }
  }, []);

  return (
    <Row>
      {legends.map((legend, key) => (
        <Col key={key} sm={4} md={3} xl={2} xxl={2}>
          <Card>
            <CardBody>
              <h6 className="card-title mb-2">
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
    </Row>

  );
}

export default CardMetaLegend;