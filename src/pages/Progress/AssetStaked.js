import React, {useEffect, useState} from 'react';
import { Card, CardBody, CardHeader, Col } from 'reactstrap';
import assetImgArmor from '../../assets/images/metalegends/staked-asset/ArmorRough.png';
import assetImgPet from '../../assets/images/metalegends/staked-asset/HeavyPetRough.png';
import assetImgVehicle from '../../assets/images/metalegends/staked-asset/GoldboiCar.png';
import assetImgResidence from '../../assets/images/metalegends/staked-asset/Residence.png';
import assetImgLand from '../../assets/images/metalegends/staked-asset/Lands.png';
import ModalAssetStaked from "./ModalAssetStaked";

const AssetStaked = ({perkPackages, totalTokenRewards}) => {
  const [, setTotalTokenRewards] = useState(0);
  const [assets, setAssets] = useState([]);

  const [tokenArmor, setTokenArmor] = useState(0);
  const [quantityArmor, setQuantityArmor] = useState(0);
  const [tokenPet, setTokenPet] = useState(0);
  const [quantityPet, setQuantityPet] = useState(0);
  const [tokenVehicle, setTokenVehicle] = useState(0);
  const [quantityVehicle, setQuantityVehicle] = useState(0);
  const [tokenResidence, setTokenResidence] = useState(0);
  const [quantityResidence, setQuantityResidence] = useState(0);
  const [tokenLand, setTokenLand] = useState(0);
  const [quantityLand, setQuantityLand] = useState(0);

  const defineAssets = (perkPackages) => {
    const result = [
      {
        label: 'Armors',
        img: assetImgArmor,
        tokens: tokenArmor,
        quantity: quantityArmor,
      }, {
        label: 'Pets',
        img: assetImgPet,
        tokens: tokenPet,
        quantity: quantityPet,
      }, {
        label: 'Vehicles',
        img: assetImgVehicle,
        tokens: tokenVehicle,
        quantity: quantityVehicle,
      }, {
        label: 'Residences',
        img: assetImgResidence,
        tokens: tokenResidence,
        quantity: quantityResidence,
      },{
        label: 'Lands',
        img: assetImgLand,
        tokens: tokenLand,
        quantity: quantityLand,
      }
    ];
    if (perkPackages && perkPackages.armor) {
      result[0]['quantity'] = perkPackages.armor.quantity;
      result[1]['quantity'] = perkPackages.pet.quantity;
      result[2]['quantity'] = perkPackages.vehicle.quantity;
      result[3]['quantity'] = perkPackages.residence.quantity;
      result[4]['quantity'] = perkPackages.land.quantity;

      result[0]['tokens'] = perkPackages.armor.tokens;
      result[1]['tokens'] = perkPackages.pet.tokens;
      result[2]['tokens'] = perkPackages.vehicle.tokens;
      result[3]['tokens'] = perkPackages.residence.tokens;
      result[4]['tokens'] = perkPackages.land.tokens;
    }
    setAssets(result);
  }

  useEffect(() => {

    setTotalTokenRewards(totalTokenRewards);
    console.log(perkPackages);
    defineAssets(perkPackages);
  }, [perkPackages, totalTokenRewards]);

  return (
  <React.Fragment>
    <Col xl={4}>
      <Card className="card-height-100">
        <CardHeader className="align-items-center d-flex">
          <h4 className="card-title mb-0 flex-grow-1">Assets Staked</h4>
          <ModalAssetStaked />
        </CardHeader>

        <CardBody>
          <div className="table-responsive table-card">
            <table className="table table-centered table-hover align-middle table-nowrap mb-0">
              <tbody>
              {assets.map((item, key) => (
              <tr key={key}>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 me-2">
                      <img src={item.img} alt="" className="avatar-sm p-2" />
                    </div>
                    <div>
                      <h5 className="fs-14 my-1 fw-medium">{item.label}</h5>
                    </div>
                  </div>
                </td>
                <td>
                  <p className="mb-0">{item.quantity}</p>
                  <span className="text-muted">NFT</span>
                </td>
                <td>
                  <p className="mb-0">$ {item.tokens}</p>
                  <span className="text-muted">METAL</span>
                </td>
              </tr>
              ))}
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 me-2">
                      {/*LOGO METAL*/}
                      {/*<img src={item.img} alt="" className="avatar-sm p-2" />*/}
                    </div>
                    <div>
                      <h5 className="fs-14 my-1 fw-medium">Total</h5>
                    </div>
                  </div>
                </td>
                <td>
                </td>
                <td>
                  <p className="mb-0">$ {totalTokenRewards}</p>
                  <span className="text-muted">METAL</span>
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
};

export default AssetStaked;