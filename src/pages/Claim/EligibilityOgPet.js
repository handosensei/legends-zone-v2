import React, {useEffect, useState} from "react";
import {Card, CardBody, Col, Input} from "reactstrap";
import PreviewCardSimpleHeader from "../../Components/Common/PreviewCardSimpleHeader";
import {getEligibilityOgPets} from "../../client/ApiMetaLegends";

const EligibilityOgPet = () => {


  const [defaultCounter, setdefaultCounter] = useState(0);
  const [total, setTotal] = useState(0);
  const [ogPet, setOgPet] = useState({});

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

  function defineTotal(ogPet) {
    let value = 0;
    value += Number(ogPet.council);
    value += Number(ogPet.guardian);
    value += Number(ogPet.honorary);
    value += Number(ogPet.judge);
    value += Number(ogPet.mint);
    value += Number(ogPet.whale);
    value += Number(ogPet.og);
    setTotal(value);
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
    const fetchData = async (address) => {
      const result = await getEligibilityOgPets(address);
      setOgPet(result);
      defineTotal(result)
    }

    if (sessionStorage.getItem("authUser")) {
      const obj = JSON.parse(sessionStorage.getItem("authUser"));
      fetchData(obj.wallet.toLowerCase());
    }
  }, []);

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
              <button
              type="button"
              className="minus"
              onClick={() => {
                countDown(setdefaultCounter, defaultCounter);
              }}
              >
                –
              </button>
              <Input
              type="number"
              className="product-quantity"
              value={defaultCounter}
              min="0"
              max="100"
              readOnly
              />
              <button
              type="button"
              className="plus"
              onClick={() => {
                countUP(setdefaultCounter, defaultCounter);
              }}
              >
                +
              </button>
            </div>
            <button className="btn btn-primary" onClick={() => {setdefaultCounter(total)}}>Max</button>
            <button className="btn btn-light">Claim</button>
          </div>
        </div>
      </CardBody>
    </Card>
  </Col>
  );
}

export default EligibilityOgPet;