import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  Modal, ModalBody,
  ModalHeader,
  Row, Spinner
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import {Link} from "react-router-dom";

import "./unstaked.css";
import {getWeb3Data} from "../../../Components/Common/LibWeb3";

import MlContract from "../../../contracts/testnet/meta-legends/MetaLegends.json";
import StakingContract from "../../../contracts/staking-ml/MetaLifeStaking.json";
import {getItemsFromByCollection, getNFTsMetadata} from "../../../client/ApiMetaLegends";
import {toast, ToastContainer} from "react-toastify";
import Information from './Information';
import MLStaked from "./MLStaked";

import { useSelector, useDispatch} from "react-redux";
import {stakedLoading} from "../../../store/staking/metalegends/actions";

const MetaLegends = () => {

  document.title = "Staking Meta-Legends NFT | Legends Zone";

  const BLOCKCHAIN = process.env.REACT_APP_STAKING_BLOCKCHAIN;
  const NETWORK = process.env.REACT_APP_STAKING_NETWORK;
  const CHAIN_ID = process.env.REACT_APP_STAKING_CHAIN_ID;
  const CONTRACT_ML = process.env.REACT_APP_STAKING_CONTRACT_ML;
  const CONTRACT_STAKING = process.env.REACT_APP_STAKING_CONTRACT_STAKING;
  const ENV_STAKING = process.env.REACT_APP_STAKING_ENV;

  const [contractStaking, setContractStaking] = useState(null);
  const [contractMetaLegends, setContractMetaLegends] = useState(null);
  const [account, setAccount] = useState(null);
  const [nftUnstaked, setNftUnstaked] = useState([]);
  const [modal, setModal] = useState(false);
  const [hasNtfsStaked, setHasNftsStaked] = useState(false);
  const [displayMode, setDisplayMode] = useState("grid");
  const [tokenIdsSeleted, setTokenIdsSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [countTokenStaked, setCountTokenStaked] = useState(0);
  const [tokenIdsStaked, setTokenIdsStaked] = useState([]);
  const [NFTsStaked, setNFTsStaked] = useState([]);
  const [amountSpaace, setAmountSpaace] = useState(0);
  const [rewardDetails, setRewardDetails] = useState([]);
  const [rewardPerHour, setRewardPerHour] = useState(0);
  const [noStakingAlreadyLoad, setNoStakingAlreadyLoad] = useState(false);


  const dispatch = useDispatch();

  const { tokenStaked } = useSelector((state) => ({
    tokenStaked: state.StakingMetaLegends.tokenStaked
  }));

  useEffect(() => {
    if ((tokenStaked && !tokenStaked.length) && !noStakingAlreadyLoad) {
      dispatch(stakedLoading());
      setTokenIdsStaked(tokenStaked);
      setNoStakingAlreadyLoad(true);
    }
  }, [dispatch, tokenStaked]);

  const notif = (type, message, colorText='text-white') => {
    toast(message, {
      position: "top-right",
      hideProgressBar: true,
      className: `bg-${type} text-white`
    });
  }

  function toogleModal() {
    setModal(!modal);
    setTokenIdsSelected([]);
  }

  const StakedNFTs = () => {
    if (hasNtfsStaked) {
      return (
        <React.Fragment>
          <Row className="mb-4">
            <Col xl={10} lg={10} md={9} sm={8} xs={8}>
              <Button color="primary" className="btn-label btn-sm waves-effect waves-light w-xs me-2" onClick={unstakeAll}>
                <i className="ri-lock-unlock-fill label-icon align-middle fs-16 me-2"></i> Unstake & Claim All
              </Button>
              <Button color="primary" className="btn-label btn-sm waves-effect waves-light w-xs" onClick={claimAll}>
                <i className=" ri-hand-coin-line label-icon align-middle fs-16 me-2"></i> Claim All
              </Button>
            </Col>
            <Col xl={2} lg={2} md={3} sm={4} xs={4} style={{textAlign: "right"}}>
              <Button color="secondary" className="btn-label btn-sm waves-effect waves-light w-xs" onClick={toogleModal}>
                <i className="mdi mdi-diamond-stone label-icon align-middle fs-16 me-2"></i> Stake more
              </Button>
            </Col>
          </Row>
          <MLStaked NFTsStaked={NFTsStaked} rewardDetails={rewardDetails} rewardsPerHour={rewardPerHour}/>
        </React.Fragment>
      );
    }

    return (
      <Row>
        <div className="col-sm-12 text-center" height="100%">
          <h3 className="mt-5">No Meta-Legends NFT staked ...</h3>
          <p className="m-5">
            <Button color="secondary" className="btn-label waves-effect waves-light w-lg" onClick={toogleModal}>
              <i className="mdi mdi-diamond-stone label-icon align-middle fs-16 me-2"></i> Stake now
            </Button>
          </p>
        </div>
      </Row>
    );
  }

  const claimAll = () => {
    contractStaking.methods.claim(tokenIdsStaked).send({from: account}).then((res) => {
      const amount = Number(res.events.Claimed.returnValues.amount) / Math.pow(10, 18);
      const message = `${Number(amount).toFixed(3)} $SPAACE claimed`;
      notif('success', message);
    });
  }

  const unstakeAll = () => {
    contractStaking.methods.claimAndUnstake(tokenIdsStaked).send({from: account})
      .then((res) => {
        const amount = Number(res.events.Claimed.returnValues.amount) / Math.pow(10, 18);
        const message = `${Number(amount).toFixed(3)} $SPAACE claimed`;
        notif('success', message);
        notif('success', `${tokenIdsStaked.length} NFT unstaked`);
        setHasNftsStaked(false);
        setAmountSpaace(0);
        setCountTokenStaked(0);
        dispatch(stakedLoading());
      })
      .catch((error) => {
        notif('danger', error.message);
      })
  }

  const DisplayUnstaked = () => {

    return (
      <Row>
        <DisplayUnstakedNftGrid />
      </Row>
    )
  }

  const onSelectPfp = (e) => {
    const tokenIds = tokenIdsSeleted;
    if (!tokenIds.includes(e.target.value)) {
      tokenIds.push(e.target.value);
    } else {
      const index = tokenIds.indexOf(e.target.value);
      if (index > -1) {
        tokenIds.splice(index, 1);
      }
    }
     setTokenIdsSelected(tokenIds);
  }

  const DisplayUnstakedNftGrid = () => {
    return (
      <React.Fragment>
        {nftUnstaked.map((legend, key) => (
          <Col key={key} xs={4} sm={4} md={3} lg={2} xl={2} xxl={2}>
              <input type="checkbox" name="tokenIds"
                     id={`legend#${legend.tokenId}`} className="visually-hidden" value={legend.tokenId}
                     onChange={onSelectPfp} />
              <label htmlFor={`legend#${legend.tokenId}`}>
                <img className="img-fluid" src={legend.media.thumbnailUrl ?? legend.media.originalUrl} alt="" />
              </label>
          </Col>
        ))}
      </React.Fragment>
    );
  }

  const staking = async () => {
    if (tokenIdsSeleted.length === 0) {
      return;
    }
    const isApproved = await contractMetaLegends.methods.isApprovedForAll(account, CONTRACT_STAKING).call();
    if (!isApproved) {
      try {
        contractMetaLegends.methods.setApprovalForAll(CONTRACT_STAKING, true).send({from: account})
          .then((res) => {
            if ('status' in res && res.status == true) {
              stake();
            }
          })
          .catch((error) => {
            if (error.code === 4001 || error.message.includes("User denied transaction")) {
              notif('warning', "Approval for all refused");
            } else {
              notif('danger', error.message);
            }
          })
          .finally(() => toogleModal());
      } catch (error) {
        notif('danger', error.message);
      }
    } else {
      stake();
    }
  }

  const CustomToastWithLink = (hash) => {
    const url = `https://${CHAIN_ID != '1' ? 'sepolia.' : ''}etherscan.io/tx/${hash}`;
    return (
      <div>
        <Link to={url} target="_blank" rel="noopener noreferrer">Go to the transaction</Link>
      </div>
    );
  }

  const stake = async () => {
    setLoading(true);
    contractStaking.methods.stake(tokenIdsSeleted).send({ from: account })
      .then((res: any) => {
        notif('success', `${tokenIdsSeleted.length} NFT ML Staked`);
        toast.info(CustomToastWithLink(res.transactionHash));
        dispatch(stakedLoading());
        reloadTokenStaked();
      })
      .catch((error) => {
        if (error.code === 4001 || error.message.includes("User denied transaction")) {
          notif('warning', 'Staking cancelled');
        } else {
          notif('danger', error.message);
        }
    })
    .finally(() => {
      setLoading(false);
      toogleModal();
    });
  }

  const Loading = () => {
    if (loading) {
      return (
        <React.Fragment>
          <Spinner size="sm" className="flex-shrink-0" />
        </React.Fragment>
      );
    }

    return (<React.Fragment></React.Fragment>);
  }

  const UnstakedNFTsModal = () => {
    return (
      <React.Fragment>
        <Modal size="xl" isOpen={modal} toggle={toogleModal}>
          <ModalHeader className="modal-title" toggle={() => {toogleModal();}}>
            Meta-Legends NFT unstaked
          </ModalHeader>
          <ModalBody>
            <DisplayUnstaked />
          </ModalBody>
          <div className="modal-footer">
            <Link to="#" className="btn btn-link link-success fw-medium" onClick={() => toogleModal()}><i className="ri-close-line me-1 align-middle"></i> Cancel</Link>
            <Button color="primary" onClick={staking}>
              <span className="d-flex align-items-center">
                <Loading />
                <span className="flex-grow-1 ms-2">
                    Stake
                </span>
              </span>
            </Button>
          </div>
        </Modal>
      </React.Fragment>
    );
  }

  const reloadTokenStaked = () => {
    if (contractStaking == null) {
      return;
    }
    contractStaking.methods.tokenStakedByOwner(account).call()
      .then((res) => {
        setCountTokenStaked(res.length);
        if (res.length > 0) {
          setHasNftsStaked(true);
          setTokenIdsStaked(res);
          contractStaking.methods.getRewardAmount(account, res).call().then((res) => {
            setAmountSpaace(Number(res) / Math.pow(10, 18));
          });

          contractStaking.methods.getRewardDetails(account).call().then((res) => {
            setRewardDetails(res);
          });

          getNFTsMetadata(BLOCKCHAIN, NETWORK, CONTRACT_ML, res).then((tokensStaked) => {
            setNFTsStaked(tokensStaked);
          });
        }
      });
  }

  useEffect(() => {
    const stakingContract = StakingContract[ENV_STAKING];
    getWeb3Data(stakingContract, CHAIN_ID).then((res) => {
      setContractStaking(res[0]);
      setAccount(res[1]);
      const contract = res[0];
      const account = res[1];
      contract.methods.rewardsPerHour().call().then((res) => setRewardPerHour(res));
      contract.methods.tokenStakedByOwner(account).call()
        .then((res) => {
          setCountTokenStaked(res.length);
          if (res.length > 0) {
            setHasNftsStaked(true);
            setTokenIdsStaked(res);
            contract.methods.getRewardAmount(account, res).call().then((res) => {
              setAmountSpaace(Number(res) / Math.pow(10, 18));
            });

            contract.methods.getRewardDetails(account).call().then((res) => {
              setRewardDetails(res);
            });

            getNFTsMetadata(BLOCKCHAIN, NETWORK, CONTRACT_ML, res).then((tokensStaked) => {
              setNFTsStaked(tokensStaked);
            });
          }
        });
    }).catch((err) => {
      console.log(err);
    });

    getWeb3Data(MlContract, CHAIN_ID).then((res) => {
      setContractMetaLegends(res[0]);
    }).catch((err) => {
      console.log(err);
    });

    getItemsFromByCollection(BLOCKCHAIN, NETWORK, CONTRACT_ML).then((nfts) => {
      setNftUnstaked(nfts);
    });
  },[]);

  return (
    <React.Fragment>

      <UnstakedNFTsModal />

      <div className="page-content">
        <Container fluid>

          <BreadCrumb title="Meta-Legends NFT" pageTitle="Staking"/>

          <Information amountSpaace={amountSpaace} countTokenStaked={countTokenStaked}/>

          <StakedNFTs />

        </Container>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
}

export default MetaLegends;
