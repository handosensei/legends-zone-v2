import React, {useEffect, useState} from 'react';
import {

  Button,
  Card,
  CardBody,
  CardHeader,
  CardImg,
  Col,
  Collapse,
  Container,
  Row
} from "reactstrap";

import LAND_CONTRACT from '../../../contracts/lands/MetaLifeLand.json';
import WarningEthereum from "../../../Components/Modal/WarningEthereum";
import Faq from "./Faq";

import {getWeb3Data} from "../../../Components/Common/LibWeb3";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import {getLands} from "../../../client/ApiMetaLegends";

import LAND_CEL_1 from "../../../assets/images/metalegends/land/CELESTIAL-AREA-1.png";
import LAND_CEL_2 from "../../../assets/images/metalegends/land/CELESTIAL-AREA-2.png";
import LAND_CEL_3 from "../../../assets/images/metalegends/land/CELESTIAL-AREA-3.png";
import LAND_BUR_1 from "../../../assets/images/metalegends/land/BURNER-AREA-1.png";
import LAND_BUR_2 from "../../../assets/images/metalegends/land/BURNER-AREA-2.png";
import LAND_BUR_3 from "../../../assets/images/metalegends/land/BURNER-AREA-3.png";
import LAND_ROB_1 from "../../../assets/images/metalegends/land/ROBOTER-AREA-1.png";
import LAND_ROB_2 from "../../../assets/images/metalegends/land/ROBOTER-AREA-2.png";
import LAND_ROB_3 from "../../../assets/images/metalegends/land/ROBOTER-AREA-3.png";
import LAND_GOL_1 from "../../../assets/images/metalegends/land/GOLDBOI-AREA-1.png";
import LAND_GOL_2 from "../../../assets/images/metalegends/land/GOLDBOI-AREA-2.png";
import LAND_GOL_3 from "../../../assets/images/metalegends/land/GOLDBOI-AREA-3.png";
import LAND_MAT_1 from "../../../assets/images/metalegends/land/MATRIX-AREA-1.png";
import LAND_MAT_2 from "../../../assets/images/metalegends/land/MATRIX-AREA-2.png";
import LAND_MAT_3 from "../../../assets/images/metalegends/land/MATRIX-AREA-3.png";
import LAND_CYB_1 from "../../../assets/images/metalegends/land/CYBER-AREA-1.png";
import LAND_CYB_2 from "../../../assets/images/metalegends/land/CYBER-AREA-2.png";
import LAND_CYB_3 from "../../../assets/images/metalegends/land/CYBER-AREA-3.png";
import LAND_ROU_1 from "../../../assets/images/metalegends/land/ROUGH-AREA-1.png";
import LAND_ROU_2 from "../../../assets/images/metalegends/land/ROUGH-AREA-2.png";
import LAND_ROU_3 from "../../../assets/images/metalegends/land/ROUGH-AREA-3.png";

import Allowlist from "./Allowlist";
import MlContract from "../../../contracts/meta-legends/MetaLegends.json";

const Lands = () => {
  const CHAIN_ID = process.env.REACT_APP_LAND_CHAIN_ID;
  const LAND_ENV = process.env.REACT_APP_LAND_ENV;

  const LANDS_IMG = {
    celestial: {
      '1': LAND_CEL_1,
      '2': LAND_CEL_2,
      '3': LAND_CEL_3,
    },
    burner: {
      '1': LAND_BUR_1,
      '2': LAND_BUR_2,
      '3': LAND_BUR_3,
    },
    roboter: {
      '1': LAND_ROB_1,
      '2': LAND_ROB_2,
      '3': LAND_ROB_3,
    },
    goldboi: {
      '1': LAND_GOL_1,
      '2': LAND_GOL_2,
      '3': LAND_GOL_3,
    },
    'matrix-angel': {
      '1': LAND_MAT_1,
      '2': LAND_MAT_2,
      '3': LAND_MAT_3,
    },
    cyber: {
      '1': LAND_CYB_1,
      '2': LAND_CYB_2,
      '3': LAND_CYB_3,
    },
    rough: {
      '1': LAND_ROU_1,
      '2': LAND_ROU_2,
      '3': LAND_ROU_3,
    },
  }

  const [lands, setLands] = useState([]);
  const [landSelected, setLandSelected] = useState([1,2,3]);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);



  const ButtonAdd = ({remaining}) => {
    if (remaining === 0) {
      return (<Button className="btn btn-soft-dark waves-effect waves-light btn-sm">Out of stock</Button>);
    }
    return (<Button className="btn btn-primary btn-sm">Add land</Button>);
  }

  useEffect(() => {
    if (lands.length === 0) {
      getLands().then(res => setLands(res));
    }

    if (account === null) {
      getWeb3Data(LAND_CONTRACT[LAND_ENV], CHAIN_ID).then((res) => {
        setAccount(res[1]);
        setContract(res[0]);
      }).catch((err) => {
        console.log(err);
      });
    }
  });

  return (
    <React.Fragment>

      {/*<WarningEthereum />*/}

      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="OG Lands" pageTitle="Claim"/>
          <Row>
            <Col xxl={8}>
              <Row>
                <Allowlist contract={contract} account={account} />
              </Row>
              <Row>
                {lands.map((land, key) => (
                  <Col key={key}  xs={6} sm={4} md={3} xl={2} xxl={2}>
                    <Card>
                      <CardHeader>{land.item.class.toUpperCase()} - area {land.item.area}</CardHeader>
                      <img className="img-fluid" src={LANDS_IMG[land.item.class][land.item.area]}
                           alt={`Land ${land.item.class.toUpperCase()} - area ${land.item.area}`} />
                      <CardBody>
                        <div className="list-group-item d-flex justify-content-between align-items-center mb-2">
                          Available
                          <div className="flex-shrink-0">
                            <span className="text-white">{land.remaining}</span>
                          </div>
                        </div>
                        <div className="d-grid gap-2">
                          <ButtonAdd remaining={land.remaining}/>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
            <Col xxl={4}>
              <Row className="mb-4"><Col><Faq /></Col></Row>
              <Row>
                <Col>
                  <Card>
                    <CardHeader>
                      <div className="d-flex align-items-center">

                        <div className="flex-grow-1">
                          <h5 className="card-title mb-0">Selected land</h5>
                        </div>

                        <div className="toolbar d-flex align-items-start justify-content-center flex-wrap gap-2">
                          <Button className="btn btn-soft-danger">Mint</Button>
                        </div>
                        
                      </div>
                    </CardHeader>
                    <CardBody>

                      <div className="table-responsive table-card">
                        <table className="table table-centered table-hover align-middle table-nowrap mb-0">
                          <tbody>
                          {landSelected.map((item, key) => (
                            <tr key={key}>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="flex-shrink-0 me-2">
                                    <img src={LAND_BUR_2} alt="" className="avatar-sm p-2" />
                                  </div>
                                  <div>
                                    <h5 className="fs-14 my-1 fw-medium">Celestial area 1</h5>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div style={{textAlign: "right"}}>
                                  <Button className="btn btn-soft-danger">
                                    <i className="ri-delete-bin-2-line"></i>
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                          </tbody>
                        </table>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default Lands;
