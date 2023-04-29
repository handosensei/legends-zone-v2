import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
    const history = useNavigate();
    //state data

    const [iscurrentState, setIscurrentState] = useState('Dashboard');
    const [isClaim, setIsClaim] = useState(false);

    useEffect(() => {
        document.body.classList.remove('twocolumn-panel');

        if (iscurrentState === 'Widgets') {
            setIsClaim(false);
        }

    }, [
        history,
        iscurrentState,
        isClaim
    ]);

    const menuItems = [
        {
            label: "Menu",
            isHeader: true,
        },
        {
            id: "claim",
            label: "Claim",
            icon: "ri-medal-2-fill",
            link: "/claim",
            click: function (e) {
                e.preventDefault();
                setIscurrentState('Claim');
            }
        },
    ];
    return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;