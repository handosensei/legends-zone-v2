import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import {DynamicContextProvider, DynamicWidget, FilterAndSortWallets} from '@dynamic-labs/sdk-react';

//redux
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";

// actions
import { loginUser } from "../../store/actions";

import logoLight from "../../assets/images/logo-light.png";

//Import config
import withRouter from '../../Components/Common/withRouter';

const Login = (props) => {
    const dispatch = useDispatch();

    const onConnectWallet = () => {
        if (!window.ethereum) {
            return;
        }
        window.ethereum.request({method: 'eth_requestAccounts'})
        .then(res => {
            const addressTemp = res[0].toLowerCase();
            defineUserIsHolder(addressTemp);
            defineUserIsAdmin(addressTemp);

            const user = {
                'wallet': addressTemp,
                'holder': true,
                'admin': true,
            }
            dispatch(loginUser(user, props.router.navigate));
        });
    }

    const defineUserIsAdmin = (addressValue) => {

    }

    const defineUserIsHolder = (addressValue) => {

    }

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
                                    <div>
                                        <Link to="/" className="d-inline-block auth-logo">
                                            <img src={logoLight} alt="" height="100 " />
                                        </Link>
                                    </div>
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
                                            <DynamicContextProvider
                                                settings={{
                                                    environmentId: process.env.REACT_APP_DYNAMIC_AUTH,
                                                    initialAuthenticationMode: 'connect-only',
                                                    enableVisitTrackingOnConnectOnly: false,
                                                    walletsFilter: FilterAndSortWallets(
                                                    [
                                                        'metamask',
                                                        'trust',
                                                        'coolwallet',
                                                        'coinbase',
                                                        'walletconnect',
                                                        'braveevm',
                                                        'opera',
                                                        'ledger'
                                                    ]),
                                                    eventsCallbacks: {
                                                        onAuthFlowClose: () => {
                                                            onConnectWallet();
                                                        }
                                                    }
                                                }}>
                                                <DynamicWidget/>
                                            </DynamicContextProvider>
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