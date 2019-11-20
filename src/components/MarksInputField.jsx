import React from "react";

import Form from "react-bootstrap/Form";

const MarksInputField = props => {
  return (
    <Form.Group>
      <Form.Label>{props.label}</Form.Label>
      <Form.Control
        placeholder="0 - 100"
        type="number"
        min={0}
        max={100}
        required
        name={props.name}
        value={props.value}
        onChange={event => props.func(event)}
      />
    </Form.Group>
  );
};

export default MarksInputField;
