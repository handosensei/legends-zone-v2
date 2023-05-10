import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import { Link } from "react-router-dom";

//redux
import { useDispatch } from "react-redux";


import logoLight from "../../assets/images/logo-light.png";

//Import config
import withRouter from '../../Components/Common/withRouter';
import DynamicElement from "./DynamicElement";

const Login = (props) => {

    useEffect(() => {
        document.documentElement.setAttribute("data-body-image", "img-3");
        document.documentElement.setAttribute("data-layout-mode", "dark");
    }, []);

    document.title = "Connect to Legends Zone";
    return (
        <React.Fragment>
            <ParticlesAuth>
                <div className="auth-page-content">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="text-center mt-sm-5 mb-4 text-white-50">
                                    <Link to="/" className="d-inline-block auth-logo">
                                        <img src={logoLight} alt="" height="70" />
                                    </Link>
                                </div>
                            </Col>
                        </Row>

                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5}>
                                <Card className="mt-4 card-bg-fill">
                                    <CardBody className="p-4">
                                        <div className="text-center mt-2">
                                            <h5 className="text-primary">Welcome Back Legend !</h5>
                                        </div>

                                        <div className="text-center p-2 mt-4">
                                            <table>
                                                <tr>
                                                    <td width="25%"></td>
                                                    <td width="50%"><DynamicElement props={props}/></td>
                                                    <td width="25%"></td>
                                                </tr>
                                            </table>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </ParticlesAuth>
        </React.Fragment>
    );
};

export default withRouter(Login);