import React, {useEffect, useState} from "react";
import {Card, CardBody, Col, Input} from "reactstrap";
import PreviewCardSimpleHeader from "../../Components/Common/PreviewCardSimpleHeader";

const EligibilityOgPet = ({ogPet}) => {

  const [defaultCounter, setDefaultCounter] = useState(0);
  const [total, setTotal] = useState('0');

  function countUP(id, prev_data_attr) {
    if (prev_data_attr < total) {
      id(prev_data_attr + 1);
    }
  }

  function countDown(id, prev_data_attr) {
    if (prev_data_attr >= 1) {
      id(prev_data_attr - 1);
    }
  }

  const DisplayEligibility = ({nbEligibility}) => {
    let classSpan = 'text-success';
    if (nbEligibility === 0) {
      classSpan = "text-muted";
    }

    return (
    <div className="flex-shrink-0">
      <span className={classSpan}>{nbEligibility}</span>
    </div>
    );
  }

  useEffect(() => {
    setTotal(Number(
      ogPet.council+
      ogPet.guardian+
      ogPet.honorary+
      ogPet.judge+
      ogPet.mint+
      ogPet.whale+
      ogPet.og
    ));
  }, [ogPet]);

  return (
  <Col xl={3}>
    <Card>
      <PreviewCardSimpleHeader title="Claimable"/>
      <CardBody>
        <div className="live-preview">
          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Perk mint package
              <DisplayEligibility nbEligibility={ogPet.mint} />
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Top 10 Whale
              <DisplayEligibility nbEligibility={ogPet.whale} />
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Honorary
              <DisplayEligibility nbEligibility={ogPet.honorary} />
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Council
              <DisplayEligibility nbEligibility={ogPet.council} />
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              OG
              <DisplayEligibility nbEligibility={ogPet.og} />
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Judge
              <DisplayEligibility nbEligibility={ogPet.judge} />
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Guardian
              <DisplayEligibility nbEligibility={ogPet.guardian} />
            </li>
          </ul>
          <ul className="list-group mt-3">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Total to claim
              <div className="flex-shrink-0">
                <span className="text-success">0/{total}</span>
              </div>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Remains to be claimed
              <DisplayEligibility nbEligibility={total} />
            </li>
          </ul>
          <div className="d-grid gap-2 mt-3">
            <div className="input-step full-width">
              <button type="button" className="minus" onClick={() => { countDown(setDefaultCounter, defaultCounter); }} >
                –
              </button>
              <Input type="number" className="product-quantity" value={defaultCounter} min="0" max="20" readOnly />
              <button type="button" className="plus" onClick={() => { countUP(setDefaultCounter, defaultCounter); }} >
                +
              </button>
            </div>
            <button className="btn btn-primary" onClick={() => {setDefaultCounter(total)}}>Max</button>
            <button className="btn btn-light">Claim</button>
          </div>
        </div>
      </CardBody>
    </Card>
  </Col>
  );
}

export default EligibilityOgPet;