import React, {useEffect, useState} from 'react';
import {DynamicContextProvider, DynamicWidget, FilterAndSortWallets} from "@dynamic-labs/sdk-react";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../../store/auth/login/actions";
import { logoutUser } from "../../store/actions";
import PropTypes from "prop-types";
import withRouter from "../../Components/Common/withRouter";

const DynamicElement = ({props}) => {
  const dispatch = useDispatch();

  const [isHolder, setIsHolder] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const { isUserLogout } = useSelector((state) => ({
    isUserLogout: state.Login.isUserLogout,
  }));

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
        'holder': isHolder,
        'admin': isAdmin,
      }
      dispatch(loginUser(user, props.router.navigate));
    });
  }

  const defineUserIsAdmin = (addressValue) => {
    setIsAdmin(false);
  }

  const defineUserIsHolder = (addressValue) => {
    setIsHolder(true);
  }

  useEffect(() => {

  }, [dispatch]);



  return (
    <DynamicContextProvider
      settings={{
        environmentId: process.env.REACT_APP_DYNAMIC_AUTH,
        appName: "Legends Zone",
        siweStatement:"Welcome to LegendsZone. Signing is the only way we can truly know that you are the owner of the wallet you are connecting. Signing is a safe, gas-less transaction that does not in any way give this app permission to perform any transactions with your wallet.",
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
          onAuthSuccess: (args) => {
            onConnectWallet();
          },
          onLogout: (args) => {
            dispatch(logoutUser());
            window.location = process.env.PUBLIC_URL + "/";
          }
        }
      }}>
      <DynamicWidget/>
    </DynamicContextProvider>
  );
}

export default DynamicElement;