/* eslint-disable no-unused-vars */
import React, { createContext, useState } from "react";

const jobsPosition = [
    "Sales Manager",
    "Supervisor",
    "Call Center Agent",
    "Office Boy",
];

const JobsContext = createContext({
    jobs: jobsPosition,
});

export const JobsContextProvider = (props) => {
    const [availableJobs, setAvailableJobs] = useState(jobsPosition);

    const data = {
        jobs: availableJobs,
    };

    return (
        <JobsContext.Provider value={data}>
            {props.children}
        </JobsContext.Provider>
    );
};

export default JobsContext;
