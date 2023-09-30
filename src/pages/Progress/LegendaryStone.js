import React, {useEffect, useState} from 'react';
import {Card, CardBody, CardHeader, Col} from "reactstrap";
import LegendaryStoneImg from "../../assets/images/metalegends/LegendaryStone.png";

const LegendaryStone = ({legends}) => {

  const [countLegendaryStone, setCountLegendaryStone] = useState(0);

  useEffect(() => {
  if (legends.length > 0) {
      setCountLegendaryStone(legends.length);
    }
  }, [legends]);

  return (
  <React.Fragment>
    <Col xl={4}>
      <Card className="card-height-100">
        <CardHeader className="align-items-center d-flex">
          <h4 className="card-title mb-0 flex-grow-1">Special NFTs Held</h4>
        </CardHeader>

        <CardBody>
          <div className="table-responsive table-card">
            <table className="table table-centered table-hover align-middle table-nowrap mb-0">
              <tbody>

                <tr>

                  <td>
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0 me-2">
                        <img src={LegendaryStoneImg} alt="" className="avatar-sm p-2" />
                      </div>
                      <div>
                        <h5 className="fs-14 my-1 fw-medium">Legendary stone</h5>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="mb-0">{countLegendaryStone}</p>
                    <span className="text-muted">NFTs</span>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </Col>

  </React.Fragment>
  );
}

export default LegendaryStone;