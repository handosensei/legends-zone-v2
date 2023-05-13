import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
    const history = useNavigate();
    //state data

    const [iscurrentState, setIscurrentState] = useState('Dashboard');
    const [isClaim, setIsClaim] = useState(false);
    const [isDashboard, setIsDashboard] = useState(false);
    const [isProgress, setIsProgress] = useState(false);


    useEffect(() => {
        document.body.classList.remove('twocolumn-panel');

        if (iscurrentState !== 'Dashboard') {
            setIsDashboard(false);
        }
        if (iscurrentState !== 'Progress') {
            setIsProgress(false);
        }
        if (iscurrentState !== 'Claim') {
            setIsClaim(false);
        }

    }, [
        history,
        iscurrentState,
        isDashboard,
        isProgress,
        isClaim
    ]);

    const menuItems = [
        {
            label: "Menu",
            isHeader: true,
        }, {

            id: "dashboard",
            label: "Dashboards",
            icon: "ri-dashboard-2-line",
            link: "/dashboard",
            stateVariables: isDashboard,
            click: function (e) {
                e.preventDefault();
                setIsDashboard(!isDashboard);
                setIscurrentState('Dashboard');
            }
        }, {
            id: "progress",
            label: "Progress",
            icon: "ri-treasure-map-line",
            link: "/progress",
            click: function (e) {
                e.preventDefault();
                setIsProgress(!isProgress);
                setIscurrentState('Progress');
            }
        }
    ];

    const menuItemClaim = {
        id: "claim",
        label: "Claim",
        icon: "ri-medal-2-fill",
        link: "/claim",
        click: function (e) {
            e.preventDefault();
            setIsClaim(!isClaim);
            setIscurrentState('Claim');
        }
    }

    if (process.env.REACT_APP_TF_MENU_CLAIM != 0) {
        console.log('dans le if');
        menuItems.push(menuItemClaim);
    }

    return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;