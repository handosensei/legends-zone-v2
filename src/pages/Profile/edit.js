import React, {useEffect, useState} from "react";
import BreadCrumb from '../../Components/Common/BreadCrumb';
import UiContent from "../../Components/Common/UiContent";
import {toast, ToastContainer} from "react-toastify";

import {
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Button,
  Label,
  Input,
  Container,
  FormFeedback,
  Form,
  ModalHeader, ModalBody, Modal, CardHeader,
} from "reactstrap";
// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

//import images
import defaultPfp from '../../assets/images/ml-avatar.png';
import {getHonoraries, getLegends, usernameIsAvailable, emailIsAvailable} from "../../client/ApiMetaLegends";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";

import {editProfile} from "../../store/auth/profile/actions";

const Edit = () => {

  const [profilePicture, setProfilePicture] = useState(defaultPfp);
  const [inputs, setInputs] = useState({});
  const [legends, setLegends] = useState([]);
  const [modalPfpChoice, setModalPfpChoice] = useState(false);

  const [userId, setUserId] = useState(null);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [designation, setDesignation] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [web3Profil, setWeb3Profil] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');
  const [discord, setDiscord] = useState('');
  const [instagram, setInstagram] = useState('');

  const dispatch = useDispatch();

  // Form validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: userId,
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email,
      profilePicture: profilePicture,
      web3Profil: web3Profil,
      designation: designation,
      bio: bio,
      linkedin: linkedin,
      discord: discord,
      twitter: twitter,
      instagram: instagram,
    },
    validationSchema: Yup.object({
      firstname: Yup.string().nullable(),
      lastname: Yup.string().nullable(),
      username: Yup.string().required("Please enter your username"),
      email: Yup.string().email().required("Please enter your email"),
      designation: Yup.string().nullable(),
      profilePicture: Yup.string().nullable(),
      setWeb3Profil: Yup.string().nullable(),
      bio: Yup.string().nullable(),
      linkedin: Yup.string().nullable(),
      discord: Yup.string().nullable(),
      twitter: Yup.string().nullable(),
      instagram: Yup.string().nullable(),
    }),
    onSubmit: async (values) => {
      if (values.username !== username) {
        const res = await usernameIsAvailable(values.username);
        if (!res.isAvailable) {
          toast("Username is not available", {
            position: "top-right",
            hideProgressBar: true,
            className: 'bg-warning text-white' });
          return;
        }
      }

      if (values.email !== email) {
        const res = await emailIsAvailable(values.email);
        if (!res.isAvailable) {
          toast("Email is not available", {
            position: "top-right",
            hideProgressBar: true,
            className: 'bg-warning text-white' });
          return;
        }
      }

      dispatch(editProfile(values));
      toast("Data profile updated",
        {
          position: "top-right",
          hideProgressBar: true,
          className: 'bg-success text-white' });
    },
  });

  const initForm = () => {
    const authUser = JSON.parse(sessionStorage.getItem("authUser"));
    const user = authUser.user;
    setUserId(user.id ?? '');
    setFirstname(user.firstname ?? '');
    setLastname(user.lastname ?? '');
    setDesignation(user.designation ?? '');
    setUsername(user.username ?? '');
    setEmail(user.email ?? '');
    setBio(user.bio ?? '');
    setProfilePicture(user.profilePicture ?? defaultPfp);
    setWeb3Profil(user.web3Profil ?? '');
    setLinkedin(user.linkedin ?? '');
    setTwitter(user.twitter ?? '');
    setDiscord(user.discord ?? '');
    setInstagram(user.instagram ?? '');
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

  const toggleModalPfpChoice = () => {
    setModalPfpChoice(!modalPfpChoice);
  }

  const selectProfilePicture = () => {
    setModalPfpChoice(false);
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

      <UiContent />
      <div className="page-content">

        <Container fluid={true}>
          <BreadCrumb title="Form Validation" pageTitle="Forms" />
          <Form
            className="needs-validation"
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}
          >
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
                      <span className="avatar-title rounded-circle fs-16 bg-light">
                          <i className="ri-linkedin-box-fill"></i>
                      </span>
                      </div>
                      <Input
                        name="linkedin"
                        type="text"
                        className="form-control"
                        id="linkedinInput"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.linkedin || ""}
                        invalid={
                          validation.touched.linkedin &&
                          validation.errors.linkedin
                            ? true
                            : false
                        }
                      />
                      {validation.touched.linkedin &&
                      validation.errors.linkedin ? (
                        <FormFeedback type="invalid">
                          {validation.errors.linkedin}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="mb-3 d-flex">
                      <div className="avatar-xs d-block flex-shrink-0 me-3">
                      <span className="avatar-title rounded-circle fs-16 bg-light">
                          <i className="ri-twitter-fill"></i>
                      </span>
                      </div>
                      <Input
                        name="twitter"
                        type="text"
                        className="form-control"
                        id="linkedinInput"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.twitter || ""}
                        invalid={
                          validation.touched.twitter &&
                          validation.errors.twitter
                            ? true
                            : false
                        }
                      />
                      {validation.touched.twitter &&
                      validation.errors.twitter ? (
                        <FormFeedback type="invalid">
                          {validation.errors.twitter}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="mb-3 d-flex">
                      <div className="avatar-xs d-block flex-shrink-0 me-3">
                      <span className="avatar-title rounded-circle fs-16 bg-light">
                          <i className="ri-discord-fill"></i>
                      </span>
                      </div>
                      <Input
                        name="discord"
                        type="text"
                        className="form-control"
                        id="linkedinInput"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.discord || ""}
                        invalid={
                          validation.touched.discord &&
                          validation.errors.discord
                            ? true
                            : false
                        }
                      />
                      {validation.touched.discord &&
                      validation.errors.discord ? (
                        <FormFeedback type="invalid">
                          {validation.errors.discord}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="mb-3 d-flex">
                      <div className="avatar-xs d-block flex-shrink-0 me-3">
                      <span className="avatar-title rounded-circle fs-16 bg-light">
                          <i className="ri-instagram-fill"></i>
                      </span>
                      </div>
                      <Input
                        name="instagram"
                        type="text"
                        className="form-control"
                        id="linkedinInput"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.instagram || ""}
                        invalid={
                          validation.touched.instagram &&
                          validation.errors.instagram
                            ? true
                            : false
                        }
                      />
                      {validation.touched.instagram &&
                      validation.errors.instagram ? (
                        <FormFeedback type="invalid">
                          {validation.errors.instagram}
                        </FormFeedback>
                      ) : null}
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
                    <div className="live-preview">
                      <Row className="minh-75">
                        <Col lg={6}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="validationCustom01" className="form-label fs-6">Firstname</Label>
                            <Input
                              name="firstname"
                              type="text"
                              className="form-control"
                              id="validationCustom01"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.firstname || ""}
                              invalid={
                                validation.touched.firstname &&
                                validation.errors.firstname
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.firstname &&
                            validation.errors.firstname ? (
                              <FormFeedback type="invalid">
                                {validation.errors.firstname}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>

                        <Col lg={6}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="validationCustom02" className="form-label fs-6">Lastname</Label>
                            <Input
                              name="lastname"
                              type="text"
                              className="form-control"
                              id="validationCustom02"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.lastname || ""}
                              invalid={
                                validation.touched.lastname &&
                                validation.errors.lastname
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.lastname &&
                            validation.errors.lastname ? (
                              <FormFeedback type="invalid">
                                {validation.errors.lastname}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row className="minh-75">
                        <Col lg={6}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="validationCustom03" className="form-label fs-6">Username</Label>
                            <Input
                              name="username"
                              type="text"
                              className="form-control"
                              id="validationCustom03"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.username || ""}
                              invalid={
                                validation.touched.username &&
                                validation.errors.username
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.username &&
                            validation.errors.username ? (
                              <FormFeedback type="invalid">
                                {validation.errors.username}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col lg={6}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="validationCustom04" className="form-label fs-6">Email</Label>
                            <Input
                              name="email"
                              type="text"
                              className="form-control"
                              id="validationCustom04"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.email || ""}
                              invalid={
                                validation.touched.email &&
                                validation.errors.email
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.email &&
                            validation.errors.email ? (
                              <FormFeedback type="invalid">
                                {validation.errors.email}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row className="minh-75">
                        <Col lg={6}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="validationCustom05" className="form-label fs-6">Designation</Label>
                            <Input
                              name="designation"
                              type="text"
                              className="form-control"
                              id="validationCustom05"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.designation || ""}
                              invalid={
                                validation.touched.designation &&
                                validation.errors.designation
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.designation &&
                            validation.errors.designation ? (
                              <FormFeedback type="invalid">
                                {validation.errors.designation}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>

                        <Col lg={6}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="validationCustom06" className="form-label fs-6">Web3 Profil</Label>
                            <Input
                              name="web3Profil"
                              type="select"
                              className="form-control"
                              id="validationCustom06"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.web3Profil || ""}
                              invalid={
                                validation.touched.web3Profil &&
                                validation.errors.web3Profil
                                  ? true
                                  : false
                              }
                            >
                              <option value=''>-- Select your profil --</option>
                              <option value="artist">Artist</option>
                              <option value="community-manager">Community manager</option>
                              <option value="founder">Founder</option>
                              <option value="investor">Investor</option>
                              <option value="it-expert">IT Expert</option>
                              <option value="moderator">Moderator</option>
                            </Input>
                            {validation.touched.web3Profil &&
                            validation.errors.web3Profil ? (
                              <FormFeedback type="invalid">
                                {validation.errors.web3Profil}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row className="minh-75">
                        <Col>
                          <FormGroup className="mb-3">
                            <Label htmlFor="validationCustom07" className="form-label fs-6">Bio</Label>
                            <textarea name="bio" className="form-control" id="validationCustom07"
                                      onChange={validation.handleChange}
                                      onBlur={validation.handleBlur}
                                      value={validation.values.bio || ""}
                            >
                            </textarea>
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                  </CardBody>
                </Card>
              </Col>

              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  <Button type="submit" className="btn btn-success">Updates</Button>
                  <Link to="/profile" className="btn btn-soft-danger">
                    <i className="ri-edit-box-line align-bottom"></i> Cancel
                  </Link>
                </div>
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
