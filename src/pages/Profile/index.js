import React, {useEffect, useState} from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Label,
  Row
} from 'reactstrap';
import { Link } from 'react-router-dom';
import BreadCrumb from '../../Components/Common/BreadCrumb';

//import images
import defaultPfp from '../../assets/images/ml-avatar.png';
import './profile.css';
import {toast, ToastContainer} from "react-toastify";

import {useDispatch} from "react-redux";
import {editProfile} from "../../store/auth/profile/actions";

const Profile = () => {

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
  const [inputs, setInputs] = useState({});

  const dispatch = useDispatch();


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
    dispatch(editProfile(inputs));
    toast("Data profile updated",
      {
        position: "top-right",
        hideProgressBar: true,
        className: 'bg-success text-white' });
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

  document.title = "Profile | Legends Zone";

  useEffect(() => {
    initForm();
  }, []);

  useEffect(() => {
  }, [dispatch]);

  return (
    <React.Fragment>

      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Profile" pageTitle="Home"/>
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
                      </div>
                    </div>
                  </CardBody>
                </Card>

                <Card>
                  <CardHeader>
                    <h5 className="card-title mb-0 fs-5">Social networks</h5>
                  </CardHeader>
                  <CardBody>

                    <Row className="minh-50 align-items-center">
                      <Col lg={2}>
                        <div className="avatar-xs d-block flex-shrink-0 me-3">
                          <span className="avatar-title rounded-circle fs-6 bg-secondary text-light">
                            <i className="ri-linkedin-box-fill"></i>
                          </span>
                        </div>
                      </Col>
                      <Col lg={10}>
                        <div className="text-muted fs-6">{linkedin}</div>
                      </Col>
                    </Row>

                    <Row className="minh-50 align-items-center">
                      <Col lg={2}>
                        <div className="avatar-xs d-block flex-shrink-0 me-3">
                          <span className="avatar-title rounded-circle fs-6 bg-info">
                            <i className="ri-twitter-fill"></i>
                          </span>
                        </div>
                      </Col>
                      <Col lg={10}>
                        <div className="text-muted fs-6">{twitter}</div>
                      </Col>
                    </Row>

                    <Row className="minh-50 align-items-center">
                      <Col lg={2}>
                        <div className="avatar-xs d-block flex-shrink-0 me-3">
                          <span className="avatar-title rounded-circle fs-6 bg-primary">
                            <i className="ri-discord-fill"></i>
                          </span>
                        </div>
                      </Col>
                      <Col lg={10}>
                        <div className="text-muted fs-6">{discord}</div>
                      </Col>
                    </Row>

                  </CardBody>
                </Card>
              </Col>

              <Col xxl={9}>
                <Card>
                  <CardHeader>
                    <h5 className="card-title mb-0 fs-5">Informations</h5>
                  </CardHeader>
                  <CardBody className="p-4">
                    <Row className="minh-75">
                      <Col lg={6}>
                        <div className="mb-3">
                          <Label htmlFor="firstnameInput" className="form-label fs-6">Firstname</Label>
                          <div className="text-muted fs-6">{firstname}</div>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mb-3">
                          <Label htmlFor="lastnameInput" className="form-label fs-6">Lastname</Label>
                          <div className="text-muted fs-6">{lastname}</div>
                        </div>
                      </Col>
                    </Row>
                    <Row className="minh-75">
                      <Col lg={6}>
                        <div className="mb-3">
                          <Label htmlFor="firstnameInput" className="form-label fs-6">Username</Label>
                          <div className="text-muted fs-6">{username}</div>
                        </div>
                      </Col>

                      <Col lg={6}>
                        <div className="mb-3">
                          <Label htmlFor="emailInput" className="form-label fs-6">Email</Label>
                          <div className="text-muted fs-6">{email}</div>
                        </div>
                      </Col>
                    </Row>
                    <Row className="minh-75">
                      <Col lg={6}>
                        <div className="mb-3">
                          <Label htmlFor="designationInput" className="form-label fs-6">Designation</Label>
                          <div className="text-muted fs-6">{designation}</div>
                        </div>
                      </Col>
                    </Row>
                    <Row className="minh-75">
                      <Col lg={12}>
                        <div className="mb-3 pb-2">
                          <Label htmlFor="bioTextarea" className="form-label fs-6">Bio</Label>
                          <div className="text-muted fs-6">{bio}</div>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12}>
                        <div className="hstack gap-2 justify-content-end">
                          <Link to="/profile/edit" className="btn btn-success">
                            <i className="ri-edit-box-line align-bottom"></i> Edit Profile
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

export default Profile;