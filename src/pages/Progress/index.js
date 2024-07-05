import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import AssetStaked from "./AssetStaked";
import BadgeReward from "./BadgeReward";
import AssetUnstaked from "./AssetUnstaked";
import HoldingReward from "./HoldingReward";
import LegendaryStone from './LegendaryStone';
import {getRewardsEstimate} from "../../client/ApiMetaLegends";

const Progress = () => {

  const [rewardBadge, setRewardBadge] = useState({});
  const [totalTokenRewards, setTotalTokenRewards] = useState(0);
  const [perkPackages, setPerkPackages] = useState({});
  const [unstaked, setUnstaked] = useState({})
  const [legends, setLegends] = useState([])

  useEffect(() => {

    const fetchData = async () => {
      const response = await getRewardsEstimate();
      setPerkPackages(response.rewards.token.perkPackages);
      setTotalTokenRewards(response.rewards.token.totalTokenRewards);
      setUnstaked(response.rewards.unstaked);
      setRewardBadge(response.rewards.badge);
      setLegends(response.rewards.legend);
    }

    if (sessionStorage.getItem("authUser")) {
      fetchData();
    }
  }, []);

  document.title = "Progress | Legends Zone";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Progress" pageTitle="Dashboards"/>
          <Row>
            <Col>
              <div className="h-100">
                <Row>
                  <BadgeReward rewardBadge={rewardBadge} />
                  <AssetStaked perkPackages={perkPackages} totalTokenRewards={totalTokenRewards}/>
                  <AssetUnstaked unstaked={unstaked} />
                </Row>
                <Row>
                  <LegendaryStone legends={legends} />
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default Progress;
