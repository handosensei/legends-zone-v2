import React, {useState} from "react";
import {Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane, Card, CardBody} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import CardMetaLegend from "../../Components/CardMetaLegend";
import CardPerkArmor from "../../Components/CardPerkArmor";
import CardOgPet from "../../Components/CardOgPet";
import CardOgVehicle from "../../Components/CardOgVehicle";
import CardOgResidence from "../../Components/CardOgResidence";
import CardSpecial from "../../Components/CardSpecial";
import CardHoldingReward from "../../Components/CardHoldingReward";
import CardHealingDrone from "../../Components/CardHealingDrone";
import classnames from "classnames";

const DashboardZone = () => {

  document.title = "Dashboards | Legends Zone";

  const [justifyTab, setjustifyTab] = useState("1");
  const justifyToggle = (tab) => {
    if (justifyTab !== tab) {
      setjustifyTab(tab);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Dashboards" pageTitle="Home"/>

          <Row>
            <Col>
              <div className="h-100">
                <Nav tabs className="nav nav-tabs nav-tabs-custom nav-success nav-justified mb-5">
                  <NavItem>
                    <NavLink style={{ cursor: "pointer" }} className={classnames({ active: justifyTab === "1", })} onClick={() => { justifyToggle("1"); }} >
                      Meta-Legends
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink style={{ cursor: "pointer" }} className={classnames({ active: justifyTab === "2", })} onClick={() => { justifyToggle("2"); }} >
                      Special
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink style={{ cursor: "pointer" }} className={classnames({ active: justifyTab === "3", })} onClick={() => { justifyToggle("3"); }} >
                      Holding rewards
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink style={{ cursor: "pointer" }} className={classnames({ active: justifyTab === "4", })} onClick={() => { justifyToggle("4"); }} >
                      Healing drone
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink style={{ cursor: "pointer" }} className={classnames({ active: justifyTab === "5", })} onClick={() => { justifyToggle("5"); }} >
                      OG Armors
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink style={{ cursor: "pointer" }} className={classnames({ active: justifyTab === "6", })} onClick={() => { justifyToggle("6"); }} >
                      OG Pets
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink style={{ cursor: "pointer" }} className={classnames({ active: justifyTab === "7", })} onClick={() => { justifyToggle("7"); }} >
                      OG Vehicles
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink style={{ cursor: "pointer" }} className={classnames({ active: justifyTab === "8", })} onClick={() => { justifyToggle("8"); }} >
                      OG Residences
                    </NavLink>
                  </NavItem>
                </Nav>

                <TabContent activeTab={justifyTab} className="text-muted">
                  <TabPane tabId="1">
                    <CardMetaLegend />
                  </TabPane>

                  <TabPane tabId="2">
                    <CardSpecial />
                  </TabPane>

                  <TabPane tabId="3">
                    <CardHoldingReward />
                  </TabPane>

                  <TabPane tabId="4">
                    <CardHealingDrone />
                  </TabPane>

                  <TabPane tabId="5">
                    <CardPerkArmor />
                  </TabPane>

                  <TabPane tabId="6">
                    <CardOgPet />
                  </TabPane>

                  <TabPane tabId="7">
                    <CardOgVehicle />
                  </TabPane>

                  <TabPane tabId="8">
                    <CardOgResidence />
                  </TabPane>
                </TabContent>

              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  ) ;
}

export default DashboardZone;
