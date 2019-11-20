import React, { useEffect, useState } from "react";

import Axios from "axios";

import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { Link } from "react-router-dom";

import Filters from "../components/Filters";

const Home = () => {
  const [data, setData] = useState([]);
  const [gradeSelector, setGradeSelector] = useState("");
  const [sectionSelector, setSectionSelector] = useState("");
  const [examSelector, setExamSelector] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteID, setDeleteID] = useState(0);

  useEffect(
    () => getData("https://students-marks-recorder.herokuapp.com/"),
    []
  );

  const getData = url => {
    Axios.get(url)
      .then(resp => setData(resp.data.data))
      .catch(err => console.log(err));
  };

  const handleGradeSelector = value => {
    let queryParams = `grade=${value}&`;
    setGradeSelector(value);
    if (sectionSelector) {
      queryParams += `section=${sectionSelector}&`;
    }
    if (examSelector) {
      queryParams += `exam_type=${examSelector}`;
    }
    getData(`https://students-marks-recorder.herokuapp.com?${queryParams}`);
  };

  const handleSectionSelector = value => {
    let queryParams = `section=${value}&`;
    setSectionSelector(value);
    if (gradeSelector) {
      queryParams += `grade=${gradeSelector}&`;
    }
    if (examSelector) {
      queryParams += `exam_type=${examSelector}`;
    }
    getData(`https://students-marks-recorder.herokuapp.com?${queryParams}`);
  };

  const handleExamSelector = value => {
    let queryParams = `exam_type=${value}&`;
    setExamSelector(value);
    if (sectionSelector) {
      queryParams += `section=${sectionSelector}&`;
    }
    if (gradeSelector) {
      queryParams += `grade=${gradeSelector}`;
    }
    getData(`https://students-marks-recorder.herokuapp.com?${queryParams}`);
  };

  const handleClearFilter = (event = "") => {
    if (event) {
      event.preventDefault();
    }
    setGradeSelector("");
    setSectionSelector("");
    setExamSelector("");
    getData("https://students-marks-recorder.herokuapp.com/");
  };

  const modalTrigger = id => {
    setDeleteModal(!deleteModal);
    setDeleteID(id);
  };

  const handleDelete = event => {
    event.preventDefault();
    Axios.delete(`https://students-marks-recorder.herokuapp.com?id=${deleteID}`)
      .then(resp => {
        modalTrigger(0);
        handleClearFilter();
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="mx-5">
      <Filters
        handleGradeSelector={event => handleGradeSelector(event)}
        handleSectionSelector={event => handleSectionSelector(event)}
        handleExamSelector={event => handleExamSelector(event)}
        handleClearFilter={event => handleClearFilter(event)}
        selectedSection={sectionSelector}
        selectedGrade={gradeSelector}
        selectedExam={examSelector}
      />
      <Table striped bordered hover responsive className="text-center">
        <thead>
          <tr>
            <th className="align-middle">ID</th>
            <th className="align-middle">Name</th>
            <th className="align-middle">Grade</th>
            <th className="align-middle">Section</th>
            <th className="align-middle">Exam Type</th>
            <th className="align-middle">English</th>
            <th className="align-middle">Hindi</th>
            <th className="align-middle">Maths</th>
            <th className="align-middle">Science</th>
            <th className="align-middle">Social</th>
            <th className="align-middle">Percentage</th>
            <th className="align-middle">Performance</th>
            <th className="align-middle">Edit Action</th>
            <th className="align-middle">Delete Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length !== 0 ? (
            data.map(ele => (
              <tr key={ele.uid}>
                <td className="align-middle">{ele.uid}</td>
                <td className="align-middle">{ele.name}</td>
                <td className="align-middle">{ele.grade}</td>
                <td className="align-middle">{ele.section}</td>
                <td className="align-middle">{ele.exam_type}</td>
                <td className="align-middle">{ele.english}</td>
                <td className="align-middle">{ele.hindi}</td>
                <td className="align-middle">{ele.maths}</td>
                <td className="align-middle">{ele.science}</td>
                <td className="align-middle">{ele.social}</td>
                <td className="align-middle">{ele.percentage}</td>
                <td className="align-middle">{ele.performance}</td>
                <td className="align-middle">
                  <Link className="btn btn-primary" to={`/edit/${ele.uid}`}>
                    Edit
                  </Link>
                </td>
                <td className="align-middle">
                  <Button
                    className="btn-danger"
                    onClick={() => modalTrigger(ele.uid)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>No Content</td>
              <td>No Content</td>
              <td>No Content</td>
              <td>No Content</td>
              <td>No Content</td>
              <td>No Content</td>
              <td>No Content</td>
              <td>No Content</td>
              <td>No Content</td>
              <td>No Content</td>
              <td>No Content</td>
              <td>No Content</td>
              <td>No Content</td>
              <td>No Content</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Modal show={deleteModal} onHide={() => modalTrigger(0)}>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You're about to delete the details of this student
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => modalTrigger(0)}>
            Close
          </Button>
          <Button variant="danger" onClick={event => handleDelete(event)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
