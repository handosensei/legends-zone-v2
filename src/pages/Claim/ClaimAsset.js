import React, { useState } from "react";
import {Card, CardBody, CardHeader, Col, Input} from "reactstrap";

const ClaimAsset = ({claimable, title, func}) => {

  const [counter, setCounter] = useState(0);

  function claim() {

    switch (func) {
      case 'random': break;
      case 'council': break;
      case 'whale': break;
      case 'judge': break;
      case 'guardian': break;
      case 'honorary': break;
      default:
        console.log(`Sorry, ${func} unknown.`);
    }
  }

  function countUp(prev_data_attr) {
    if (prev_data_attr < claimable) {
      setCounter(prev_data_attr + 1);
    }
  }

  function countDown(prev_data_attr) {
    if (prev_data_attr >= 1) {
      setCounter(prev_data_attr - 1);
    }
  }

  const ClaimButton = () => {
    if (claimable > 0) {
      return (<button className="btn btn-primary" onClick={() => { claim(); }}>Claim</button>);
    }

    return (<button className="btn btn-light">Claim</button>);
  }

  return (
    <Col xl="4">
      <Card>
        <CardHeader>{title}</CardHeader>
        <CardBody>
          <div className="list-group-item d-flex justify-content-between align-items-center">
            Total claimed

            <div className="flex-shrink-0">
              <span className={claimable > 0 ? "text-success": "text-muted"}>0/{claimable}</span>
            </div>
          </div>

          <div className="d-grid gap-2 mt-3">
            <div className="input-step full-width">
              <button type="button" className="minus" onClick={() => { countDown(counter); }} >
                –
              </button>
              <Input type="number" className="product-quantity" value={counter} min="0" max="20" readOnly />
              <button type="button" className="plus" onClick={() => { countUp(counter); }} >
                +
              </button>
            </div>
            <ClaimButton />
          </div>
        </CardBody>
      </Card>
    </Col>
  );
}

export default ClaimAsset;
