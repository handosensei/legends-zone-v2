import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import {getLegends} from "../../client/ApiMetaLegends";

//import images
import avatar1 from "../../assets/images/ml-avatar.png";

const ProfileDropdown = () => {
    const [countMLNFTs, setCountMLNFTs] = useState(0);
    const [userName, setUserName] = useState("Admin");
    const [rank, setRank] = useState('Warender');
    
    const { user } = useSelector(state => ({
        user: state.Profile.user,
    }));

    const defineRank = (countMLNFTs) => {
        if (countMLNFTs === 0) {
            return;
        }
        else if (countMLNFTs < 3) {
            setRank('Holders');
        }
        else if (2 < countMLNFTs && countMLNFTs < 6) {
            setRank('Legend Investor');
        }
        else if (5 < countMLNFTs && countMLNFTs < 11) {
            setRank('Virtual Conservative');
        }
        else if (10 < countMLNFTs && countMLNFTs < 21) {
            setRank('Legendary Holder');
        }
        else if (20 < countMLNFTs && countMLNFTs < 51) {
            setRank("Legend's Museum");
        }
        else if (50 < countMLNFTs) {
            setRank("Legend's Whale");
        }
    }

    useEffect(() => {

        defineRank();

        const fetchData = async (address) => {
            const result = await getLegends(address);
            setCountMLNFTs(result.length);
            defineRank(result.length);
        }

        if (sessionStorage.getItem("authUser")) {
            const obj = JSON.parse(sessionStorage.getItem("authUser"));
            fetchData(obj.wallet.toLowerCase());
        }
    }, [userName, user]);

    //Dropdown Toggle
    const [isProfileDropdown, setIsProfileDropdown] = useState(false);
    const toggleProfileDropdown = () => {
        setIsProfileDropdown(!isProfileDropdown);
    };
    return (
        <React.Fragment>
            <Dropdown isOpen={isProfileDropdown} toggle={toggleProfileDropdown} className="ms-sm-3 header-item topbar-user">
                <DropdownToggle tag="button" type="button" className="btn">
                    <span className="d-flex align-items-center">
                        <img className="rounded-circle header-profile-user" src={avatar1}
                            alt="Header Avatar" />
                        <span className="text-start ms-xl-2">
                            <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">{rank}</span>
                            {/*<span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">{userName}</span>*/}
                            {/*<span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">Founder</span>*/}
                        </span>
                    </span>
                </DropdownToggle>
                {/*<DropdownMenu className="dropdown-menu-end">*/}
                {/*    <h6 className="dropdown-header">Welcome {userName}!</h6>*/}
                {/*    <DropdownItem href={process.env.PUBLIC_URL + "/profile"}><i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>*/}
                {/*        <span className="align-middle">Profile</span></DropdownItem>*/}
                {/*    <DropdownItem href={process.env.PUBLIC_URL + "/apps-chat"}><i*/}
                {/*        className="mdi mdi-message-text-outline text-muted fs-16 align-middle me-1"></i> <span*/}
                {/*            className="align-middle">Messages</span></DropdownItem>*/}
                {/*    <DropdownItem href={process.env.PUBLIC_URL + "#"}><i*/}
                {/*        className="mdi mdi-calendar-check-outline text-muted fs-16 align-middle me-1"></i> <span*/}
                {/*            className="align-middle">Taskboard</span></DropdownItem>*/}
                {/*    <DropdownItem href={process.env.PUBLIC_URL + "/pages-faqs"}><i*/}
                {/*        className="mdi mdi-lifebuoy text-muted fs-16 align-middle me-1"></i> <span*/}
                {/*            className="align-middle">Help</span></DropdownItem>*/}
                {/*    <div className="dropdown-divider"></div>*/}
                {/*    <DropdownItem href={process.env.PUBLIC_URL + "/pages-profile"}><i*/}
                {/*        className="mdi mdi-wallet text-muted fs-16 align-middle me-1"></i> <span*/}
                {/*            className="align-middle">Balance : <b>$5971.67</b></span></DropdownItem>*/}
                {/*    <DropdownItem href={process.env.PUBLIC_URL + "/pages-profile-settings"}><span*/}
                {/*        className="badge bg-soft-success text-success mt-1 float-end">New</span><i*/}
                {/*            className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"></i> <span*/}
                {/*                className="align-middle">Settings</span></DropdownItem>*/}
                {/*    <DropdownItem href={process.env.PUBLIC_URL + "/auth-lockscreen-basic"}><i*/}
                {/*        className="mdi mdi-lock text-muted fs-16 align-middle me-1"></i> <span className="align-middle">Lock screen</span></DropdownItem>*/}
                {/*</DropdownMenu>*/}
            </Dropdown>
        </React.Fragment>
    );
};

export default ProfileDropdown;