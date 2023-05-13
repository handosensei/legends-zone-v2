import React, {useEffect, useState} from 'react';
import { Card, CardBody, CardHeader, Col } from 'reactstrap';
import assetImgArmor from '../../assets/images/metalegends/staked-asset/ArmorRough.png';
import assetImgPet from '../../assets/images/metalegends/staked-asset/HeavyPetRough.png';
import assetImgVehicle from '../../assets/images/metalegends/staked-asset/GoldboiCar.png';
import assetImgResidence from '../../assets/images/metalegends/staked-asset/Residence.png';
import assetImgLand from '../../assets/images/metalegends/staked-asset/Lands.png';
import ModalAssetStaked from "./ModalAssetStaked";

const AssetStaked = ({perkPackages, totalTokenRewards}) => {
  const [, setTotalTokenRewards] = useState(totalTokenRewards);
  const [assets, setAssets] = useState([]);
  const [, setPerkPackages] = useState(perkPackages);

  const defineAssets = () => {
    if (!(perkPackages && perkPackages.armor)) {
      return;
    }

    const result = [
      {
        label: 'Armors',
        img: assetImgArmor,
        tokens: perkPackages.armor.tokens,
        quantity: perkPackages.armor.quantity,
      }, {
        label: 'Pets',
        img: assetImgPet,
        tokens: perkPackages.pet.tokens,
        quantity: perkPackages.pet.quantity,
      }, {
        label: 'Vehicles',
        img: assetImgVehicle,
        tokens: perkPackages.vehicle.tokens,
        quantity: perkPackages.vehicle.quantity,
      }, {
        label: 'Residences',
        img: assetImgResidence,
        tokens: perkPackages.residence.tokens,
        quantity: perkPackages.residence.quantity,
      },{
        label: 'Lands',
        img: assetImgLand,
        tokens: perkPackages.land.tokens,
        quantity: perkPackages.land.quantity,
      }
    ];
    setAssets(result);
  }

  useEffect(() => {
    setPerkPackages(perkPackages);
    setTotalTokenRewards(totalTokenRewards);
    defineAssets();
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