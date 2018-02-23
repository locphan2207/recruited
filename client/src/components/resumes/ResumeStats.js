import React from 'react';
import { connect } from 'react-redux';
import { fetchResumes, updateResume } from '../../actions';

import {Link} from 'react-router-dom';

class ResumeStats extends React.Component {
  constructor(props) {
    super(props);
  }

  renderApprove() {
    const {approvedResumes} = this.props;
    return (
      <ul className="approved-list">
        {approvedResumes.reverse().map(resume => (
          <li key={resume._id} className="approved-item">
            <div>{resume._user.fullName}</div>
            <div>{resume._user.email}</div>
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const {approvedResumes} = this.props;
    return (
      <div>
        <div className="approved-resume-container">
          <div className="approved-resume-title">Approved Applicants:</div>
          {this.renderApprove()}
        </div>
        <div className="stats-resume-container">
          <div className="rejected-resume-title">Rejected:</div>
          {this.props.rejectedNumber}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const approvedResumes = [];
  let rejectedNumber = 0;
  let pendingNumber = 0;
  if (state.entities.resumes) {
    Object.values(state.entities.resumes).forEach(resume => {
      if (resume.approved === "yes") approvedResumes.push(resume);
      else if (resume.approved === "no") rejectedNumber += 1;
      else pendingNumber += 1;
    });
  }
  return {
    approvedResumes: approvedResumes,
    rejectedNumber: rejectedNumber,
    pendingNumber: pendingNumber
   };
}

export default connect(mapStateToProps, null)(ResumeStats);