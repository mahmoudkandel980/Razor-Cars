import React, { useContext } from "react";

import JobsContext from "../context/Jobs-context";
import JobsForm from "../components/JobsForm";

import { ReactComponent as InterviewSvg } from "../components/svg/interview.svg";

function Jobs() {
    const ctx = useContext(JobsContext);

    return (
        <div>
            <div className="contactUs jobs">
                <div className="container">
                    <div className="contactUs__content">
                        <h1 className="heading heading-secondary">Jobs</h1>
                        <p className="text ">Available jobs</p>
                        <ul className="jobs__list">
                            <li className="jobs__list-item">1 {ctx.jobs[0]}</li>
                            <li className="jobs__list-item">2 {ctx.jobs[1]}</li>
                            <li className="jobs__list-item">4 {ctx.jobs[2]}</li>
                            <li className="jobs__list-item">1 {ctx.jobs[3]}</li>
                        </ul>
                        <h3 className="heading heading-tertiary jobs-heading">
                            Application
                        </h3>
                        <JobsForm />
                    </div>
                    <div className="contactUs__img">
                        <InterviewSvg />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Jobs;
