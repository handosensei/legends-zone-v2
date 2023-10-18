import iconCelestial from "../../../assets/images/metalegends/faction/ico-celestial.png";
import iconBurner from "../../../assets/images/metalegends/faction/ico-burner.png";
import iconRoboter from "../../../assets/images/metalegends/faction/ico-roboter.png";
import iconGoldboi from "../../../assets/images/metalegends/faction/ico-goldboi.png";
import iconMatrixAngel from "../../../assets/images/metalegends/faction/ico-matrix-angel.png";
import iconCyber from "../../../assets/images/metalegends/faction/ico-cyber.png";
import iconRough from "../../../assets/images/metalegends/faction/ico-rough.png";
import React from "react";

const Rarity = () => {
  return (
  <div className="product-content mt-5">
    <h5 className="fs-14 mb-3">Rarity description :</h5>
    <div className="table-responsive">
      <table className="table align-middle table-nowrap mb-0">
        <tbody>
          <tr>
            <th scope="row">
              <div className="d-flex align-items-center">
                <img src={iconCelestial} alt="" className="avatar-sm rounded object-cover" />
                <span className="mb-0 ms-4">Celestial drone</span>
              </div>
            </th>
            <td>2%</td>
            <td>
              <div className="d-flex align-items-center">
                <img src={iconBurner} alt="" className="avatar-sm rounded object-cover" />
                <span className="mb-0 ms-4">Burner drone</span>
              </div>
            </td>
            <td>3%</td>
          </tr>
          <tr>
            <th scope="row">
              <div className="d-flex align-items-center">
                <img src={iconRoboter} alt="" className="avatar-sm rounded object-cover" />
                <span className="mb-0 ms-4">Roboter drone</span>
              </div>
            </th>
            <td>5%</td>
            <td>
              <div className="d-flex align-items-center">
                <img src={iconGoldboi} alt="" className="avatar-sm rounded object-cover" />
                <span className="mb-0 ms-4">Goldboi drone</span>
              </div>
            </td>
            <td>8%</td>
          </tr>
          <tr>
            <th scope="row">
              <div className="d-flex align-items-center">
                <img src={iconMatrixAngel} alt="" className="avatar-sm rounded object-cover" />
                <span className="mb-0 ms-4">Matrix-Angel drone</span>
              </div>
            </th>
            <td>16%</td>
            <td>
              <div className="d-flex align-items-center">
                <img src={iconCyber} alt="" className="avatar-sm rounded object-cover" />
                <span className="mb-0 ms-4">Cyber drone</span>
              </div>
            </td>
            <td>30%</td>
          </tr>
          <tr>
            <th scope="row">
              <div className="d-flex align-items-center">
                <img src={iconRough} alt="" className="avatar-sm rounded object-cover" />
                <span className="mb-0 ms-4">Rough drone</span>
              </div>
            </th>
            <td>35%</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  );
}

export default Rarity;