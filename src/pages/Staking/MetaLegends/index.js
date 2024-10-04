import React, { useEffect, useState, useRef } from 'react';
import {
  Button, Card, CardBody, CardFooter,
  Col,
  Container,
  Modal, ModalBody,
  ModalHeader,
  Row, Spinner
} from "reactstrap";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import {useSelector, useDispatch} from "react-redux";

import BreadCrumb from "../../../Components/Common/BreadCrumb";
import {notif} from "../../../Components/Common/Notification";

import MlContract from "../../../contracts/meta-legends/MetaLegends.json";
import StakingContract from "../../../contracts/staking-ml/MetaLifeStaking.json";
import {getItemsFromByCollection, getNFTsMetadata} from "../../../client/ApiMetaLegends";
import {getWeb3Data} from "../../../Components/Common/LibWeb3";

import Information from './Information';

import {stakedLoading} from "../../../store/staking/metalegends/actions";

import "./unstaked.css";
import moment from "moment/moment";

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
  const [tokenIdsSelected, setTokenIdsSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [countTokenStaked, setCountTokenStaked] = useState(0);
  const [tokenIdsStaked, setTokenIdsStaked] = useState([]);
  const [NFTsStaked, setNFTsStaked] = useState([]);
  const [amountSpaace, setAmountSpaace] = useState(0);
  const [rewardDetails, setRewardDetails] = useState([]);
  const [rewardPerHour, setRewardPerHour] = useState(0);
  const [noStakingAlreadyLoad, setNoStakingAlreadyLoad] = useState(false);
  const [tokenIdsToUnstake, setTokenIdsToUnstake] = useState([]);
  const dispatch = useDispatch();

  const ref = useRef([]);

  const { tokenStaked } = useSelector((state) => ({
    tokenStaked: state.StakingMetaLegends.tokenStaked
  }));

  const Unchecked = () => {
    for (let i = 0; i < ref.current.length; i++) {
      ref.current[i].checked = false;
    }
  }

  const Checked = () => {
    for (let i = 0; i < ref.current.length; i++) {
      ref.current[i].checked = true;
    }
  }

  function toogleModal() {
    setModal(!modal);
    setTokenIdsSelected([]);
  }

  const StakedNFTs = () => {
    if (hasNtfsStaked) {
      return (
        <React.Fragment>
          <Row className="mb-3">
            <Col xl={10} lg={10} md={9} sm={8} xs={8}>
              <Button color="primary" className="btn-label btn-sm waves-effect waves-light w-lg" onClick={unstakeSelected}>
                <i className="ri-lock-unlock-fill label-icon align-middle fs-16 me-2"></i> Unstake
              </Button>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col xl={10} lg={10} md={9} sm={8} xs={8}>
              <Button color="primary" className="btn-label btn-sm waves-effect waves-light w-lg me-3" onClick={unstakeAll}>
                <i className="ri-lock-unlock-fill label-icon align-middle fs-16 me-2"></i> Unstake All
              </Button>
              <Button color="primary" className="btn-label btn-sm waves-effect waves-light w-lg" onClick={claimAll}>
                <i className=" ri-hand-coin-line label-icon align-middle fs-16 me-2"></i> Claim All
              </Button>
            </Col>
            <Col xl={2} lg={2} md={3} sm={4} xs={4} style={{textAlign: "right"}}>
              <Button color="secondary" className="btn-label btn-sm waves-effect waves-light w-md" onClick={toogleModal}>
                <i className="mdi mdi-diamond-stone label-icon align-middle fs-16 me-2"></i> Stake more
              </Button>
            </Col>
          </Row>

          <Row>
            {NFTsStaked.map((nft, key) => (
              <Col xs={6} sm={4} md={3} xl={2} xxl={1} key={key}>
                <Card>
                  <CardBody>
                    <h6>ML <span className="text-secondary">#{nft.tokenId}</span></h6>
                  </CardBody>
                  <input type="checkbox" name="tokenIdsStakedSelect"
                         id={`legend-select-${nft.tokenId}`} className="visually-hidden" value={nft.tokenId}
                         onChange={onSelectStakedNFT} />
                  <label htmlFor={`legend-select-${nft.tokenId}`} className="staked">
                    <img className="img-fluid" src={nft.image.thumbnailUrl ?? nft.image.originalUrl} alt={`Legend #${nft.tokenId}`} />
                  </label>
                  <CardFooter>
                    <h6 className="mb-1 text-muted">Earn</h6>
                    <Earn tokenId={nft.tokenId} />
                  </CardFooter>
                </Card>
              </Col>
            ))}
          </Row>
        </React.Fragment>
      );
    }
    return (
      <Row>
        <div className="col-sm-12 text-center" height="100%">
          <h3 className="mt-5">No Meta-Legends NFT staked ...</h3>
          <p className="m-5">
            <Button color="secondary" className="btn-lg btn-label waves-effect waves-light w-lg" onClick={toogleModal}>
              <i className="mdi mdi-diamond-stone label-icon align-middle fs-16 me-2"></i> Stake now
            </Button>
          </p>
        </div>
      </Row>
    );
  }

  const Earn = ({tokenId}) => {
    let earn = 0;
    rewardDetails.forEach((reward) => {
      if (reward.tokenId == tokenId) {
        const now = moment().unix();
        const stakingStartTime = Number(reward.stakingStartTime);
        const ratio = Number(rewardPerHour) / Math.pow(10, 18);

        earn = ((now - stakingStartTime) * ratio) / 3600;
      }
    });

    return (
      <React.Fragment>
        <h6 className="mb-1">{Number(earn).toFixed(3) } $SPAACE</h6>
      </React.Fragment>
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
    if (!tokenIdsStaked.length) {
      return;
    }
    unstake(tokenIdsStaked);
  }

  const unstakeSelected = () => {
    if (!tokenIdsToUnstake.length) {
      return;
    }
    unstake(tokenIdsToUnstake);
  }

  const unstake = (tokenIds) => {
    contractStaking.methods.claimAndUnstake(tokenIds).send({from: account})
      .then((res) => {
        const amount = Number(res.events.Claimed.returnValues.amount) / Math.pow(10, 18);
        const message = `${Number(amount).toFixed(3)} $SPAACE claimed`;
        notif('success', message);
        notif('success', `${tokenIds.length} NFT unstaked`);
        setHasNftsStaked(false);
        setAmountSpaace(0);
        setCountTokenStaked(0);
        dispatch(stakedLoading());
      })
      .catch((error) => {
        notif('danger', error.message);
      });
  }

  const onSelectUnstakedNFT = (e) => {
    const tokenIds = tokenIdsSelected;
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

  const onSelectStakedNFT = (e) => {
    const tokenIds = tokenIdsToUnstake;
    if (!tokenIds.includes(e.target.value)) {
      tokenIds.push(e.target.value);
    } else {
      const index = tokenIds.indexOf(e.target.value);
      if (index > -1) {
        tokenIds.splice(index, 1);
      }
    }
    setTokenIdsToUnstake(tokenIds);
  }

  const DisplayUnstakedNftGrid = () => {
    return (
      <React.Fragment>
        {nftUnstaked.map((legend, key) => (
          <Col key={key} xs={4} sm={4} md={3} lg={2} xl={2} xxl={2}>
            <input ref={(element) => { ref.current[key] = element}}
              type="checkbox" name="tokenIds"
              id={`legend-${legend.tokenId}`} className="visually-hidden" value={legend.tokenId}
              onChange={onSelectUnstakedNFT} />
            <label htmlFor={`legend-${legend.tokenId}`} >
              <img className="img-fluid" src={legend.media.thumbnailUrl ?? legend.media.originalUrl} alt="" />
            </label>
          </Col>
        ))}
      </React.Fragment>
    );
  }

  const staking = async () => {
    if (tokenIdsSelected.length === 0) {
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
    contractStaking.methods.stake(tokenIdsSelected).send({ from: account })
      .then((res: any) => {
        notif('success', `${tokenIdsSelected.length} NFT ML Staked`);
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

  const UnstakedNFTsModal = () => {
    if (loading) {
      return (
        <Modal size="md" isOpen={modal} contentClassName="stakinginprogress">
          <ModalHeader className="modal-title">
            Staking Meta-Legends NFT in progress
          </ModalHeader>
          <ModalBody >
            <div className="loader-overlay">
              <Spinner color="primary" />
            </div>
          </ModalBody>
        </Modal>
      );
    }

    return (
      <Modal size="xl" isOpen={modal} toggle={toogleModal} >
        <ModalHeader className="modal-title" toggle={() => {toogleModal();}}>
          Meta-Legends NFT unstaked
        </ModalHeader>
        <ModalBody>
          <Row>
            <DisplayUnstakedNftGrid />
          </Row>
        </ModalBody>
        <div className="modal-footer">
          <Link to="#" className="btn btn-link link-success fw-medium" onClick={() => toogleModal()}><i className="ri-close-line me-1 align-middle"></i> Cancel</Link>
          <Button color="primary" className="btn-sm waves-effect waves-light w-xs me-2" onClick={Checked} >Select all</Button>
          <Button color="primary" className="btn-sm waves-effect waves-light w-xs me-2" onClick={Unchecked} >Unselect all</Button>
          <Button color="primary" className="btn-sm waves-effect waves-light w-xs me-2" onClick={staking} >Stake</Button>
        </div>
      </Modal>
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
    if ((tokenStaked && !tokenStaked.length) && !noStakingAlreadyLoad) {
      dispatch(stakedLoading());
      setTokenIdsStaked(tokenStaked);
      setNoStakingAlreadyLoad(true);
    }
  }, [dispatch, tokenStaked]);

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

    getWeb3Data(MlContract[ENV_STAKING], CHAIN_ID).then((res) => {
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
    </React.Fragment>
  );
}

export default MetaLegends;
