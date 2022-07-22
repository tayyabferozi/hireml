import React from "react";
import Button from "../../components/Button";
import Modal from "../../components/Modal";

const SavedInterview = ({ ...rest }) => {
  return (
    <Modal className="saved-interview" {...rest}>
      <img src="/assets/vectors/tick.svg" alt="tick" />
      <h4 className="my-20">Interview Saved</h4>
      <p>
        The invitation has been sent to candidate and the interview has been
        scheduled.
      </p>
      <Button onClick={rest.toggleShow} className="mt-30" xlg primary>
        Go To Home
      </Button>
    </Modal>
  );
};

export default SavedInterview;
