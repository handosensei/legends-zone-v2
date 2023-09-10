import React from "react";
import { Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import InfoRewardHolding from "./InfoRewardHolding";
import CardMetaLegend from "../../Components/CardMetaLegend";
import CardPerkArmor from "../../Components/CardPerkArmor";

const DashboardZone = () => {

  document.title = "Dashboards | Legends Zone";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Dashboards" pageTitle="Home"/>

          <Row>
            <Col>
              <div className="h-100">

                <InfoRewardHolding />
                <div className="justify-content-between d-flex align-items-center mt-3 mb-4">
                  <h5 className="mb-0 pb-1 text-decoration-underline">Meta-Legends collection</h5>
                </div>

                <CardMetaLegend />

                <CardPerkArmor />

              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  ) ;
}

export default DashboardZone;
