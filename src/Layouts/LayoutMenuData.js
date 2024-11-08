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
    const [isBadgeRewards, setIsBadgeRewards] = useState(false);
    const [isStaking, setIsStaking] = useState(false);

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
        if (iscurrentState !== 'Staking') {
            setIsStaking(false);
        }
        if (iscurrentState !== 'Badge Rewards') {
            setIsBadgeRewards(false);
        }

    }, [
        history,
        iscurrentState,
        isDashboard,
        isProgress,
        isClaimLZRewards,
        isClaimDarkLegends,
        isBadgeRewards,
        isStaking
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
                {
                    id: "oglands",
                    label: "OG Lands",
                    link: "/claim/og-lands",
                    parentId: "claim-perks"
                },
            ]
        }, {
            id: "badge-rewards",
            label: "Badge Rewards",
            icon: "mdi mdi-police-badge",
            link: "/claim/badge-rewards",
            stateVariables: isBadgeRewards,
            click: function (e) {
                e.preventDefault();
                setIscurrentState('Badge Rewards');
            }
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
        // }, {
        //     id: "staking",
        //     label: "Staking",
        //     icon: "bx bxl-sketch",
        //     link: "/#",
        //     stateVariables: isStaking,
        //     click: function (e) {
        //         e.preventDefault();
        //         setIsStaking(!isStaking);
        //         setIscurrentState('Staking');
        //         updateIconSidebar(e);
        //     },
        //     subItems: [
        //         {
        //             id: "stakingmetalegends",
        //             label: "Meta Legends",
        //             link: "/staking/meta-legends",
        //             parentId: "staking"
        //         },
        //         {
        //             id: "stakingcouncilstones",
        //             label: "Council Stones",
        //             link: "/staking/council-stones",
        //             parentId: "staking"
        //         }
        //     ]
        },
    ];

    return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
