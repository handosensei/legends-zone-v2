import React, {useState} from 'react';

import {Button, Modal, ModalBody, ModalHeader} from 'reactstrap';

const ModalBadgeReward = () => {

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
    <Modal id="modalBadgeReward" isOpen={modal_standard} toggle={() => {
      tog_standard();
    }}>

      <ModalHeader className="modal-title" id="myModalLabel" toggle={() => {
        tog_standard();
      }}>
        Badges rewards
      </ModalHeader>

      <ModalBody>
        <h5 className="fs-15">depending on the total amount of Legends you hold</h5>
        <p className="text-muted">
          <ul>
            <li>(3 to 5) Legend investor : Rough Armor</li>
            <li>(6 to 10) Virtual conservative : Goldboi Weapon</li>
            <li>(11 to 21) Legendary Holder : Cyber Pet</li>
            <li>(21 to 50) Legend Museum : Goldboi Vehicle</li>
            <li>(51+) Legend Whale : Celestial Sniper</li>
          </ul>

        </p>
        <p className="text-muted"><a href="https://discord.com/channels/889533275545149440/1020275734641651744/1064598939128561754" target="_blank" rel="noopener">-> Go to post discord</a></p>
      </ModalBody>

      <div className="modal-footer">
        <Button color="light" onClick={() => {
          tog_standard();
        }}>Close</Button>
      </div>

    </Modal>
  </>
  );
}

export default ModalBadgeReward;
