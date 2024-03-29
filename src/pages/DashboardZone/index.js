import React from "react";
import { Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import InfoRewardHolding from "./InfoRewardHolding";
import CardMetaLegend from "../../Components/CardMetaLegend";
import CardPerkArmor from "../../Components/CardPerkArmor";
import CardOgPet from "../../Components/CardOgPet";
import CardOgVehicle from "../../Components/CardOgVehicle";
import CardOgResidence from "../../Components/CardOgResidence";
import CardSpecial from "../../Components/CardSpecial";
import CardHealingDrone from "../../Components/CardHealingDrone";

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
                  <h5 className="mb-0 pb-1 ">Meta-Legends collection</h5>
                </div>

                <CardMetaLegend />

                <CardSpecial />

                <CardPerkArmor />

                <CardOgPet />
                <CardOgVehicle />
                <CardOgResidence />

                <CardHealingDrone />

              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  ) ;
}

export default DashboardZone;
