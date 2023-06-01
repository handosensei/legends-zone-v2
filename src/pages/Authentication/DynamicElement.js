import React, {useEffect, useState} from 'react';
import { DynamicContextProvider, DynamicWidget, FilterAndSortWallets } from "@dynamic-labs/sdk-react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalBody } from 'reactstrap';

import {loginUser} from "../../store/auth/login/actions";
import {logoutUser} from "../../store/actions";
import { isHolder} from "../../client/ApiMetaLegends";
import logoSm from "../../assets/images/head-logo.svg";

const DynamicElement = ({props}) => {
  const dispatch = useDispatch();

  const [displayNoHolderMessage, setDisplayNoHolderMessage] = useState(false);

  const {isUserLogout} = useSelector((state) => ({
    isUserLogout: state.Login.isUserLogout,
  }));

  const toggleDisplayNoHolderMessage = () => {
    setDisplayNoHolderMessage(!displayNoHolderMessage);
  }

  const onConnectWallet = async (authToken) => {
    if (!window.ethereum) {
      return;
    }
    window.ethereum.request({method: 'eth_requestAccounts'})
      .then(res => {
        const addressTemp = res[0].toLowerCase();
        const user = {
          'wallet': addressTemp,
          'jwt': authToken,
        }
        dispatch(loginUser(user, props.router.navigate));
      });
  }

  useEffect(() => {
  }, [dispatch]);

  return (
    <>
      <DynamicContextProvider
        settings={{
          environmentId: process.env.REACT_APP_DYNAMIC_AUTH,
          appName: "Legends Zone",
          siweStatement: "Welcome to LegendsZone. Signing is the only way we can truly know that you are the owner of the wallet you are connecting. Signing is a safe, gas-less transaction that does not in any way give this app permission to perform any transactions with your wallet.",
          appLogoUrl: "https://meta-life.io/favicon.ico",
          // initialAuthenticationMode: 'connect-only',
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
            onAuthSuccess: async (args) => {
              const response = await isHolder(args.primaryWallet.address.toLowerCase());
              if (response.isHolderOfCollection) {
                onConnectWallet(args['authToken']);
              } else {
                setDisplayNoHolderMessage(true);
              }
            },
            onLogout: (args) => {
              dispatch(logoutUser());
              window.location = process.env.PUBLIC_URL + "/";
            }
          }
        }}>
        <DynamicWidget/>
      </DynamicContextProvider>

      <div className="d-none code-view">
        <pre className="language-markup" style={{height: "275px"}}>
            <code>
              <Modal
                isOpen={displayNoHolderMessage}
                toggle={() => {
                  toggleDisplayNoHolderMessage();
                }}
                id="firstmodal"
                centered
              >
                  <ModalBody className="text-center p-5">
                      <p className="logo-sm">
                        <img src={logoSm} alt="" height="100" />
                      </p>
                      <div className="mt-4 pt-4">
                          <h4>Hold on! you're not a holder yet ?</h4>
                          <p className="text-muted"> You need to be to access the application.</p>
                          <p className="m-5">
                            <a className="btn btn-secondary btn-label waves-effect waves-light w-lg" href="https://opensea.io/collection/meta-legends" target="_blank" rel="noreferrer">
                              <i className="ri-money-dollar-circle-line label-icon align-middle fs-16 me-2"></i> OpenSea
                            </a>
                          </p>
                          <p>
                            <a className="btn btn-warning btn-label waves-effect waves-light w-lg" href="https://blur.io/collection/meta-legends" target="_blank" rel="noreferrer">
                              <i className="ri-money-dollar-circle-line label-icon align-middle fs-16 me-2"></i> Blur
                            </a>
                          </p>
                      </div>
                  </ModalBody>
              </Modal>
            </code>
        </pre>
      </div>
    </>
  );
}

export default DynamicElement;
