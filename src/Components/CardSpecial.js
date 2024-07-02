import React, {useEffect, useState} from 'react';
import {Card, CardBody, Col, Row} from "reactstrap";
import {
  getCouncilStones,
  getHonoraries,
  getLZAssets,
  getUniversalWeaponSkins
} from "../client/ApiMetaLegends";

const CardSpecial = () => {

  const [honoraries, setHonoraries] = useState([]);
  const [universalWeaponSkins, setUniversalWeaponSkins] = useState([]);
  const [councilStones, setCouncilStones] = useState([]);

  const Honoraries = () => {
    if (honoraries.length === 0) {
      return (<></>);
    }

    return (
      <Row>
        <div className="justify-content-between d-flex align-items-center mt-3 mb-4">
          <h5 className="mb-0 pb-1">Honorary collection</h5>
        </div>
        {honoraries.map((honorary, key) => (
        <Col key={key} sm={4} md={3} xl={2} >
          <Card>
            <CardBody>
              <h6 className="mb-2">
                Honorary <span className="text-secondary">#{honorary.tokenId}</span>
              </h6>
            </CardBody>
            <img className="img-fluid" src={honorary.image} alt={`Honorary #${honorary.tokenId}`} />
            <div className="card-footer">
              <p className="text-muted mb-0">{honorary.name}</p>
            </div>
          </Card>
        </Col>
        ))}
      </Row>
    );
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
      <Col key={key} sm={4} md={3} xl={2} >
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
      <Col key={key} sm={4} md={3} xl={2} >
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

  const NoSpecial = () => {
    if (honoraries.length + universalWeaponSkins.length + councilStones.length === 0) {
      return (
        <React.Fragment>
          <div className="row align-items-center" width="100%">
            <div className="col-sm-12 text-center">
              <h3>No special asset ...</h3>

              <p className="m-5">
                <a className="btn btn-secondary btn-label waves-effect waves-light w-lg" href="https://opensea.io/collection/council-stones" target="_blank" rel="noreferrer">
                  <i className="ri-money-dollar-circle-line label-icon align-middle fs-16 me-2"></i> Council stones
                </a>
              </p>
              <p className="m-5">
                <a className="btn btn-secondary btn-label waves-effect waves-light w-lg" href="https://opensea.io/collection/ml-universal-weapon-skins" target="_blank" rel="noreferrer">
                  <i className="ri-money-dollar-circle-line label-icon align-middle fs-16 me-2"></i> Universal weapon skins
                </a>
              </p>
              <p className="m-5">
                <a className="btn btn-secondary btn-label waves-effect waves-light w-lg" href="https://opensea.io/collection/ml-honorary" target="_blank" rel="noreferrer">
                  <i className="ri-money-dollar-circle-line label-icon align-middle fs-16 me-2"></i> Honorary
                </a>
              </p>

            </div>
          </div>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment></React.Fragment>
    );
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
      <NoSpecial />
    </>
  );
};

export default CardSpecial;
