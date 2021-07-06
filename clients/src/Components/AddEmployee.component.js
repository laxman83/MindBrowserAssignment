import React from "react";
import { Button, Modal } from "react-bootstrap";
import getDataService from "../Services/getData";
class AddEmployee extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      login: false,
      fields: {},
      errors: {},
    };
  }
  handleModal() {
    this.setState({ show: !this.state.show });
  }
  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    console.log("inside error", errors);
    let formIsValid = true;

    //firstname
    if (!fields["firstname"]) {
      formIsValid = false;
      errors["firstname"] = "cannot be empty";
    }

    if (typeof fields["firstname"] !== "undefined") {
      if (!fields["firstname"].match(/^[a-zA-Z]+$/)) {
        console.log("inside firstname fields only letter");
        formIsValid = false;
        errors["firstname"] = "only letters";
      }
    }
    //lastname
    if (!fields["lastname"]) {
      formIsValid = false;
      errors["lastname"] = "cannot be empty";
    }

    if (typeof fields["lastname"] !== "undefined") {
      if (!fields["lastname"].match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors["lastname"] = "only letters";
      }
    }

    if (!fields["dob"]) {
      formIsValid = false;
      errors["dob"] = "cannot be empty";
    }
    //mobile
    if (!fields["mobile"]) {
      formIsValid = false;
      errors["mobile"] = "cannot be empty";
    }

    if (typeof fields["mobile"] !== "undefined") {
      if (!fields["mobile"].match(/^[0-9]+$/)) {
        formIsValid = false;
        errors["mobile"] = "only Numbers";
      }
    }
    //Empid
    if (!fields["empid"]) {
      formIsValid = false;
      errors["empid"] = "cannot be empty";
    }

    if (typeof fields["empid"] !== "undefined") {
      if (!fields["empid"].match(/^[0-9]+$/)) {
        formIsValid = false;
        errors["empid"] = "only Numbers";
      }
    }
    //city
    if (!fields["city"]) {
      formIsValid = false;
      errors["city"] = "cannot be empty";
    }
    //addresss
    if (!fields["address"]) {
      formIsValid = false;
      errors["address"] = "cannot be empty";
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  async userDataSubmit(e) {
    e.preventDefault();
    if (this.handleValidation()) {
      const userResponse = await getDataService.create(this.state.fields);
      console.log("User response", userResponse);
      if (userResponse.status === 400) {
        alert("User already exits");
      }

      if (userResponse.status === 200) {
        alert("Record added successfully");
        this.handleModal();
        window.location.reload();
        // return this.props.history.push("/home");
      } else {
        alert("Something went wrong");
      }
    } else {
      alert("Form has errors.");
    }
  }

  handleReset = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    this.setState({
      fields: {},
    });
  };
  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  }

  render() {
    return (
      <div>
        <div className="modalClass">
          <Button
            onClick={() => this.handleModal()}
            style={{ marginLeft: "83rem" }}
          >
            Add employee
          </Button>
        </div>

        <Modal show={this.state.show} onHide={() => this.handleModal()}>
          <Modal.Header closeButton>
            <h4>Employee Information</h4>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.userDataSubmit.bind(this)}>
              <div className="row">
                <div className="col">
                  <label>First name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First name"
                    onChange={this.handleChange.bind(this, "firstname")}
                    value={this.state.fields["firstname"]}
                    required
                  />
                  <span style={{ color: "red" }}>
                    {this.state.errors["firstname"]}
                  </span>
                  <br />
                </div>
                <div className="col">
                  <label>Last name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last name"
                    onChange={this.handleChange.bind(this, "lastname")}
                    value={this.state.fields["lastname"]}
                    required
                  />
                  <span style={{ color: "red" }}>
                    {this.state.errors["lastname"]}
                  </span>
                  <br />
                </div>
              </div>
              <div className="form-group">
                <label>Employee Id</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter Employee Id"
                  onChange={this.handleChange.bind(this, "empid")}
                  value={this.state.fields["empid"]}
                  required
                />
                <span style={{ color: "red" }}>
                  {this.state.errors["empid"]}
                </span>
                <br />
              </div>
              <div className="form-group">
                <label>Mobile No:</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter number"
                  onChange={this.handleChange.bind(this, "mobile")}
                  value={this.state.fields["mobile"]}
                  required
                />
                <span style={{ color: "red" }}>
                  {this.state.errors["mobile"]}
                </span>
                <br />
              </div>

              <div className="row">
                <div className="col">
                  <label>DOB</label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="dob"
                    onChange={this.handleChange.bind(this, "dob")}
                    value={this.state.fields["dob"]}
                    required
                  />
                  <span style={{ color: "red" }}>
                    {this.state.errors["dob"]}
                  </span>
                  <br />
                </div>
                <div className="col">
                  <label>City</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="city"
                    onChange={this.handleChange.bind(this, "city")}
                    value={this.state.fields["city"]}
                    required
                  />
                  <span style={{ color: "red" }}>
                    {this.state.errors["city"]}
                  </span>
                  <br />
                </div>
              </div>
              <div className="form-group">
                <label>Address</label>
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="address"
                  onChange={this.handleChange.bind(this, "address")}
                  value={this.state.fields["address"]}
                  required
                />
                <span style={{ color: "red" }}>
                  {this.state.errors["address"]}
                </span>
                <br />
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                submit
              </button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
      //   <div class="CardBox-wrapper">
      //     <div class="CardBox">

      //     </div>
      //   </div>
    );
  }
}

export default AddEmployee;
