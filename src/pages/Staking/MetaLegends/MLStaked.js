import React from 'react';
import {Card, CardBody, Col, Row, CardFooter} from "reactstrap";
import moment from "moment";

const MLStaked = ({NFTsStaked, rewardDetails, rewardsPerHour}) => {

  const Earn = ({tokenId}) => {
    let earn = 0;
    rewardDetails.forEach((reward) => {
      if (reward.tokenId == tokenId) {
        const now = moment().unix();
        const stakingStartTime = Number(reward.stakingStartTime);
        const ratio = Number(rewardsPerHour) / Math.pow(10, 18);

        earn = ((now - stakingStartTime) * ratio) / 3600;
      }
    });

    return (
      <React.Fragment>
        <h6 className="mb-1">{Number(earn).toFixed(3) } $SPAACE</h6>
      </React.Fragment>
    );
  }

  return (
    <Row>
      {NFTsStaked.map((nft, key) => (
        <Col xs={6} sm={4} md={3} xl={2} xxl={1} key={key}>
          <Card>
            <CardBody>
              <h6>ML <span className="text-secondary">#{nft.tokenId}</span></h6>
            </CardBody>
            <img className="img-fluid" src={nft.image.thumbnailUrl ?? nft.image.originalUrl} alt={`Legend #${nft.tokenId}`} />
            <CardFooter>
              <h6 className="mb-1 text-muted">Earn</h6>
              <Earn tokenId={nft.tokenId} />
            </CardFooter>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default MLStaked;
