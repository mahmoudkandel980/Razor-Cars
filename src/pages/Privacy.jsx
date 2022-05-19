import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

function Privacy() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/contact/helpCenter");
    }, [navigate]);

    return <div>Privacy</div>;
}

export default Privacy;
