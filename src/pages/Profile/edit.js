import React, {useEffect, useState} from 'react';
import {Button, Card, CardBody, CardHeader, Col, Container, Form, Label, Modal, ModalBody, ModalHeader, Row} from 'reactstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';

//import images
import defaultPfp from '../../assets/images/ml-avatar.png';
import {getHonoraries, getLegends, updateUser} from "../../client/ApiMetaLegends";
import './profile.css';
import {toast, ToastContainer} from "react-toastify";

import {useDispatch} from "react-redux";
import {editProfile} from "../../store/auth/profile/actions";
import {Link} from "react-router-dom";

const Edit = () => {

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [designation, setDesignation] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState(defaultPfp);
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');
  const [discord, setDiscord] = useState('');
  const [modalPfpChoice, setModalPfpChoice] = useState(false);
  const [legends, setLegends] = useState([]);

  const dispatch = useDispatch();

  const toggleModalPfpChoice = () => {
    setModalPfpChoice(!modalPfpChoice);
  }

  const selectProfilePicture = () => {
    setModalPfpChoice(false);
  }

  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editProfile(inputs));
    toast("Data profile updated",
      {
        position: "top-right",
        hideProgressBar: true,
        className: 'bg-success text-white' });
    window.location.href='/profile';
  }

  const initForm = () => {
    const authUser = JSON.parse(sessionStorage.getItem("authUser"));
    const user = authUser.user;

    setFirstname(user.firstname ?? '');
    setLastname(user.lastname ?? '');
    setDesignation(user.designation ?? '');
    setUsername(user.username ?? '');
    setEmail(user.email ?? '');
    setBio(user.bio ?? '');
    setProfilePicture(user.profilePicture ?? defaultPfp);
    setLinkedin(user.linkedin ?? '');
    setTwitter(user.twitter ?? '');
    setDiscord(user.discord ?? '');
    setInputs(user);
  }

  const listNft = async () => {
    setModalPfpChoice(true);
    let res = await getLegends();
    const honoraries = await getHonoraries();
    if (honoraries.length > 0) {
      res = res.concat(honoraries);
    }
    setLegends(res);
  }

  const onSelectPfp = (e) => {
    const user = inputs;
    setProfilePicture(e.target.value);
    user.profilePicture = e.target.value;
    setInputs(user);
  }

  const resetProfilePicture = () => {
    setModalPfpChoice(false);
    const authUser = JSON.parse(sessionStorage.getItem("authUser"));
    setProfilePicture(authUser.user.profilePicture ?? defaultPfp);
  }

  document.title = "Edit Profile | Legends Zone";

  useEffect(() => {
    initForm();
  }, []);

  useEffect(() => {
  }, [dispatch]);

  return (
  <React.Fragment>

    <Modal size="lg" id="modal-pfp-choice" isOpen={modalPfpChoice} toggle={() => { toggleModalPfpChoice(); }} modalClassName="zoomIn" centered >
      <ModalHeader className="modal-title" id="flipModalLabel" toggle={() => { toggleModalPfpChoice(); }}></ModalHeader>
      <ModalBody className="text-center">
        <Row>
          {legends.map((legend, key) => (
            <Col key={key} sm={4} md={3} xl={2} xxl={2}>
              <Card>
                <input type="radio" name="picture-profile"
                  id={`legend#${legend.tokenId}`} className="visually-hidden" value={legend.media.thumbnail}
                  onChange={onSelectPfp}
                />
                <label htmlFor={`legend#${legend.tokenId}`}>
                  <img className="img-fluid" src={legend.media.thumbnail} alt="" />
                </label>
              </Card>
            </Col>
          ))}
        </Row>
      </ModalBody>
      <div className="modal-footer">
        <Button color="primary" onClick={() => { selectProfilePicture(); }}> Select </Button>
        <Button color="light" onClick={() => { resetProfilePicture(); }}> Close </Button>
      </div>
    </Modal>

    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Edit profile" pageTitle="Profile"/>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col xxl={3}>
              <Card className="card-bg-fill">
                <CardBody className="p-4">
                  <div className="text-center">
                    <div className="profile-user position-relative d-inline-block mx-auto  mb-4">
                      <img src={profilePicture}
                           className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                           alt="user-profile"/>
                      <input type="hidden" value={inputs.profilePicture || ''} name="profilePicture" />
                      <div className="avatar-xs p-0 rounded-circle profile-photo-edit">
                        <input id="profile-img-file-input" type="button"
                               className="profile-img-file-input" onClick={listNft}/>
                        <Label htmlFor="profile-img-file-input" className="profile-photo-edit avatar-xs">
                          <span className="avatar-title rounded-circle bg-light text-body">
                              <i className="ri-camera-fill"></i>
                          </span>
                        </Label>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <h5 className="card-title mb-0 fs-5">Social networks</h5>
                </CardHeader>
                <CardBody>
                  <div className="mb-3 d-flex">
                    <div className="avatar-xs d-block flex-shrink-0 me-3">
                    <span className="avatar-title rounded-circle fs-16 bg-secondary text-light">
                        <i className="ri-linkedin-box-fill"></i>
                    </span>
                    </div>
                    <input type="text" className="form-control" id="linkedinInput"
                           name="linkedin"
                           placeholder="Linkedin"
                           value={inputs.linkedin || ""}
                           onChange={handleChange} />
                  </div>

                  <div className="mb-3 d-flex">
                    <div className="avatar-xs d-block flex-shrink-0 me-3">
                    <span className="avatar-title rounded-circle fs-16 bg-info">
                        <i className="ri-twitter-fill"></i>
                    </span>
                    </div>
                    <input type="text" className="form-control" id="twitterInput"
                           name="twitter"
                           placeholder="Twitter"
                           value={inputs.twitter || ""}
                           onChange={handleChange} />
                  </div>
                  <div className="d-flex">
                    <div className="avatar-xs d-block flex-shrink-0 me-3">
                    <span className="avatar-title rounded-circle fs-16 bg-primary">
                        <i className="ri-discord-fill"></i>
                    </span>
                    </div>
                    <input type="text" className="form-control" id="discordInput"
                           name="discord"
                           placeholder="Discord"
                           value={inputs.discord || ""}
                           onChange={handleChange} />
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col xxl={9}>
              <Card>
                <CardHeader>
                  <h5 className="card-title mb-0 fs-5">Informations</h5>
                </CardHeader>
                <CardBody className="p-4">
                  <Row>
                    <Col lg={6}>
                      <div className="mb-3">
                        <Label htmlFor="firstnameInput" className="form-label">Firstname</Label>
                        <input type="text" className="form-control" id="firstnameInput"
                               placeholder="Enter your firstname"
                               name="firstname"
                               value={inputs.firstname || ""}
                               onChange={handleChange} />
                      </div>

                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <Label htmlFor="lastnameInput" className="form-label">Lastname</Label>
                        <input type="text" className="form-control" id="lastnameInput"
                               name="lastname"
                               value={inputs.lastname || ""}
                               placeholder="Enter your lastname"
                               onChange={handleChange} />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <Label htmlFor="firstnameInput" className="form-label">Username</Label>
                        <input type="text" className="form-control" id="usernameInput"
                               name="username"
                               value={inputs.username || ""}
                               placeholder="Enter your username"
                               onChange={handleChange} />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <Label htmlFor="emailInput" className="form-label">Email</Label>
                        <input type="email" className="form-control" id="emailInput"
                               name="email"
                               value={inputs.email || ""}
                               placeholder="Enter your email"
                               onChange={handleChange} />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <Label htmlFor="designationInput" className="form-label">Designation</Label>
                        <input type="designation" className="form-control" id="designationInput"
                               name="designation"
                               value={inputs.designation || ""}
                               placeholder="Enter your designation"
                               onChange={handleChange} />
                      </div>
                    </Col>

                    <Col lg={12}>
                      <div className="mb-3 pb-2">
                        <Label htmlFor="bioTextarea"
                               className="form-label">Bio</Label>
                        <textarea className="form-control" id="bioTextarea" rows="3"
                                  name="bio"
                                  value={inputs.bio || ""}
                                  onChange={handleChange}></textarea>
                      </div>
                    </Col>

                    {/*<Col lg={12}>*/}
                    {/*  <div className="mt-4 mb-3 border-bottom pb-2">*/}
                    {/*    <div className="float-end">*/}
                    {/*      <Button className="btn-sm btn-soft-primary">*/}
                    {/*        Add wallet*/}
                    {/*      </Button>*/}
                    {/*    </div>*/}
                    {/*    <h5 className="card-title">Wallets</h5>*/}
                    {/*  </div>*/}

                    {/*  <div className="d-flex align-items-center mb-3">*/}
                    {/*    <div className="flex-shrink-0 avatar-sm">*/}
                    {/*      <div className="avatar-title bg-light text-primary rounded-3 fs-18">*/}
                    {/*        <i className="ri-fingerprint-line"></i>*/}
                    {/*      </div>*/}
                    {/*    </div>*/}
                    {/*    <div className="flex-grow-1 ms-3">*/}
                    {/*      <p className="text-muted mb-0">0x24DF9F5A2624Db695ee695399fd43DEB62c475Bd</p>*/}
                    {/*    </div>*/}
                    {/*    <div className="hstack gap-2 mt-4 mt-sm-0">*/}
                    {/*      <button type="button" className="btn btn-outline-warning btn-icon waves-effect waves-light"><i*/}
                    {/*      className="ri-star-fill"></i></button>*/}
                    {/*      <button type="button" className="btn btn-outline-primary btn-icon waves-effect waves-light"><i*/}
                    {/*      className="ri-delete-bin-fill"></i></button>*/}
                    {/*    </div>*/}
                    {/*  </div>*/}
                    {/*  <div className="d-flex align-items-center mb-3">*/}
                    {/*    <div className="flex-shrink-0 avatar-sm">*/}
                    {/*      <div className="avatar-title bg-light text-primary rounded-3 fs-18">*/}
                    {/*        <i className="ri-fingerprint-line"></i>*/}
                    {/*      </div>*/}
                    {/*    </div>*/}
                    {/*    <div className="flex-grow-1 ms-3">*/}
                    {/*      <p className="text-muted mb-0">0x24DF9F5A2624Db695ee695399fd43DEB62c475Bd</p>*/}
                    {/*    </div>*/}
                    {/*    <div className="hstack gap-2 mt-4 mt-sm-0">*/}
                    {/*      <button type="button" className="btn btn-outline-warning btn-icon waves-effect waves-light"><i*/}
                    {/*      className="ri-star-line"></i></button>*/}
                    {/*      <button type="button" className="btn btn-outline-primary btn-icon waves-effect waves-light"><i*/}
                    {/*      className="ri-delete-bin-fill"></i></button>*/}
                    {/*    </div>*/}
                    {/*  </div>*/}
                    {/*</Col>*/}

                    <Col lg={12}>
                      <div className="hstack gap-2 justify-content-end">
                        <button type="submit" className="btn btn-primary">Updates</button>
                        {/*<Link to="/profile" className="btn btn-primary" onClick={handleSubmit}>Update</Link>*/}
                        <Link to="/profile" className="btn btn-soft-danger">
                          <i className="ri-edit-box-line align-bottom"></i> Cancel
                        </Link>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
    <ToastContainer />
  </React.Fragment>
  );
};

export default Edit;