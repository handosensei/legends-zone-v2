import {Button, Col, Input, Modal, ModalBody, ModalHeader, Row} from "reactstrap";
import React, {useState} from "react";
import { ethers } from 'ethers';
import MetaLifeArmor from "../../../contracts/mainnet/og-armor/MetaLifeArmor.json";
import {toast, ToastContainer} from "react-toastify";
const contractAddress = "0xE091774B4a6d0990d0ba7d9478de6e00f7175f7f";
const Claim = ({account}) => {

  const [counter, setCounter] = useState(0);

  const mint = async () => {
    try {
      const { ethereum } = window;
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const nftContract = new ethers.Contract(contractAddress, MetaLifeArmor, signer);

      console.log("Initialize payment");
      let nftTxn = await nftContract.safeMint(account, counter);

      console.log("Mining... please wait");
      await nftTxn.wait();

      console.log(`Mined, transaction hash: ${nftTxn.hash}`);
      toast(`Armor NFT minted: transaction hash: ${nftTxn.hash}`,
        {
          position: "top-right",
          hideProgressBar: true,
          className: 'bg-success text-white' });
    } catch (err) {
      console.log(err);
      toast("Mint armor NFT failed",
        {
          position: "top-right",
          hideProgressBar: true,
          className: 'bg-danger text-white' });
    }
  }

  function countUp(prev_data_attr) {
    setCounter(prev_data_attr + 1);
  }

  function countDown(prev_data_attr) {
    if (prev_data_attr >= 1) {
      setCounter(prev_data_attr - 1);
    }
  }

  const ButtonMint = () => {
    return (<button className="btn btn-primary" onClick={() => { mint(); }}>Mint</button>);
  }

  return (
    <React.Fragment>

      <Row className="mt-5 mb-5">
        <Col xl={6}>
          <div className="d-grid gap-2">
            <div className="input-step full-width">
              <button type="button" className="minus" onClick={() => { countDown(counter); }} >
                –
              </button>
              <Input type="number" className="product-quantity" value={counter} min="0" max="20" readOnly />
              <button type="button" className="plus" onClick={() => { countUp(counter); }} >
                +
              </button>
            </div>

            <ButtonMint />

          </div>

        </Col>
      </Row>
      <ToastContainer />
    </React.Fragment>

  );
}

export default Claim;
