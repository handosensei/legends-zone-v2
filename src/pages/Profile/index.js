import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane
} from 'reactstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import classnames from "classnames";
import Flatpickr from "react-flatpickr";

//import images
import ninja from '../../assets/images/metalegends/ninja.jpg';
// import avatar1 from '../../../../assets/images/users/avatar-1.jpg';

const Profile = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [textarea, setTextArea] = useState("You always want to make sure that your fonts work well together and try to limit the number of fonts you use to three or less. Experiment and play around with the fonts that you already have in the software you're working with reputable font websites.")

  const textArea = (e) => {
    setTextArea(e.target.value)
  }

  const tabChange = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  document.title = "Profile Settings | Velzon - React Admin & Dashboard Template";

  return (
  <React.Fragment>
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Profile Settings" pageTitle="Pages" />
        <Row>
          <Col xxl={3}>
            <Card className="card-bg-fill">
              <CardBody className="p-4">
                <div className="text-center">
                  <div className="profile-user position-relative d-inline-block mx-auto  mb-4">
                    <img src={ninja}
                         className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                         alt="user-profile" />
                    <div className="avatar-xs p-0 rounded-circle profile-photo-edit">
                      <Input id="profile-img-file-input" type="file"
                             className="profile-img-file-input" />
                      <Label htmlFor="profile-img-file-input" className="profile-photo-edit avatar-xs">
                        <span className="avatar-title rounded-circle bg-light text-body">
                            <i className="ri-camera-fill"></i>
                        </span>
                      </Label>
                    </div>
                  </div>
                  <h5 className="fs-16 mb-1">Hando Masahashi</h5>
                  <p className="text-muted mb-0">CTO / Developer</p>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <div className="d-flex align-items-center mb-4">
                  <div className="flex-grow-1">
                    <h5 className="card-title mb-0">Social networks</h5>
                  </div>
                </div>
                <div className="mb-3 d-flex">
                  <div className="avatar-xs d-block flex-shrink-0 me-3">
                    <span className="avatar-title rounded-circle fs-16 bg-secondary text-light">
                        <i className="ri-linkedin-box-fill"></i>
                    </span>
                  </div>
                  <Input type="email" className="form-control" id="linkedinUsername" placeholder="Username"
                         defaultValue="https://www.linkedin.com/in/hando-masahashi-bb4163250/" />
                </div>

                <div className="mb-3 d-flex">
                  <div className="avatar-xs d-block flex-shrink-0 me-3">
                    <span className="avatar-title rounded-circle fs-16 bg-info">
                        <i className="ri-twitter-fill"></i>
                    </span>
                  </div>
                  <Input type="text" className="form-control" id="dribbleName" placeholder="Username"
                         defaultValue="@handosensei" />
                </div>
                <div className="d-flex">
                  <div className="avatar-xs d-block flex-shrink-0 me-3">
                    <span className="avatar-title rounded-circle fs-16 bg-primary">
                        <i className="ri-discord-fill"></i>
                    </span>
                  </div>
                  <Input type="text" className="form-control" id="pinterestName" placeholder="Username" defaultValue="handosensei" />
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col xxl={9}>
            <Card>
              <CardHeader>
                <Nav className="nav-tabs-custom rounded card-header-tabs border-bottom-0"
                     role="tablist">

                  <NavItem>
                    <NavLink
                    className={classnames({ active: activeTab === "1" })}
                    onClick={() => {
                      tabChange("1");
                    }}>
                      <i className="fas fa-home"></i>
                      Informations
                    </NavLink>
                  </NavItem>
                </Nav>
              </CardHeader>
              <CardBody className="p-4">
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    <Form>
                      <Row>

                        <Col lg={6}>
                          <div className="mb-3">
                            <Label htmlFor="firstnameInput" className="form-label">Username</Label>
                            <Input type="text" className="form-control" id="usernameInput"
                                   placeholder="Enter your username" defaultValue="Dave" />
                          </div>
                        </Col>

                        <Col lg={6}>
                          <div className="mb-3">
                            <Label htmlFor="emailInput" className="form-label">Email</Label>
                            <Input type="text" className="form-control" id="emailInput" placeholder="Enter your email" defaultValue="Adame@gmail.com" />
                          </div>
                        </Col>

                        <Col lg={12}>
                          <div className="mb-3 pb-2">
                            <Label htmlFor="bioTextarea"
                                   className="form-label">Bio</Label>
                            <textarea className="form-control"
                                      id="bioTextarea"
                                      rows="3" defaultValue="Hi I'm Anna Adame, It will be as simple as Occidental; in fact, it will be Occidental. To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is European languages are members of the same family."></textarea>
                          </div>
                        </Col>

                        <Col lg={12}>
                          <div className="mt-4 mb-3 border-bottom pb-2">
                            <div className="float-end">
                              <Button className="btn-sm btn-soft-primary">
                                Add wallet
                              </Button>
                            </div>
                            <h5 className="card-title">Wallets</h5>
                          </div>

                          <div className="d-flex align-items-center mb-3">
                            <div className="flex-shrink-0 avatar-sm">
                              <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                                <i className="ri-fingerprint-line"></i>
                              </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <p className="text-muted mb-0">0x24DF9F5A2624Db695ee695399fd43DEB62c475Bd</p>
                            </div>
                            <div className="hstack gap-2 mt-4 mt-sm-0">
                              <button type="button" className="btn btn-outline-warning btn-icon waves-effect waves-light"><i className="ri-star-fill"></i></button>
                              <button type="button" className="btn btn-outline-primary btn-icon waves-effect waves-light"><i className="ri-delete-bin-fill"></i></button>
                            </div>
                          </div>
                          <div className="d-flex align-items-center mb-3">
                            <div className="flex-shrink-0 avatar-sm">
                              <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                                <i className="ri-fingerprint-line"></i>
                              </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <p className="text-muted mb-0">0x24DF9F5A2624Db695ee695399fd43DEB62c475Bd</p>
                            </div>
                            <div className="hstack gap-2 mt-4 mt-sm-0">
                              <button type="button" className="btn btn-outline-warning btn-icon waves-effect waves-light"><i className="ri-star-line"></i></button>
                              <button type="button" className="btn btn-outline-primary btn-icon waves-effect waves-light"><i className="ri-delete-bin-fill"></i></button>
                            </div>
                          </div>
                        </Col>

                        <Col lg={12}>
                          <div className="hstack gap-2 justify-content-end">
                            <button type="button"
                                    className="btn btn-primary">Updates</button>
                            <button type="button"
                                    className="btn btn-soft-danger">Cancel</button>
                          </div>
                        </Col>
                      </Row>
                    </Form>
                  </TabPane>

                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  </React.Fragment>
  );
};

export default Profile;