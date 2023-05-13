import React, {useState} from 'react';

import {Button, Modal, ModalBody, ModalHeader} from 'reactstrap';

const ModalUnstakedAsset = () => {

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
    <Modal id="modalUnstakedAsset" isOpen={modal_standard} toggle={() => {
      tog_standard();
    }}>

      <ModalHeader className="modal-title" id="myModalLabel" toggle={() => {
        tog_standard();
      }}>
        Unstaked assets
      </ModalHeader>

      <ModalBody>
        <p className="text-muted">
          Participate in 🏅 games-announcements or 🎁 giveaway
        </p>
        <p className="text-muted"><a href="https://discord.com/channels/889533275545149440/1020275734641651744/1064598939128561754" target="_blank">-> Go to post discord</a></p>
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

export default ModalUnstakedAsset;
