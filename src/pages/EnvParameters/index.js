import React  from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Container, Row } from "reactstrap";

const EnvParameters = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Env params" pageTitle="Home"/>

          <Row>
            <ul>
              {Object.keys(process.env).map((key) => (
                <li key={key}>
                  {key}: {process.env[key]}
                </li>
              ))}
            </ul>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default EnvParameters;
