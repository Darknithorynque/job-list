import React, { useState } from "react";
import Modal from "react-modal";
import { useJobContext } from "./JobContext";
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

const options = ["Urgent", "Regular", "Trivial"];

export default function EditModal(props) {
  const {
    modalIsOpen,
    closeModal,
    afterOpenModal,
    modalInputVal,
    setModalInputVal,
    modalSelect,
    setModalSelect,
  } = props;
  const { jobList, setJoblist } = useJobContext();
  const selectedJobIndex = props.selectedJobIndex;

  const handleSave = () => {
    const updatedJobList = [...jobList];
    updatedJobList[selectedJobIndex].name = modalInputVal;
    updatedJobList[selectedJobIndex].pri = modalSelect;
    setJoblist(updatedJobList);
    closeModal();
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Example Modal"
      >
        <h3 className="modal-job-main-title">Job Edit</h3>
        <div>
          <p className="modal-job-titles">Job Name</p>
          <input
            className="modal-job-forms"
            value={modalInputVal}
            onChange={(e) => setModalInputVal(e.target.value)}
            disabled={true}
          />
        </div>
        <div>
          <p className="modal-job-titles">Job Priority</p>
          <select
            className="modal-job-forms"
            value={modalSelect}
            onChange={(e) => setModalSelect(e.target.value)}
          >
            {options.map((item, i) => (
              <option key={i}>{item}</option>
            ))}
          </select>
        </div>
        <div className="modal-buttons">
          <button className="save" onClick={handleSave}>
            Save
          </button>
          <button className="cancel" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}
