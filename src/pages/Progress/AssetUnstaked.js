import React, {useEffect, useState} from 'react';

import SniperRough from "../../assets/images/metalegends/unstaked-asset/SniperRough.png";
import ArmorRough from "../../assets/images/metalegends/unstaked-asset/ArmorRough.png";
import HeavyPetRough from "../../assets/images/metalegends/unstaked-asset/HeavyPetRough.png";
import GoldboiCar from "../../assets/images/metalegends/unstaked-asset/GoldboiCar.png";
import Residence from "../../assets/images/metalegends/unstaked-asset/Residence.png";
import Lands from "../../assets/images/metalegends/unstaked-asset/Lands.png";
import {Card, CardBody, CardHeader, Col} from "reactstrap";
import ModalUnstakedAsset from "./ModalUnstakedAsset";

const AssetUnstaked = ({unstaked}) => {

  const [unstakedWeapons, setUnstakedWeapons] = useState(0);
  const [unstakedArmors, setUnstakedArmors] = useState(0);
  const [unstakedPets, setUnstakedPets] = useState(0);
  const [unstakedVehicles, setUnstakedVehicles] = useState(0);
  const [unstakedResidences, setUnstakedResidences] = useState(0);
  const [unstakedLands, setUnstakedLands] = useState(0);
  const [assets, setAssets] = useState([]);

  const defineUnstakedAssets = () => {

    const data = [
      { label: 'Weapons', quantity: unstakedWeapons, img: SniperRough },
      { label: 'Armors', quantity: unstakedArmors, img: ArmorRough },
      { label: 'Pets', quantity: unstakedPets, img: HeavyPetRough },
      { label: 'Vehicles', quantity: unstakedVehicles, img: GoldboiCar },
      { label: 'Residences', quantity: unstakedResidences, img: Residence },
      { label: 'Lands', quantity: unstakedLands, img: Lands },
    ];

    if (Object.keys(unstaked).length > 0) {
      data[0]['quantity'] = unstaked.weapon;
      data[1]['quantity'] = unstaked.armor;
      data[2]['quantity'] = unstaked.pet;
      data[3]['quantity'] = unstaked.vehicle;
      data[4]['quantity'] = unstaked.residence;
      data[5]['quantity'] = unstaked.land;
    }

    setAssets(data);
  }

  useEffect(() => {
    defineUnstakedAssets(unstaked);
  }, [unstaked]);

  return (
    <React.Fragment>
      <Col xl={4}>
        <Card className="card-height-100">
          <CardHeader className="align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">Unstaked assets</h4>
            <ModalUnstakedAsset />
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
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </CardBody>

        </Card>
      </Col>

    </React.Fragment>
  );
}

export default AssetUnstaked;