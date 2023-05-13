import React, { useState } from 'react';

import {Button, Modal, ModalBody, ModalHeader} from 'reactstrap';

const ModalAssetStaked = () => {

  const [modal_standard, setmodal_standard] = useState(false);
  function tog_standard() {
    setmodal_standard(!modal_standard);
  }

  return (
  <>
    <div className="flex-shrink-0">
      <button type="button" className="btn btn-soft-info btn-sm" onClick={() => tog_standard()}>
        <i className="ri-questionnaire-line align-middle"></i>
      </button>
    </div>
    <Modal id="modalAssetStaked" isOpen={modal_standard} toggle={() => { tog_standard(); }} >

      <ModalHeader className="modal-title" id="myModalLabel" toggle={() => { tog_standard(); }}>
        How to become eligible
      </ModalHeader>

      <ModalBody>
        <h5 className="fs-15">You had to have minted</h5>
        <p className="text-muted">
          <ul>
            <li>0.5 ETH: Armor package</li>
            <li>1 ETH: Pet package</li>
            <li>1.5 ETH: Vehicle package</li>
            <li>2 ETH: Residence package</li>
            <li>2.5 ETH: Land package</li>
          </ul>
        </p>
        <p className="text-muted"><a href="https://medium.com/@metalegends/meta-legends-public-mint-11th-december-86353b5dd7c0" target="_blank" rel="noopener">@medium</a></p>
      </ModalBody>

      <div className="modal-footer">
        <Button color="light" onClick={() => { tog_standard(); }} >Close</Button>
      </div>

    </Modal>
  </>
  );
}

export default ModalAssetStaked;
