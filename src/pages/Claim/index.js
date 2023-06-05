import React, {useEffect, useState} from 'react';
import { Card, CardBody, Col, Container, Row} from 'reactstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import PetsPlayer from "./PetsPlayer";
import EligibilityOgPet from "./EligibilityOgPet";
import {getEligibilityOgPets, getMintOrderOgPets} from "../../client/ApiMetaLegends";
import 'video.js/dist/video-js.css';
import MintOgPetOrder from "./MintOgPetOrder";

const Claim = () => {
  const [mintOrders, setMintOrders] = useState([]);
  const [ogPet, setOgPet] = useState({});
  const [screenSizePlayer, setScreenSizePlayer] = useState(9);
  const [countRandomMint, setCountRandomMint] = useState(0);
  const [countSpecificMint, setCountSpecificMint] = useState(0);

  document.title = "Claim \"OG Pets\" | Legends Zone";

  const DiplayMintOrder = () => {
    if (countSpecificMint === 0) {
      return (<></>);
    }

    if (countSpecificMint > 1 || (countSpecificMint > 0 && countRandomMint > 0)) {
      return (
        <>
          <MintOgPetOrder mintOrders={mintOrders} />
        </>
      );
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const ogPetData = await getEligibilityOgPets();
      setOgPet(ogPetData);

      const countRandom = ogPetData.og + ogPetData.mint;
      setCountRandomMint(countRandom);

      const countSpecific = ogPetData.council + ogPetData.guardian + ogPetData.honorary + ogPetData.judge + ogPetData.whale;
      setCountSpecificMint(countSpecific);
      if (countRandom > 0 && countSpecific > 0) {
        setScreenSizePlayer(7);
      }

      const mintOrderData = await getMintOrderOgPets();
      setMintOrders(mintOrderData);
    }

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="OG Pets" pageTitle="Claim"/>
          <Row>

            <Col xl={screenSizePlayer}>
              <Card>
                <CardBody>
                  <div className="ratio ratio-16x9">
                    <PetsPlayer />
                  </div>
                </CardBody>
              </Card>
            </Col>

            <DiplayMintOrder />

            <EligibilityOgPet ogPet={ogPet}/>

          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Claim;
