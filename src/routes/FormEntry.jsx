import React from "react";

import Axios from "axios";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import MarksInputField from "../components/MarksInputField";

class FormEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      english: "",
      maths: "",
      hindi: "",
      science: "",
      social: "",
      name: "",
      grade: "",
      exam_type: "",
      section: ""
    };
  }

  componentDidMount() {
    if (this.props.match.path === "/edit/:id") {
      Axios.get(
        `http://students-marks-recorder.herokuapp.com/user/${this.props.match.params.id}`
      )
        .then(resp => {
          const cur = resp.data.data;
          this.setState({
            english: parseInt(cur.english),
            maths: parseInt(cur.maths),
            hindi: parseInt(cur.hindi),
            science: parseInt(cur.science),
            social: parseInt(cur.social),
            name: cur.name,
            grade: cur.grade,
            exam_type: cur.exam_type,
            section: cur.section,
            uid: cur.uid
          });
        })
        .catch(err => console.log(err));
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.props.match.path === "/edit/:id") {
      Axios.put("http://students-marks-recorder.herokuapp.com/", this.state)
        .then(resp => this.props.history.push("/"))
        .catch(err => console.log(err));
    } else {
      Axios.post("http://students-marks-recorder.herokuapp.com/", this.state)
        .then(resp => this.props.history.push("/"))
        .catch(err => console.log(err));
    }
  };

  render() {
    console.log(this.state);
    return (
      <Container>
        <Form onSubmit={event => this.handleSubmit(event)}>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  placeholder="Enter Student Name"
                  name="name"
                  value={this.state.name}
                  onChange={event => this.handleChange(event)}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Label>Grade</Form.Label>
              <Form.Group>
                <Form.Control
                  as="select"
                  name="grade"
                  value={this.state.grade}
                  onChange={event => this.handleChange(event)}
                  required
                >
                  <option value="">Select...</option>
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
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Section</Form.Label>
                <Form.Control
                  as="select"
                  name="section"
                  value={this.state.section}
                  onChange={event => this.handleChange(event)}
                  required
                >
                  <option value="">Select...</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Exam Type</Form.Label>
                <Form.Control
                  as="select"
                  name="exam_type"
                  value={this.state.exam_type}
                  onChange={event => this.handleChange(event)}
                  required
                >
                  <option value="">Select...</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Half-Yearly">Half-Yearly</option>
                  <option value="Annual">Annual</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <MarksInputField
                label="English"
                name="english"
                value={this.state.english}
                func={event => this.handleChange(event)}
              />
            </Col>
            <Col>
              <MarksInputField
                label="Hindi"
                name="hindi"
                value={this.state.hindi}
                func={event => this.handleChange(event)}
              />
            </Col>
            <Col>
              <MarksInputField
                label="Maths"
                name="maths"
                value={this.state.maths}
                func={event => this.handleChange(event)}
              />
            </Col>
            <Col>
              <MarksInputField
                label="Science"
                name="science"
                value={this.state.science}
                func={event => this.handleChange(event)}
              />
            </Col>
            <Col>
              <MarksInputField
                label="Social"
                name="social"
                value={this.state.social}
                func={event => this.handleChange(event)}
              />
            </Col>
          </Row>
          <Button type="submit">Submit</Button>
        </Form>
      </Container>
    );
  }
}

export default FormEntry;
