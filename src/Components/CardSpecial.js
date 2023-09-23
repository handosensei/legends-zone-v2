import React, {useEffect, useState} from 'react';
import {Card, CardBody, Col, Row} from "reactstrap";
import {
  getCouncilStones,
  getHonoraries,
  getLZAssets,
  getUniversalWeaponSkins
} from "../client/ApiMetaLegends";

const CardSpecial = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [honoraries, setHonoraries] = useState([]);
  const [universalWeaponSkins, setUniversalWeaponSkins] = useState([]);
  const [councilStones, setCouncilStones] = useState([]);
  const [lzAssets, setLzAssets] = useState([]);

  const Honoraries = () => {
    if (honoraries.length === 0) {
      return (<></>);
    }

    return (<Row>
      <div className="justify-content-between d-flex align-items-center mt-3 mb-4">
        <h5 className="mb-0 pb-1">Honorary collection</h5>
      </div>
      {honoraries.map((honorary, key) => (
      <Col key={key} sm={4} md={3} xl={2} xxl={2}>
        <Card>
          <CardBody>
            <h6 className="mb-2">
              Token <span className="text-secondary">#{honorary.tokenId}</span>
            </h6>
          </CardBody>
          <img className="img-fluid" src={honorary.image} alt={`Honorary #${honorary.tokenId}`} />
          <div className="card-footer">
            <p className="text-muted mb-0">{honorary.name}</p>
          </div>
        </Card>
      </Col>
      ))}
      </Row>);
  }

  const UniversalWeaponSkins = () => {
    if (universalWeaponSkins.length === 0) {
      return (<></>);
    }

    return (<Row>
      <div className="justify-content-between d-flex align-items-center mt-3 mb-4">
        <h5 className="mb-0 pb-1 ">Universal weapon skin collection</h5>
      </div>
      {universalWeaponSkins.map((weapon, key) => (
      <Col key={key} sm={4} md={3} xl={2} xxl={2}>
        <Card>
          <CardBody>
            <h6 className="mb-2">
              Token <span className="text-secondary">#{weapon.tokenId}</span>
            </h6>
          </CardBody>
          <img className="img-fluid" src={weapon.image} alt={`Universal weapon skin #${weapon.tokenId}`} />
          <div className="card-footer">
            <p className="text-muted mb-0">{weapon.name}</p>
          </div>
        </Card>
      </Col>
      ))}
    </Row>);
  }

  const CouncilStones = () => {
    if (councilStones.length === 0) {
      return (<></>);
    }

    return (<Row>
      <div className="justify-content-between d-flex align-items-center mt-3 mb-4">
        <h5 className="mb-0 pb-1 ">Council stone collection</h5>
      </div>
      {councilStones.map((stone, key) => (
      <Col key={key} sm={4} md={3} xl={2} xxl={2}>
        <Card>
          <CardBody>
            <h6 className="mb-2">
              Token <span className="text-secondary">#{stone.tokenId}</span>
            </h6>
          </CardBody>
          <img className="img-fluid" src={stone.image} alt={`OG Pet #${stone.tokenId}`} />
          <div className="card-footer">
            <p className="text-muted mb-0">{stone.name}</p>
          </div>
        </Card>
      </Col>
      ))}
    </Row>);
  }

  const LzAssets = () => {
    if (lzAssets.length === 0) {
      return (<></>);
    }

    return (<Row>
      <div className="justify-content-between d-flex align-items-center mt-3 mb-4">
        <h5 className="mb-0 pb-1 ">Legends Zone asset collection</h5>
      </div>
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
    </Row>);
  }


  useEffect(() => {
    const fetchData = async () => {
      getHonoraries().then((resHonoraries) => {
        setHonoraries(resHonoraries);
      });

      getUniversalWeaponSkins().then((resUniversalWeaponSkins) => {
        setUniversalWeaponSkins(resUniversalWeaponSkins);
      });

      getCouncilStones().then((resCouncilStones) => {
        setCouncilStones(resCouncilStones);
      });

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
    <>
      <Honoraries />
      <CouncilStones />
      <UniversalWeaponSkins />
      <LzAssets />
    </>
  );
};

export default CardSpecial;