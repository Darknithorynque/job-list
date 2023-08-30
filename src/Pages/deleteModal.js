import React from "react";
import Modal from "react-modal";
import { useJobContext } from "./JobContext";

//Styles
import "./style.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function DeleteModal(props) {
  const { modalIsOpen, closeModal, handleDelete, selectedJobIndex } = props;

  const { jobList, setJoblist } = useJobContext();

  const handleApproveDelete = (index) => {
    const updatedJobList = jobList.filter((_, i) => i !== index);
    setJoblist(updatedJobList);
    closeModal();
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Delete Modal"
      >
        <div className="modal-icon-sec">
          <i
            style={{ fontSize: "30px", color: "#DC4C64", textAlign: "center" }}
            class="fa-solid fa-circle-exclamation"
          ></i>
        </div>
        <p className="dModal-title">Are you sure you want to delete it?</p>

        <div className="dModal-buttons">
          <span className="cancel" onClick={closeModal}>
            Cancel
          </span>
          <span
            className="save"
            onClick={() => handleApproveDelete(selectedJobIndex)}
          >
            Approve
          </span>
        </div>
      </Modal>
    </div>
  );
}
