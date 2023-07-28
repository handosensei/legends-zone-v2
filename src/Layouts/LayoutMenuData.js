import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
    const history = useNavigate();
    //state data

    const [iscurrentState, setIscurrentState] = useState('Dashboard');
    const [isClaim, setIsClaim] = useState(false);
    const [isDashboard, setIsDashboard] = useState(false);
    const [isProgress, setIsProgress] = useState(false);

    function updateIconSidebar(e) {
        if (e && e.target && e.target.getAttribute("subitems")) {
            const ul = document.getElementById("two-column-menu");
            const iconItems = ul.querySelectorAll(".nav-icon.active");
            let activeIconItems = [...iconItems];
            activeIconItems.forEach((item) => {
                item.classList.remove("active");
                var id = item.getAttribute("subitems");
                if (document.getElementById(id))
                    document.getElementById(id).classList.remove("show");
            });
        }
    }

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
                setIscurrentState('Dashboard');
            }
        }, {
            id: "progress",
            label: "Progress",
            icon: "ri-treasure-map-line",
            link: "/progress",
            click: function (e) {
                e.preventDefault();
                setIscurrentState('Progress');
            }
        }, {
            id: "claim",
            label: "Claim",
            icon: "ri-medal-2-fill",
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setIsClaim(!isClaim);
                setIscurrentState('Claim');
                updateIconSidebar(e);
            },
            stateVariables: isClaim,
            subItems: [
                {
                    id: "ogpets",
                    label: "OG Pets",
                    link: "/claim/og-pets",
                    parentId: "claim"
                }, {
                    id: "holdingrewards",
                    label: "Holding rewards",
                    link: "/claim/holding-rewards",
                    parentId: "claim"
                },
            ]
        }
    ];

    return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;