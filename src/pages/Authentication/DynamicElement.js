import React from 'react';
import {DynamicContextProvider, DynamicWidget, FilterAndSortWallets} from "@dynamic-labs/sdk-react";
import {useDispatch} from "react-redux";
import {loginUser} from "../../store/auth/login/actions";

const DynamicElement = ({props}) => {
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

  return (
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
          },
          onLogout: (args) => {
            window.location = process.env.PUBLIC_URL + "/logout";
          }
        }
      }}>
      <DynamicWidget/>
    </DynamicContextProvider>
  );
}

export default DynamicElement;