import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import {getLandWishes} from "../../client/ApiMetaLegends";
import {LANDS_IMG} from "../../enum/LandImages";
import {Container} from "reactstrap";

const LandImage = () => {
  const { id } = useParams(); // Récupérer l'ID à partir de l'URL
  const [land, setLand] = useState(null);
  const [className, setClassName] = useState(null);
  const [area, setArea] = useState(null);

  useEffect(() => {
    if (land === null) {
      getLandWishes(id).then(landResponse => {
        setLand(landResponse);
        setClassName(landResponse.land.class);
        setArea(landResponse.land.area);
      });
    }
  });

  const Display = () => {
    if (className !== null && area !== null) {
      return (
        <React.Fragment>
          <img src={LANDS_IMG[className][area]} className="img-fluid" alt="Responsive image" />
        </React.Fragment>
      )
    }

    return (<React.Fragment></React.Fragment>)
  }
  return (
    <React.Fragment>

          <Display />
      
    </React.Fragment>
  );
};

export default LandImage;
