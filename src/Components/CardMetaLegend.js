import React, {useEffect, useState} from 'react';
import {Card, CardBody, Col, Row} from "reactstrap";
import {getLegends} from "../client/ApiMetaLegends";
import {notif} from "./Common/Notification";

const CardMetaLegend = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [legends, setLegends] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem("authUser") && isLoading === false) {
      setIsLoading(true);
      getLegends().then((result) => {
        setLegends(result);
      }).catch((error) => {
        notif('danger', error.message);
      })
    }
  }, []);

  return (
    <Row>
      <Col xs={6} sm={4} md={3} xl={2}>
        {legends.map((legend, key) => (
          <Card key={key}>
            <CardBody>
              <h6 className="mb-2">
                ML <span className="text-secondary">#{legend.tokenId}</span>
              </h6>
            </CardBody>
            <img className="img-fluid" src={legend.media.thumbnail} alt={`Legend #${legend.tokenId}`} />
          </Card>
        ))}
      </Col>
    </Row>
  );
}

export default CardMetaLegend;
