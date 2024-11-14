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
  const [faq8, setFaq8] = useState(false);
  const [faq9, setFaq9] = useState(false);
  const [faq10, setFaq10] = useState(false);
  const [faq11, setFaq11] = useState(false);

  const t_faqCloseAll = () => {
    setFaq1(false);
    setFaq2(false);
    setFaq3(false);
    setFaq4(false);
    setFaq5(false);
    setFaq6(false);
    setFaq7(false);
    setFaq8(false);
    setFaq9(false);
    setFaq10(false);
    setFaq11(false);
  }

  const t_faq1 = () => {
    t_faqCloseAll();
    setFaq1(!faq1);
  };
  const t_faq2 = () => {
    t_faqCloseAll();
    setFaq2(!faq2);

  };
  const t_faq3 = () => {
    t_faqCloseAll();
    setFaq3(!faq3);

  };
  const t_faq4 = () => {
    t_faqCloseAll();
    setFaq4(!faq4);

  };
  const t_faq5 = () => {
    t_faqCloseAll();
    setFaq5(!faq5);

  };
  const t_faq6 = () => {
    t_faqCloseAll();
    setFaq6(!faq6);
  };
  const t_faq7 = () => {
    t_faqCloseAll();
    setFaq7(!faq7)
  };
  const t_faq8 = () => {
    t_faqCloseAll();
    setFaq8(!faq8)
  };
  const t_faq9 = () => {
    t_faqCloseAll();
    setFaq9(!faq9)
  };
  const t_faq10 = () => {
    t_faqCloseAll();
    setFaq10(!faq10)
  };
  const t_faq11 = () => {
    t_faqCloseAll();
    setFaq11(!faq11)
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
                  <strong>Phase 0:</strong> November 15, 2024, at 19:00 UTC
                </li>
                <li>
                  <strong>Phase 1:</strong> November 16, 2024, at 19:00 UTC
                </li>
                <li>
                  <strong>Phase 2:</strong> November 17, 2024, at 19:00 UTC
                </li>
                <li>
                  <strong>Phase 3:</strong> November 18, 2024, at 19:00 UTC
                </li>
                <li>
                  <strong>Phase 4:</strong> November 19, 2024, at 19:00 UTC
                </li>
                <li>
                  <strong>Phase 5:</strong> November 20, 2024, at 19:00 UTC
                </li>
                <li>
                  <strong>Final Phase (Phase 6):</strong> November 21, 2024, at 19:00 UTC
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
              Meta Life (ML) consists of 700 land plots, with an initial 574 plots minted.
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
              Each plot is 3x3 in size, with potential future options for subdivision.
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
              Each class has an equal supply. Land value is influenced by its usage and location.
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
              Each Meta Legends land class has three sub-categories: Normal, Sacred, and Legendary, with Guardians protecting the Legendary Lands.
            </div>
          </Collapse>
        </AccordionItem>
        <AccordionItem>
          <h2 className="accordion-header" id="headingThree">
            <button
              className={classnames("accordion-button", { collapsed: !faq7 })} type="button" onClick={t_faq7} style={{ cursor: "pointer" }} >
              Art Direction
            </button>
          </h2>
          <Collapse isOpen={faq7} className="accordion-collapse" >
            <div className="accordion-body">
              Each land type has unique aesthetics. For example, Celestial Lands exude luxury, while Burner Lands feature dark themes with burning lava.
            </div>
          </Collapse>
        </AccordionItem>
        <AccordionItem>
          <h2 className="accordion-header" id="headingThree">
            <button
              className={classnames("accordion-button", { collapsed: !faq8 })} type="button" onClick={t_faq8} style={{ cursor: "pointer" }} >
              Land vs. City
            </button>
          </h2>
          <Collapse isOpen={faq8} className="accordion-collapse" >
            <div className="accordion-body">
              A land plot is not a city; it is a space where you can build.
            </div>
          </Collapse>
        </AccordionItem>

        <AccordionItem>
          <h2 className="accordion-header" id="headingThree">
            <button
              className={classnames("accordion-button", { collapsed: !faq9 })} type="button" onClick={t_faq9} style={{ cursor: "pointer" }} >
              Development
            </button>
          </h2>
          <Collapse isOpen={faq9} className="accordion-collapse" >
            <div className="accordion-body">
              Our approach will partially emulate Otherside’s strategy by providing a development kit and onboarding people experienced in 3D and Unreal Engine. Free courses for enthusiasts will be available, similar to our previous offerings on skin creation, 3D basics, and Unreal Engine fundamentals.
            </div>
          </Collapse>
        </AccordionItem>
        <AccordionItem>
          <h2 className="accordion-header" id="headingThree">
            <button
              className={classnames("accordion-button", { collapsed: !faq10 })} type="button" onClick={t_faq10} style={{ cursor: "pointer" }} >
              Selection
            </button>
          </h2>
          <Collapse isOpen={faq10} className="accordion-collapse" >
            <div className="accordion-body">
              You can choose a class and general location (three main locations per class). The exact number and rarity (Normal, Sacred, or Legendary) are random.
            </div>
          </Collapse>
        </AccordionItem>
        <AccordionItem>
          <h2 className="accordion-header" id="headingThree">
            <button
              className={classnames("accordion-button", { collapsed: !faq11 })} type="button" onClick={t_faq11} style={{ cursor: "pointer" }} >
              Supply Cap
            </button>
          </h2>
          <Collapse isOpen={faq11} className="accordion-collapse" >
            <div className="accordion-body">
              The supply is capped by the smart contract. Out of respect for early adopters, we won’t increase the total supply. Future expansions will involve these existing plots or custom curated experiences.
            </div>
          </Collapse>
        </AccordionItem>

      </Accordion>
    </div>
  );
}

export default Faq;
