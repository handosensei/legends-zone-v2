import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
  Row, NavItem, NavLink, Nav, TabPane, TabContent
} from 'reactstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import {getHolderHoldingRewards, getHolderLegends, getUser} from "../../client/ApiMetaLegends";
import ReactApexChart from "react-apexcharts";
import {getContractHealingDrone, getContractHoldingRewards} from "../../client/Contracts";
import getChartColorsArray from "../../Components/Common/ChartsDynamicColor";
import {Link} from "react-router-dom";
import moment from "moment/moment";
import List from 'list.js';

const Holder = () => {

  document.title = "Holder | Legends Zone";

  const [isLoad, setIsLoad] = useState(false);
  const [holderWallet, setHolderWallet] = useState(null);
  const [holderLegends, setHolderLegends] = useState([]);
  const [series, setSeries] = useState([]);

  const estimateQuantity = async (wallet) => {
    const holdingRewards = [
      { tokenId: 1, code:'cyber-weapon', quantity: 0, quantitySaved: 0},
      { tokenId: 2, code:'cyber-armor', quantity: 0, quantitySaved: 0},
      { tokenId: 3, code:'rough-pet', quantity: 0, quantitySaved: 0},
      { tokenId: 4, code:'roboter-weapon', quantity: 0, quantitySaved: 0},
      { tokenId: 5, code: 'matrix-angel-car', quantity: 0, quantitySaved: 0},
      { tokenId: null, code: 'healing-drone', quantity: 0, quantitySaved: 0},
      { tokenId: 6, code: 'ml-network-pass', quantity: 0, quantitySaved: 0},
      { tokenId: 7, code: 'particles-cosmetic-effect', quantity: 0, quantitySaved: 0},
      { tokenId: 8, code: 'shadow-gem', quantity: 0, quantitySaved: 0},
    ];
    const legends = await getHolderLegends(wallet);
    console.log(legends);
    setHolderLegends(legends);
    legends.forEach((legend) => {
      holdingRewards.forEach((holdingReward) => {
        if (legend.holdingRewards[holdingReward.code] === true) {
          holdingReward.quantity++;
        }
      });
    });

    const rewardsSaved = await getHolderHoldingRewards(wallet);
    const contract = await getContractHoldingRewards();
    const contractHealingDrone = await getContractHealingDrone();

    holdingRewards.forEach((holdingReward) => {
      holdingReward.quantitySaved = rewardsSaved[holdingReward.code].length;
    });

    const res = await contract.methods.holderEligibilities(wallet, 1).call();
    holdingRewards[0]['total'] = Number(res.total);
    holdingRewards[0]['claimed'] = Number(res.claimed);
    const res1 = await contract.methods.holderEligibilities(wallet, 2).call();
    holdingRewards[1]['total'] = Number(res1.total);
    holdingRewards[1]['claimed'] = Number(res1.claimed);
    const res2 = await contract.methods.holderEligibilities(wallet, 3).call();
    holdingRewards[2]['total'] = Number(res2.total);
    holdingRewards[2]['claimed'] = Number(res2.claimed);
    const res3 = await contract.methods.holderEligibilities(wallet, 4).call();
    holdingRewards[3]['total'] = Number(res3.total);
    holdingRewards[3]['claimed'] = Number(res3.claimed);
    const res4 = await contract.methods.holderEligibilities(wallet, 5).call();
    holdingRewards[4]['total'] = Number(res4.total);
    holdingRewards[4]['claimed'] = Number(res4.claimed);
    const res5 = await contractHealingDrone.methods.eligibilities(wallet).call();
    holdingRewards[5]['total'] = Number(res5.total);
    holdingRewards[5]['claimed'] = Number(res5.claimed);
    const res6 = await contract.methods.holderEligibilities(wallet, 6).call();
    holdingRewards[6]['total'] = Number(res6.total);
    holdingRewards[6]['claimed'] = Number(res6.claimed);
    const res7 = await contract.methods.holderEligibilities(wallet, 7).call();
    holdingRewards[7]['total'] = Number(res7.total);
    holdingRewards[7]['claimed'] = Number(res7.claimed);
    const res8 = await contract.methods.holderEligibilities(wallet, 8).call();
    holdingRewards[8]['total'] = Number(res8.total);
    holdingRewards[8]['claimed'] = Number(res8.claimed);

    const data = {
      eligibility: [],
      saved: [],
      claimable: [],
      minted: [],
    }

    holdingRewards.forEach((holdingReward) => {
      data.eligibility.push(holdingReward.quantity);
      data.saved.push(holdingReward.quantitySaved);
      data.claimable.push(holdingReward.total);
      data.minted.push(holdingReward.claimed);
    });

    return [
      {
        name: "Eligibility",
        data: data.eligibility,
      },
      {
        name: "Saved",
        data: data.saved,
      },
      {
        name: "Claimable",
        data: data.claimable,
      },
      {
        name: "Minted",
        data: data.minted,
      },
    ];
  }
  var chartGroupbarColors = getChartColorsArray('["--vz-primary", "--vz-secondary", "--vz-success", "--vz-info"]');
  var options = {
    chart: {
      type: 'bar',
      height: 500,
      toolbar: {
        show: false,
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: 'top',
        },
      }
    },
    dataLabels: {
      enabled: true,
      offsetX: -6,
      style: {
        fontSize: '12px',
        colors: ['#fff']
      }
    },
    stroke: {
      show: true,
      width: 1,
      colors: ['#fff']
    },
    tooltip: {
      shared: true,
      intersect: false
    },
    xaxis: {
      categories: [
        'Cyber weapon',
        'Cyber armor',
        'Rough pet',
        'Roboter weapon',
        'Matrix-Angel car',
        'Healing drone',
        'ML Network pass',
        'Particles cosmetic effect',
        'Shadow gem'
      ],
    },
    colors: chartGroupbarColors
  };

  const MonthHolding = ({purchasedOnDate}) => {
    const now = moment();
    const purchasedOn = moment(purchasedOnDate);

    const monthsDiff = now.diff(purchasedOn, 'months');

    if (monthsDiff <= 1) {
      return (<p className="text-muted mb-0">{monthsDiff} month</p>)
    }

    return (<p className="text-muted mb-0">{monthsDiff} months</p>)
  }

  const handleChange = (event) => {
    const wallet = event.target.value.toLowerCase().trim();
    if (wallet === '') {
      setHolderWallet(null);
    }

    if (wallet.length === 42 && wallet !== holderWallet) {
      setIsLoad(true);
      setHolderWallet(wallet);
      estimateQuantity(wallet).then((res) => {
        setSeries(res)
      });

      setIsLoad(false);

      /*
      0x6a166a77aecbcb188dfe23440bbfc85ee806f031
      0xeAbce3a39AE018021B17cF7BA1B454Ed1Bd52c94
          test if holder
          - list mint package
          - list og pet
          - list og vehicle
          - ok list LZ rewards

          list asset
          - list ML
          - list council
          - list og armor
          - list og pet
          - list og vehicle
       */
    }
  };

  useEffect(() => {
    
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Holders" pageTitle="Home" />
          <Row>
            <Col>
              <div className="input-group mb-4">
                <span className="input-group-text" id="inputGroup-sizing-sm">Holder wallet</span>
                <Input type="text" className="form-control" aria-describedby="inputGroup-sizing-default"
                       onChange={handleChange} />
              </div>
            </Col>
          </Row>

          {isLoad ?
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div> : ''
          }

          { holderWallet !== null && holderWallet !== '' ?
            // <Row>
            //   <Col>
            //     <Card>
            //       <CardBody>{holderWallet}</CardBody>
            //     </Card>
            //   </Col>
            // </Row>
            // <Details holderWallet={holderWallet}/>

            <Row>

              <Col xxl={6}>
                <Card>
                  <CardHeader>
                    <h4 className="card-title mb-0">Holding rewards</h4>
                  </CardHeader>
                  <CardBody>
                    {/*<BarGraph holderWallet={holderWallet} dataColors='["--vz-primary", "--vz-secondary", "--vz-success", "--vz-info"]'/>*/}
                    <ReactApexChart
                      dir="ltr"
                      className="apex-charts"
                      options={options}
                      series={series}
                      type="bar"
                      height={510}
                    />
                  </CardBody>
                </Card>
              </Col>

              <Col xxl={6}>
                <Card>
                  <CardHeader>
                    <h4 className="card-title mb-0">Meta-Legends Collection</h4>
                  </CardHeader>
                  <CardBody>
                    <div id="customerList">

                      <div className="table-responsive table-card mt-3 mb-1">
                        <table className="table align-middle table-nowrap" id="customerTable">
                          <thead className="table-light">
                          <tr>
                            <th></th>
                            <th className="sort" data-sort="token">Token</th>
                            <th className="sort" data-sort="purchaseOn">Purchased on</th>
                            <th className="sort" data-sort="date">Hold since</th>
                          </tr>
                          </thead>
                          <tbody className="list form-check-all">
                          {holderLegends.map((legend, key) => (
                            <tr key={key}>
                              <td className="id">
                                <img className="image avatar-xs rounded-circle" src={legend.media.thumbnail} alt={`Legend #${legend.tokenId}`} />
                              </td>
                              <td className="name">
                                <span className="text-secondary">#{legend.tokenId}</span>
                              </td>
                              <td>
                                {legend.purchasedOn}
                              </td>
                              <td>
                                <MonthHolding purchasedOnDate={legend.purchasedOn} />
                              </td>
                            </tr>
                          ))}

                          </tbody>
                        </table>
                        <div className="noresult" style={{ display: "none" }}>
                          <div className="text-center">
                            <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop"
                                       colors="primary:#121331,secondary:#08a88a" style={{ width: "75px", height: "75px" }}>
                            </lord-icon>
                            <h5 className="mt-2">Sorry! No Result Found</h5>
                            <p className="text-muted mb-0">We've searched more than 150+ Orders We did not find any
                              orders for you search.</p>
                          </div>
                        </div>
                      </div>

                      <div className="d-flex justify-content-end">
                        <div className="pagination-wrap hstack gap-2">
                          <Link className="page-item pagination-prev disabled" to="#">
                            Previous
                          </Link>
                          <ul className="pagination listjs-pagination mb-0"></ul>
                          <Link className="page-item pagination-next" to="#">
                            Next
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
                {/*<Card>*/}
                {/*  <CardHeader>*/}
                {/*    <h4 className="card-title mb-0">Meta-Legends</h4>*/}
                {/*  </CardHeader>*/}
                {/*  <CardBody>*/}

                {/*  </CardBody>*/}
                {/*</Card>*/}
              </Col>

            </Row>
            : ''
          }

          {/*{ holderWallet !== null ? <Details holderWallet={holderWallet}/> : '' }*/}

        </Container>
      </div>
    </React.Fragment>
  );
}

export default Holder;
