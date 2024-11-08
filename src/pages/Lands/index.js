import React, {useEffect, useState} from 'react';
import {getAllLandWishes} from "../../client/ApiMetaLegends";
import {Card, CardBody, CardHeader, Col, Container, Input, Label, Row, Table} from "reactstrap";
import {Link} from "react-router-dom";

const Lands = () => {

  const [landWishes, setLandWishes] = useState([]);

  useEffect( () => {
      if (landWishes.length === 0) {
        getAllLandWishes().then((res) => {
          setLandWishes(res);
        });
      }
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col>
              <Card>
                <CardHeader className="align-items-center d-flex">
                  <h4 className="card-title mb-0 flex-grow-1">Land minted and location choosen</h4>
                </CardHeader>
                <CardBody>
                  <div className="live-preview">
                    <div className="table-responsive">
                      <Table className="align-middle table-nowrap mb-0 table-hover">
                        <thead>
                        <tr>
                          <th scope="col">Token ID</th>
                          <th scope="col">Class</th>
                          <th scope="col">Location choosen</th>
                          <th scope="col">Minted by</th>
                          <th scope="col">Marketplace</th>

                        </tr>
                        </thead>
                        <tbody>
                        {landWishes.map((landWish, key) => (
                          <tr key={key}>
                            <td>{landWish.tokenId}</td>
                            <td>{landWish.land.class.toUpperCase()}</td>
                            <td>Area {landWish.land.area}</td>
                            <td>{landWish.user.wallet}</td>
                            <td><Link to="#" className="link-success">OpenSea <i className="ri-arrow-right-line align-middle"></i></Link></td>
                          </tr>
                        ))}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

    </React.Fragment>
  );
}

export default Lands;
