import React, {useEffect, useRef, useState} from 'react';
import {Link} from "react-router-dom";

const LinkProjectFileUrl = ({object}) => {

  const DisplayLink = ({object}) => {
    if (object.projectFileUrl === '') {
      return (
        <button type="button" className="btn btn-light btn-sm">
          <i className="lab la-codepen align-middle lh-1"></i>
        </button>
      );
    }

    return (
      <Link to={object.projectFileUrl} target="_blank" className="btn btn-outline-success btn-sm link-success">
        <i className="lab la-codepen align-middle lh-1"></i>
      </Link>
    );
  }

  return (
    <React.Fragment>
      <DisplayLink object={object} />
    </React.Fragment>
  );
}

export default LinkProjectFileUrl;
