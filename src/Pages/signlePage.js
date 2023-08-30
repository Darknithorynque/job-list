// SinglePage.js
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Select from "react-select";
import "./style.css";
import EditModal from "./editModal";
import { useJobContext } from "./JobContext";
import DeleteModal from "./deleteModal";

const options = ["Urgent", "Regular", "Trivial"];
const optionsSearch = ["All", "Urgent", "Regular", "Trivial"];

function SinglePage() {
  const { jobList, setJoblist } = useJobContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchPriority, setSearchPriority] = useState("All");
  const [filteredJobList, setFilteredJobList] = useState(jobList);
  const [inputValue, setInputValue] = useState("");
  const [priority, setPriority] = useState("Urgent");
  const [modalInputVal, setModalInputVal] = useState("");
  const [modalSelect, setModalSelect] = useState("");
  const [selectedJobIndex, setSelectedJobIndex] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [approveDelete, setApproveDelete] = useState(false);

  const handleCreate = () => {
    if (inputValue === "" || priority === "") {
      alert("Tüm alanların doldurulması zorunludur.");
    } else {
      const newJob = { name: inputValue, pri: priority, render: true };

      const updatedJobList = [...jobList];
      let insertIndex = updatedJobList.findIndex((job) => job.pri > priority);
      if (insertIndex === -1) {
        insertIndex = updatedJobList.length;
      }
      updatedJobList.splice(insertIndex, 0, newJob);

      setJoblist(updatedJobList);
      setModalIsOpen(false);
    }
  };

  const colorDetect = (styled) => {
    switch (styled) {
      case "Urgent":
        return "red";
      case "Regular":
        return "orange";
      case "Trivial":
        return "blue";
      default:
        return "";
    }
  };

  const handleDelete = (index) => {
    const selectedJob = filteredJobList[index];
    const selectedJobIndexInOriginalList = jobList.findIndex(
      (job) => job === selectedJob
    );

    setSelectedJobIndex(selectedJobIndexInOriginalList);
    setDeleteModalIsOpen(true);
  };

  const handleEdit = (index) => {
    const selectedJob = filteredJobList[index];
    const selectedJobIndexInOriginalList = jobList.findIndex(
      (job) => job === selectedJob
    );

    setSelectedJobIndex(selectedJobIndexInOriginalList);
    setModalInputVal(selectedJob.name);
    setModalSelect(selectedJob.pri);
    setModalIsOpen(true);
  };

  useEffect(() => {
    const filteredJobs = jobList.filter((item) => {
      const nameMatch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const priorityMatch =
        searchPriority === "All" ||
        item.pri.toLowerCase() === searchPriority.toLowerCase();

      return nameMatch && priorityMatch;
    });

    setFilteredJobList(filteredJobs);
  }, [searchQuery, searchPriority, jobList]);

  return (
    <div className="sOpt-container">
      <div className="sOpt-add-section">
        <h5 className="create-newJob-title">Create New Job</h5>
        <div className="job-details">
          <div className="job-details-name">
            <p>Job Name</p>
            <input
              onChange={(e) => setInputValue(e.target.value)}
              className="job-details-h"
            />
          </div>
          <div className="job-details-priority">
            <p>Job Priority</p>
            <select
              onChange={(e) => setPriority(e.target.value)}
              className="job-details-h"
            >
              {options.map((item, i) => (
                <option key={i}>{item}</option>
              ))}
            </select>
          </div>
          <div className="job-details-button">
            <p style={{ color: "transparent" }}>Job Priority</p>
            <button onClick={handleCreate} className="create-button">
              + Create
            </button>
          </div>
        </div>
      </div>

      <div className="sOpt-add-section">
        <div className="joblist-container">
          <h5 className="joblist-text">Job List</h5>
          <h5 className="ratio">(3/3)</h5>
        </div>
        <div className="joblist-filter-section">
          <input
            placeholder="🔍 Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            defaultValue={"All"}
            onChange={(e) => setSearchPriority(e.target.value)}
          >
            {optionsSearch.map((item, i) => (
              <option key={i}>{item}</option>
            ))}
          </select>
        </div>
        <div className="job-list-table">
          {/* Example table structure for the Job List */}
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "5px",
            }}
          >
            <thead
              className="job-list-table-head"
              style={{ textAlign: "left" }}
            >
              <tr>
                <th className="name-column">Name</th>
                <th className="priority-column">Priority</th>
                <th className="actions-column">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobList
                .sort((a, b) => {
                  const priorityOrder = ["Urgent", "Regular", "Trivial"];
                  return (
                    priorityOrder.indexOf(a.pri) - priorityOrder.indexOf(b.pri)
                  );
                })
                .map((item, i) => {
                  return item.render ? (
                    <tr key={i}>
                      <td className="name-column">{item.name}</td>
                      <td className="priority-column">
                        <div
                          className="priority-tag"
                          style={{
                            backgroundColor: `${colorDetect(item.pri)}`,
                          }}
                        >
                          {item.pri}
                        </div>
                      </td>
                      <td className="actions-column">
                        <span
                          onClick={() => handleEdit(i)}
                          className="action-edit"
                        >
                          ✏️
                        </span>
                        <span
                          onClick={() => handleDelete(i)}
                          className="action-delete"
                        >
                          🗑️
                        </span>
                      </td>
                    </tr>
                  ) : (
                    ""
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      <EditModal
        modalIsOpen={modalIsOpen}
        closeModal={() => setModalIsOpen(false)}
        modalInputVal={modalInputVal}
        setModalInputVal={setModalInputVal}
        modalSelect={modalSelect}
        setModalSelect={setModalSelect}
        selectedJobIndex={selectedJobIndex}
      />
      <DeleteModal
        modalIsOpen={deleteModalIsOpen}
        closeModal={() => setDeleteModalIsOpen(false)}
        handleDelete={handleDelete}
        selectedJobIndex={selectedJobIndex}
      />
    </div>
  );
}

export default SinglePage;
