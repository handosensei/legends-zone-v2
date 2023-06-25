import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import PetsPlayer from "./PetsPlayer";
import {getEligibilityOgPets} from "../../client/ApiMetaLegends";
import 'video.js/dist/video-js.css';
import ClaimAsset from "./ClaimAsset";

const Claim = () => {

  const [ogPet, setOgPet] = useState({});

  document.title = "Claim \"OG Pets\" | Legends Zone";

  useEffect(() => {
    const fetchData = async () => {
      const ogPetData = await getEligibilityOgPets();
      setOgPet(ogPetData);
    }

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="OG Pets" pageTitle="Claim"/>
          <Row>

            <Col xl="6">
              <Card>
                <CardBody>
                  <div className="ratio ratio-16x9">
                    <PetsPlayer />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl="6">
              <Row>
                <ClaimAsset claimable={ogPet.whale} title="Top 10 Whale" func="test"/>
                <ClaimAsset claimable={ogPet.honorary} title="Honorary" func="test"/>
                <ClaimAsset claimable={ogPet.judge} title="Judge" func="test"/>
              </Row>
              <Row>
                <ClaimAsset claimable={ogPet.council} title="Council" func="test"/>
                <ClaimAsset claimable={ogPet.guardian} title="Guardian" func="test"/>
                <ClaimAsset claimable={ogPet.mint + ogPet.og} title="Perk package + OG" func="test"/>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Claim;
