import React, { useState } from "react";
import { Button, Card, CardBody, CardHeader, Col, Input, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import Hold_WeaponCyber from "../../../assets/images/metalegends/holding-reward/WeaponCyber.png";
import Hold_ArmorCyber from "../../../assets/images/metalegends/holding-reward/ArmorCyber.png";
import Hold_PetRough from "../../../assets/images/metalegends/holding-reward/PetRough.png";
import Hold_WeaponRoboter from "../../../assets/images/metalegends/holding-reward/WeaponRoboter.png";
import Hold_MatrixAngelCar from "../../../assets/images/metalegends/holding-reward/MatrixAngelCar.png";
import Hold_HealingDrone from "../../../assets/images/metalegends/holding-reward/HealingDrone.png";

const Reward = ({asset}) => {
  const [counter, setCounter] = useState(0);
  const [claimable, ] = useState(0);
  const [remainingToClaim, setRemainingToClaim] = useState(0);

  const claim = async () => {

  };

  const RemainingToClaim = () => {
    // todo
    const restToClaim = 0;
    if (restToClaim > 0) {
      return (<span className="text-success">{restToClaim}</span>)
    }
    return (
    <span className="text-muted">{restToClaim}</span>
    );
  }

  function countUp(prev_data_attr) {
    if (prev_data_attr < remainingToClaim && prev_data_attr < 10) {
      setCounter(prev_data_attr + 1);
    }
  }

  function countDown(prev_data_attr) {
    if (prev_data_attr >= 1) {
      setCounter(prev_data_attr - 1);
    }
  }

  const ClaimButton = () => {
    if (remainingToClaim > 0) {
      return (<button className="btn btn-primary" onClick={() => { claim(); }}>Claim</button>);
    }
    return (<button className="btn btn-light">Claim</button>);
  }

  const Quantity = ({quantity}) => {
    if (quantity === 0) {
      return (<span className="text-muted">{quantity}</span>)
    }

    return (<span className="text-white">{quantity}</span>)
  }

  return (

      <Card>

        <CardBody>
          <div className="d-flex mb-4 align-items-center">
            <div className="flex-shrink-0">
              <img src={asset.img} alt="" className="avatar-md rounded" />
            </div>
            <div className="flex-grow-1 ms-2 text-start">
              <h5 className="card-title mb-1">{asset.typeClass} {asset.item}</h5>
              <span className="text-muted">{asset.period}</span>
            </div>
          </div>

          <div className="list-group-item d-flex justify-content-between align-items-center">
            Eligibility
            <div className="flex-shrink-0">
              <Quantity quantity={asset.quantity} />
            </div>
          </div>
          <div className="list-group-item d-flex justify-content-between align-items-center">
            Claim saved
            <div className="flex-shrink-0">
              <Quantity quantity={asset.quantitySaved} />
            </div>
          </div>
          <div className="list-group-item d-flex justify-content-between align-items-center">
            Remaining to be claim
            <div className="flex-shrink-0">
              <RemainingToClaim />
            </div>
          </div>

          <div className="d-grid gap-2 mt-3">
            <div className="input-step full-width">
              <button type="button" className="minus" onClick={() => { countDown(counter); }} >
                –
              </button>
              <Input type="number" className="product-quantity" value={counter} min="0" max="20" readOnly />
              <button type="button" className="plus" onClick={() => { countUp(counter); }} >
                +
              </button>
            </div>
            <button className="btn btn-light">Max</button>
            <ClaimButton onClick={() => { claim(); }}/>
          </div>
        </CardBody>
      </Card>

  );
}

export default Reward;
