import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserDataService from "../Services/userService";
export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: false,
      fields: {},
      errors: {},
    };
  }

  //validation
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

    //company
    if (!fields["company"]) {
      formIsValid = false;
      errors["company"] = "cannot be empty";
    }
    //addresss
    if (!fields["address"]) {
      formIsValid = false;
      errors["address"] = "cannot be empty";
    }

    //Email
    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "Cannot be empty";
    }

    if (typeof fields["email"] !== "undefined") {
      let lastAtPos = fields["email"].lastIndexOf("@");
      let lastDotPos = fields["email"].lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          fields["email"].indexOf("@@") === -1 &&
          lastDotPos > 2 &&
          fields["email"].length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        errors["email"] = "email is not valid";
      }
    }
    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "cannot be empty";
    }
    if (typeof fields["password"] !== "undefined") {
      var regularExpression = /^[a-zA-Z]$/;

      if (regularExpression.test(fields["password"])) {
        errors["password"] =
          "password should contain atleast one number and one special character";

        return false;
      }
    }
    this.setState({ errors: errors });
    return formIsValid;
  }

  //add data into database
  async userDataSubmit(e) {
    e.preventDefault();
    if (this.handleValidation()) {
      const userResponse = await UserDataService.create(this.state.fields);
      console.log("User response", userResponse);
      if (userResponse.status === 400) {
        alert("User already exits");
      }
      if (userResponse.status === 200) {
        alert("User register successfully");
        return this.props.history.push("/sign-in");
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
  //select field ans set into state
  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  }

  render() {
    return (
      <div class="CardBox-wrapper">
        <div class="CardBox">
          <form onSubmit={this.userDataSubmit.bind(this)}>
            <h3>Sign Up</h3>
            <hr />
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
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={this.handleChange.bind(this, "email")}
                value={this.state.fields["email"]}
                required
              />
              <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
              <br />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={this.handleChange.bind(this, "password")}
                value={this.state.fields["password"]}
                required
              />
              <span style={{ color: "red" }}>
                {this.state.errors["password"]}
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
                <span style={{ color: "red" }}>{this.state.errors["dob"]}</span>
                <br />
              </div>
              <div className="col">
                <label>Company</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="company"
                  onChange={this.handleChange.bind(this, "company")}
                  value={this.state.fields["company"]}
                  required
                />
                <span style={{ color: "red" }}>
                  {this.state.errors["company"]}
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
              Sign Up
            </button>
            <hr />
            <div>
              Already registered{" "}
              <Link to={"sign-in"} style={{}}>
                SIGN-IN
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
