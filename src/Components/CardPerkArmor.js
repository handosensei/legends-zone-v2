import React, {useEffect, useState} from 'react';
import {Card, CardBody, Col, Row} from "reactstrap";
import {getPerkArmors} from "../client/ApiMetaLegends";

const CardPerkArmor = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [perkArmors, setPerkArmors] = useState([]);

  const PerkArmors = () => {
    if (perkArmors.length === 0) {
      return (<></>);
    }

    return (<>
      <div className="justify-content-between d-flex align-items-center mt-3 mb-4">
        <h5 className="mb-0 pb-1 ">Perk Armors collection</h5>
      </div>
      {perkArmors.map((armor, key) => (
        <Col key={key} sm={4} md={3} xl={2} xxl={1}>
          <Card>
            <CardBody>
              <h6 className="mb-2">
                Armor <span className="text-secondary">#{armor.tokenId}</span>
              </h6>
            </CardBody>
            <img className="img-fluid" src={armor.image} alt={`Armor #${armor.tokenId}`} />
            <div className="card-footer">
              <p className="text-muted mb-0">{armor.name}</p>
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
          <PerkArmors />
        </>
      )
    }
  }

  useEffect(() => {

    const fetchData = async () => {
      const result = await getPerkArmors();
      setPerkArmors(result);
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

export default CardPerkArmor;