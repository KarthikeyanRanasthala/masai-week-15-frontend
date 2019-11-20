import React from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Filters = props => {
  return (
    <div className="d-flex justify-content-end">
      <Form className="mx-2 my-2">
        <Form.Group>
          <Form.Control
            value={props.selectedGrade}
            as="select"
            name="gradeSelector"
            onChange={event => props.handleGradeSelector(event.target.value)}
          >
            <option value="">Grade</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </Form.Control>
        </Form.Group>
      </Form>
      <Form className="mx-2 my-2">
        <Form.Group>
          <Form.Control
            value={props.selectedSection}
            as="select"
            onChange={event => props.handleSectionSelector(event.target.value)}
          >
            <option value="">Section</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </Form.Control>
        </Form.Group>
      </Form>
      <Form className="mx-2 my-2">
        <Form.Group>
          <Form.Control
            value={props.selectedExam}
            as="select"
            onChange={event => props.handleExamSelector(event.target.value)}
          >
            <option value="">Exam</option>
            <option value="Quarterly">Quarterly</option>
            <option value="Half-Yearly">Half-Yearly</option>
            <option value="Annual">Annual</option>
          </Form.Control>
        </Form.Group>
      </Form>
      <Button
        className="align-self-start mt-2"
        onClick={event => props.handleClearFilter(event)}
      >
        Clear
      </Button>
    </div>
  );
};

export default Filters;
