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
  const [, setUnstaked] = useState(unstaked);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    setUnstaked(unstaked);
    const data = [
      { label: 'Weapons', quantity: unstaked.weapon, img: SniperRough },
      { label: 'Armors', quantity: unstaked.armor, img: ArmorRough },
      { label: 'Pets', quantity: unstaked.pet, img: HeavyPetRough },
      { label: 'Vehicles', quantity: unstaked.vehicle, img: GoldboiCar },
      { label: 'Residences', quantity: unstaked.residence, img: Residence },
      { label: 'Lands', quantity: unstaked.land, img: Lands },
    ];
    setAssets(data);
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