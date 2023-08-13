import React, { useState } from 'react';

import {Button, Modal, ModalBody, ModalHeader} from 'reactstrap';

const ModalHoldingReward = () => {

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
    <Modal id="modalHoldingReward" isOpen={modal_standard} toggle={() => { tog_standard(); }} >

      <ModalHeader className="modal-title" id="myModalLabel" toggle={() => { tog_standard(); }}>
        Holders rewards
      </ModalHeader>

      <ModalBody>
        <h5 className="fs-15">Reward per Legend</h5>
        <p className="text-muted">
          <ul>
            <li>Month 1 : Cyber Weapon</li>
            <li>Month 3 : Cyber Armor</li>
            <li>Month 6 : Rough Heavy Pet (Exclusive Skin)</li>
            <li>Month 9 : Roboter Weapon (Exclusive Skin)</li>
            <li>Month 12 : Matrix Angel Vehicule (Exclusive Skin)</li>
            <li>Month 15 : Healing Drone (Legend Zone exclusivity)</li>
            <li>Month 18 : ML Network pass</li>
            <li>Month 21 : Particles cosmetic effect</li>
            <li>Month 24 : Shadow gem</li>
          </ul>
        </p>
        <p className="text-muted"><a href="https://discord.com/channels/889533275545149440/1020275734641651744/1064598939128561754" target="_blank" rel="noreferrer">-> Go to post discord</a></p>
      </ModalBody>

      <div className="modal-footer">
        <Button color="light" onClick={() => { tog_standard(); }} >Close</Button>
      </div>

    </Modal>
  </>
  );
}

export default ModalHoldingReward;
