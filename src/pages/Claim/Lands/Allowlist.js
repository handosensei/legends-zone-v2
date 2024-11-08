import React, { useState } from 'react';
import {Card, CardBody, Col} from "reactstrap";
import * as moment from "moment/moment";

const Allowlist = ({contract, account}) => {

  const [tiers, setTiers] = useState(0);
  const [holderTiers, setHolderTiers] = useState(0);
  const [openAt, setOpenAt] = useState(0);
  const [eligibility, setEligibility] = useState(0);
  const [minted, setMinted] = useState(0);
  const [remaining, setRemaining] = useState(0);

  const Eligibility = () => {
    if (contract === null) {
      return;
    }
    contract.methods.allowlist(account).call().then((res) => {
      setEligibility(res['total']);
      setMinted(res['claimed']);
      setRemaining(res['total'] - res['claimed']);
    });

    return (
      <Card>
        <CardBody>
          <div className="d-flex align-items-center">
            <div className="flex-grow-1">
              <p className="text-uppercase fw-medium mb-0 text-muted">Minted / Eligibility</p>
            </div>
          </div>

          <div className="d-flex align-items-center">
            <div className="flex-shrink-0">
              <i className="display-6 text-muted ri-fingerprint-line"></i>
            </div>

            <div className="flex-grow-1 ms-3">
              <h2 className="mb-0">
                <span className="counter-value">{minted} / {eligibility}</span>
              </h2>
              <p className="mb-0 text-muted">Remaining: {remaining}</p>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }

  const Status = () => {
    if (holderTiers <= tiers) {
      return <h5 className="fs-14 mb-0 text-success">
        <i className="fs-13 align-middle"></i> Open
      </h5>
    }

    return (
      <h5 className="fs-14 mb-0 text-danger">
        <i className="fs-13 align-middle"></i> Wait
      </h5>
    )
  }

  const Queue = () => {
    if (contract == null) {
      return;
    }

    if (remaining === 0) {
      return;
    }

    contract.methods.getTiers().call().then((res) => setTiers(res));
    contract.methods.holderTiers(account).call().then((res) => {
      setHolderTiers(res);
      contract.methods.opening(res).call().then((res) => {
        setOpenAt(res*1000);
      });
    });

    return (
      <Card>
        <CardBody>
          <div className="d-flex align-items-center">
            <div className="flex-grow-1">
              <p className={"text-uppercase fw-medium mb-0 text-muted"}>Your queue position</p>
            </div>
            <div className="flex-shrink-0">
              <Status />
            </div>
          </div>

          <div className="d-flex align-items-center">
            <div className="flex-shrink-0">
              <i className="display-6 text-muted ri-focus-3-line"></i>
            </div>

            <div className="flex-grow-1 ms-3">
              <h2 className="mb-0">
                <span className="counter-value">{holderTiers}</span>
              </h2>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }

  const CurrentQueue = () => {
    return (
      <Card>
        <CardBody>
          <div className="d-flex align-items-center">
            <div className="flex-grow-1">
              <p className={"text-uppercase fw-medium mb-0 text-muted"}>Current queue</p>
            </div>
          </div>

          <div className="d-flex align-items-center">
            <div className="flex-shrink-0">
              <i className="display-6 text-muted ri-file-list-3-line"></i>
            </div>

            <div className="flex-grow-1 ms-3">
              <h2 className="mb-0">
                <span className="counter-value">{tiers}</span>
              </h2>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }

  const MintOn = () => {
    if (holderTiers <= tiers && remaining > 0) {
      return (
        <>
          <Mintable />
        </>
      );
    }

    return (
      <Card>
        <CardBody>
          <div className="d-flex align-items-center">
            <div className="flex-grow-1">
              <p className={"text-uppercase fw-medium mb-0 text-muted"}>Open at</p>
            </div>
          </div>

          <div className="d-flex align-items-center">
            <div className="flex-shrink-0">
              <i className="display-6 text-muted ri-calendar-check-line"></i>
            </div>

            <div className="flex-grow-1 ms-3">
              <h2 className="mb-0">
                <span className="fs-5 text-white-75">{moment(openAt).format('lll')}</span>
              </h2>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }

  const Mintable = () => {
    return (
      <Card>
        <CardBody>
          <div className="d-flex align-items-center">
            <div className="flex-grow-1">
              <p className={"text-uppercase fw-medium mb-0 text-muted"}>You can mint</p>
            </div>
          </div>

          <div className="d-flex align-items-center">
            <div className="flex-shrink-0">
              <i className="display-6 text-muted ri-emotion-happy-fill"></i>
            </div>

            <div className="flex-grow-1 ms-3">
              <h2 className="mb-0">
                <span className="fs-1 text-white-75">Enjoy !</span>
              </h2>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <React.Fragment>
      <Col xxl={3}>
        <Eligibility />
      </Col>
      <Col xxl={3}>
        <CurrentQueue />
      </Col>
      <Col xxl={3}>
        <Queue />
      </Col>
      <Col xxl={3}>
        <MintOn />
      </Col>
    </React.Fragment>
  );
}

export default Allowlist;
