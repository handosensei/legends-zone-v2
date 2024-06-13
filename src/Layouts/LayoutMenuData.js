import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
    const history = useNavigate();
    //state data

    const [iscurrentState, setIscurrentState] = useState('Dashboard');

    const [isDashboard, setIsDashboard] = useState(false);
    const [isProgress, setIsProgress] = useState(false);
    const [isClaimLZRewards, setIsClaimLZRewards] = useState(false);
    const [isClaimPerks, setIsClaimPerks] = useState(false);
    const [isClaimDarkLegends, setIsClaimDarkLegends] = useState(false);

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
        if (iscurrentState !== 'Claim LZ Rewards') {
            setIsClaimLZRewards(false);
        }
        if (iscurrentState !== 'Claim Perks') {
            setIsClaimPerks(false);
        }
        if (iscurrentState !== 'Claim Dark Rewards') {
            setIsClaimDarkLegends(false);
        }

    }, [
        history,
        iscurrentState,
        isDashboard,
        isProgress,
        isClaimLZRewards,
        isClaimDarkLegends
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
            stateVariables: isProgress,
            click: function (e) {
                e.preventDefault();
                setIscurrentState('Progress');
            }
        }, {
            id: "claim-lz-rewards",
            label: "Claim LZ Rewards",
            icon: "ri-medal-2-fill",
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setIsClaimLZRewards(!isClaimLZRewards);
                setIscurrentState('Claim LZ Rewards');
                updateIconSidebar(e);
            },
            stateVariables: isClaimLZRewards,
            subItems: [{
                    id: "holdingrewards",
                    label: "Holding rewards S1",
                    link: "/claim/holding-rewards",
                    parentId: "claim"
                },{
                    id: "healingdrones",
                    label: "Healing drones",
                    link: "/claim/healing-drones",
                    parentId: "claim"
                }
            ]
        }, {
            id: "claim-perks",
            label: "Claim Perks",
            icon: "bx bxs-invader",
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setIsClaimPerks(!isClaimPerks);
                setIscurrentState('Claim Perks');
                updateIconSidebar(e);
            },
            stateVariables: isClaimPerks,
            subItems: [
                {
                    id: "ogarmor",
                    label: "OG Armors",
                    link: "/claim/og-armors",
                    parentId: "claim-perks"
                },
                {
                    id: "ogpets",
                    label: "OG Pets",
                    link: "/claim/og-pets",
                    parentId: "claim-perks"
                },
                {
                    id: "ogvehicles",
                    label: "OG Vehicles",
                    link: "/claim/og-vehicles",
                    parentId: "claim-perks"
                },
                {
                    id: "ogressidences",
                    label: "OG Residences",
                    link: "/claim/og-residences",
                    parentId: "claim-perks"
                },
            ]
        // }, {
        //     id: "claim-dark-rewards",
        //     label: "Claim Dark Rewards",
        //     icon: "ri-skull-2-line",
        //     link: "/claim/dark-rewards",
        //     stateVariables: isClaimDarkLegends,
        //     click: function (e) {
        //         e.preventDefault();
        //         setIscurrentState('Claim Dark Rewards');
        //     },
        },
    ];

    return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
