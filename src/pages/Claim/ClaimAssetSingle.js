import React, {useEffect, useState} from "react";
import {Card, CardBody, CardHeader, Col } from "reactstrap";

const ClaimAssetSingle = ({claimable, title, func, contract, account}) => {

  const [remainingToClaim, setRemainingToClaim] = useState(0);

  const getRemainingToClaimWhale = () => {
    if (contract.methods != undefined) {
      contract.methods.addressClaimbleWhale(account).call()
      .then((res) => {
        setRemainingToClaim(res);
      });
      return remainingToClaim;
    }
    return 0;
  }

  const getRemainingToClaimJudge = () => {
    if (contract.methods != undefined) {
      contract.methods.addressClaimbleJudge(account).call()
      .then((res) => {
        setRemainingToClaim(res);
      });
      return remainingToClaim;
    }
    return 0;
  }

  const getRemainingToClaimGuardian = () => {
    if (contract.methods != undefined) {
      contract.methods.addressClaimbleGuardian(account).call()
      .then((res) => {
        setRemainingToClaim(res);
      });
      return remainingToClaim;
    }
    return 0;
  }

  const getRemainingToClaimHonorary = () => {
    if (contract.methods != undefined) {
      contract.methods.addressClaimbleHonorary(account).call()
      .then((res) => {
        setRemainingToClaim(res);
      });
      return remainingToClaim;
    }
    return 0;
  }

  const getRemainingToClaim = () => {
    switch (func) {
      case 'whale':
        return getRemainingToClaimWhale();
      case 'judge':
        return getRemainingToClaimJudge();
      case 'guardian':
        return getRemainingToClaimGuardian();
      case 'honorary':
        return getRemainingToClaimHonorary();
      default:
        console.log(`Sorry, ${func} unknown.`);
    }
  }

  const mintWhale = async () => {
    if (contract.methods == undefined) {
      return;
    }
    contract.methods.mintWhale().send({ from: account })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log('Add item failed','Error');
      console.log(err)
    });
  }

  const mintJudge = async () => {
    if (contract.methods == undefined) {
      return;
    }
    contract.methods.mintJudge().send({ from: account })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log('Add item failed','Error');
      console.log(err)
    });
  }

  const mintGuardian = async () => {
    if (contract.methods == undefined) {
      return;
    }
    contract.methods.mintGuardian().send({ from: account })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log('Add item failed','Error');
      console.log(err)
    });
  }

  const mintHonorary = async () => {
    if (contract.methods == undefined) {
      return;
    }
    contract.methods.mintHonorary().send({ from: account })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log('Add item failed','Error');
      console.log(err)
    });
  }

  function claim() {
    switch (func) {
      case 'whale':
        mintWhale();
        break;
      case 'judge':
        mintJudge();
        break;
      case 'guardian':
        mintGuardian();
        break;
      case 'honorary':
        mintHonorary();
        break;
      default:
        console.log(`Sorry, ${func} unknown.`);
    }
  }

  const RemainingToClaim = () => {
    const restToClaim = getRemainingToClaim();
    if (restToClaim > 0) {
      return (<span className="text-success">{restToClaim}</span>)

    }
    return (
    <span className="text-muted">{restToClaim}</span>
    );
  }

  const ClaimButton = () => {
    if (remainingToClaim > 0) {
      return (<button className="btn btn-primary" onClick={() => { claim(); }}>Claim</button>);
    }

    return (<button className="btn btn-light">Claim</button>);
  }

  return (
    <Col xl="6">
      <Card>
        <CardHeader>{title}</CardHeader>
        <CardBody>
          <div className="list-group-item d-flex justify-content-between align-items-center">
            Eligible
            <div className="flex-shrink-0">
              <span className={claimable > 0 ? "text-success": "text-muted"}>{claimable}</span>
            </div>
          </div>

          <div className="list-group-item d-flex justify-content-between align-items-center">
            Remaining to be claim
            <div className="flex-shrink-0">
              <RemainingToClaim />
            </div>
          </div>

          <div className="d-grid gap-2 mt-3">
            <ClaimButton />
          </div>
        </CardBody>
      </Card>
    </Col>
  );
}

export default ClaimAssetSingle;
