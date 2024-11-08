import React, {useEffect, useState} from 'react';
import {Accordion, AccordionItem, Collapse} from "reactstrap";
import classnames from "classnames";

const Faq = () => {

  const [faq1, setFaq1] = useState(true);
  const [faq2, setFaq2] = useState(false);
  const [faq3, setFaq3] = useState(false);
  const [faq4, setFaq4] = useState(false);
  const [faq5, setFaq5] = useState(false);
  const [faq6, setFaq6] = useState(false);
  const [faq7, setFaq7] = useState(false);

  const t_faq1 = () => {
    setFaq1(!faq1);
    setFaq2(false);
    setFaq3(false);
    setFaq4(false);
    setFaq5(false);
    setFaq6(false);
    setFaq7(false);
  };
  const t_faq2 = () => {
    setFaq1(false);
    setFaq2(!faq2);
    setFaq3(false);
    setFaq4(false);
    setFaq5(false);
    setFaq6(false);
    setFaq7(false);
  };
  const t_faq3 = () => {
    setFaq1(false);
    setFaq2(false);
    setFaq3(!faq3);
    setFaq4(false);
    setFaq5(false);
    setFaq6(false);
    setFaq7(false);
  };
  const t_faq4 = () => {
    setFaq1(false);
    setFaq2(false);
    setFaq3(false);
    setFaq4(!faq4);
    setFaq5(false);
    setFaq6(false);
    setFaq7(false);
  };
  const t_faq5 = () => {
    setFaq1(false);
    setFaq2(false);
    setFaq3(false);
    setFaq4(false);
    setFaq5(!faq5);
    setFaq6(false);
    setFaq7(false);
  };
  const t_faq6 = () => {
    setFaq1(false);
    setFaq2(false);
    setFaq3(false);
    setFaq4(false);
    setFaq5(false);
    setFaq6(!faq6);
    setFaq7(false);
  };
  const t_faq7 = () => {
    setFaq1(false);
    setFaq2(false);
    setFaq3(false);
    setFaq4(false);
    setFaq5(false);
    setFaq6(false);
    setFaq7(!faq7)
  };

  const [open, setOpen] = useState('1');
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  return (
    <div className="live-preview">
      <Accordion className="custom-accordionwithicon accordion-secondary" id="accordionWithplusicon" open={open} toggle={toggle}>
        <AccordionItem>
          <h2 className="accordion-header" id="headingOne">
            <button
              className={classnames("accordion-button", { collapsed: !faq1 })} type="button" onClick={t_faq1} style={{ cursor: "pointer" }} >
              Minting Phase Schedule
            </button>
          </h2>
          <Collapse isOpen={faq1} className="accordion-collapse" id="collapseOne" >
            <div className="accordion-body">
              <p>
                The queue for selecting locations opens at 15th November 19:00 UTC and remains open indefinitely to ensure everyone has ample time to choose their preferred class and locations.
              </p>

              <ul>
                <li>
                  <strong>Phase 0:</strong><br />
                  <strong>Start:</strong> November 15, 2024, at 19:00 UTC<br />
                  <strong>End:</strong> November 16, 2024, at 19:00 UTC
                </li>
                <li>
                  <strong>Phase 1:</strong><br />
                  <strong>Start:</strong> November 16, 2024, at 19:00 UTC<br />
                  <strong>End:</strong> November 17, 2024, at 19:00 UTC
                </li>
                <li>
                  <strong>Phase 2:</strong><br />
                  <strong>Start:</strong> November 17, 2024, at 19:00 UTC<br />
                  <strong>End:</strong> November 18, 2024, at 19:00 UTC
                </li>
                <li>
                  <strong>Phase 3:</strong><br />
                  <strong>Start:</strong> November 18, 2024, at 19:00 UTC<br />
                  <strong>End:</strong> November 19, 2024, at 19:00 UTC
                </li>
                <li>
                  <strong>Phase 4:</strong><br />
                  <strong>Start:</strong> November 19, 2024, at 19:00 UTC<br />
                  <strong>End:</strong> November 20, 2024, at 19:00 UTC
                </li>
                <li>
                  <strong>Phase 5:</strong><br />
                  <strong>Start:</strong> November 20, 2024, at 19:00 UTC<br />
                  <strong>End:</strong> November 21, 2024, at 19:00 UTC
                </li>
                <li>
                  <strong>Final Phase (Phase 6):</strong><br />
                  <strong>Start:</strong> November 21, 2024, at 19:00 UTC<br />
                  <strong>End:</strong> November 23, 2024, at 19:00 UTC
                </li>
              </ul>

            </div>
          </Collapse>
        </AccordionItem>
        <AccordionItem>
          <h2 className="accordion-header" id="headingTwo">
            <button
              className={classnames("accordion-button", { collapsed: !faq2 })} type="button" onClick={t_faq2} style={{ cursor: "pointer" }} >
              Queue Position
            </button>
          </h2>
          <Collapse isOpen={faq2} className="accordion-collapse" >
            <div className="accordion-body">
              The earlier your land was minted, the better your position in the queue.
            </div>
          </Collapse>
        </AccordionItem>
        <AccordionItem>
          <h2 className="accordion-header" id="headingThree">
            <button
              className={classnames("accordion-button", { collapsed: !faq3 })} type="button" onClick={t_faq3} style={{ cursor: "pointer" }} >
              Total Supply
            </button>
          </h2>
          <Collapse isOpen={faq3} className="accordion-collapse" >
            <div className="accordion-body">
              ML is divided into 700 land plots, with 574 minted initially.
            </div>
          </Collapse>
        </AccordionItem>
        <AccordionItem>
          <h2 className="accordion-header" id="headingThree">
            <button
              className={classnames("accordion-button", { collapsed: !faq4 })} type="button" onClick={t_faq4} style={{ cursor: "pointer" }} >
              Plot Size
            </button>
          </h2>
          <Collapse isOpen={faq4} className="accordion-collapse" >
            <div className="accordion-body">
              Each plot is 3x3 in size, with potential future mechanisms for splitting.
            </div>
          </Collapse>
        </AccordionItem>
        <AccordionItem>
          <h2 className="accordion-header" id="headingThree">
            <button
              className={classnames("accordion-button", { collapsed: !faq5 })} type="button" onClick={t_faq5} style={{ cursor: "pointer" }} >
              Land Classes
            </button>
          </h2>
          <Collapse isOpen={faq5} className="accordion-collapse" >
            <div className="accordion-body">
              There are equal supplies for each class. Land value is determined by its usage and location.
            </div>
          </Collapse>
        </AccordionItem>
        <AccordionItem>
          <h2 className="accordion-header" id="headingThree">
            <button
              className={classnames("accordion-button", { collapsed: !faq6 })} type="button" onClick={t_faq6} style={{ cursor: "pointer" }} >
              Categories and Guardians
            </button>
          </h2>
          <Collapse isOpen={faq6} className="accordion-collapse" >
            <div className="accordion-body">
              Every Meta Legends land class has three sub-categories for their lands: Normal, Sacred and Legendary, with Guardians roaming the Legendary Lands.
            </div>
          </Collapse>
        </AccordionItem>
        <AccordionItem>
          <h2 className="accordion-header" id="headingThree">
            <button
              className={classnames("accordion-button", { collapsed: !faq7 })} type="button" onClick={t_faq7} style={{ cursor: "pointer" }} >
              Lands
            </button>
          </h2>
          <Collapse isOpen={faq7} className="accordion-collapse" >
            <div className="accordion-body">
              ML Lands are part of a larger ecosystem featuring maps created by the community, alongside areas curated by the ML team to ensure a diverse mix of experiences.
              We aim to partially emulate Otherside's approach by providing a dev kit and onboarding people experienced with 3D and Unreal Engine. Free courses for enthusiasts will be available, similar to our previous offerings on skin creation, 3D basics, and Unreal Engine basics.
            </div>
          </Collapse>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default Faq;
