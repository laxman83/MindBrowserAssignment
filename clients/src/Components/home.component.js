import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import getDataService from "../Services/getData";
import AddEmployee from "./AddEmployee.component";

const Home = () => {
  const [users, setUser] = useState([]);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [dob, setDob] = useState(null);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [mobile, setMobile] = useState(null);
  const [empid, setEmpId] = useState(null);
  const [id, setId] = useState(null);
  const [showModal, SetShowModal] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [showUpdate, setUpdateShow] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  //update popup
  const handleUpdateModalShow = () => SetShowModal(true);
  const handleUpdateModalClose = () => SetShowModal(false);
  //Confirmation Update popup
  const handleUpdateClose = () => setUpdateShow(false);
  const handleShowUpdate = () => setUpdateShow(true);
  //Delete Confirmation Popup
  const handleDeleteClose = () => setDeleteShow(false);
  const handleDeleteShow = () => setDeleteShow(true);

  //fetch all data and store in state
  async function getUsers() {
    const result = await getDataService.getAll();
    if (result.data !== "undefined" && result.data.length > 0) {
      setUser(result.data);
      setFirstName(result.data[0].firstname);
      setLastName(result.data[0].lastname);
      setAddress(result.data[0].ddress);
      setCity(result.data[0].city);
      setDob(result.data[0].dob);
      setMobile(result.data[0].mobile);
      setEmpId(result.data[0].empid);
      setId(result.data[0].id);
    }
  }

  //select particular  and setData
  function selectUser(id) {
    let item = users.find((item) => item.id === id);
    handleUpdateModalShow();
    if (id) {
      setFirstName(item.firstname);
      setLastName(item.lastname);
      setAddress(item.address);
      setCity(item.city);
      setDob(item.dob);
      setMobile(item.mobile);
      setEmpId(item.empid);
      setId(item.id);
    }
  }

  //update data
  function updateUser() {
    let item = { empid, firstname, lastname, dob, mobile, city, address };

    getDataService.update(id, item).then((result) => {
      getUsers();
    });
    handleUpdateClose();
    handleUpdateModalClose();
  }

  //select particular user those want to delete
  const deleteData = async (id) => {
    try {
      console.log(id);
      const responseData = await getDataService.delete(id);
      handleDeleteClose();
      if (responseData.status === 200) {
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <AddEmployee />
      <div>
        <h1 id="title">Employee Details</h1>
        <div className="card-body">
          <Table striped bordered hover variant="dark" id="employee">
            <tbody>
              <tr>
                <th>EMPID</th>
                <th>EMPLOYEE NAME</th>
                <th>MOBILE NO</th>
                <th>DOB</th>
                <th>CITY</th>
                <th>ADDRESS</th>
                <th>UPDATE</th>
                <th>DELETE</th>
              </tr>
              {users.map((item, i) => (
                <tr key={i}>
                  <td>{item.empid}</td>
                  <td>{item.firstname + " " + item.lastname}</td>
                  <td>{item.mobile}</td>
                  <td>{item.dob}</td>
                  <td>{item.city}</td>
                  <td>{item.address}</td>
                  <td className="opration">
                    <Button
                      variant="primary"
                      onClick={() => selectUser(item.id)}
                    >
                      update
                    </Button>
                    <Modal
                      show={showModal}
                      onHide={handleUpdateModalClose}
                      keyboard={false}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Modal title</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <form>
                          <div className="row">
                            <div className="col">
                              <label>First name</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="First name"
                                value={firstname}
                                onChange={(e) => {
                                  setFirstName(e.target.value);
                                }}
                                required
                              />

                              <br />
                            </div>
                            <div className="col">
                              <label>Last name</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Last name"
                                value={lastname}
                                onChange={(e) => {
                                  setLastName(e.target.value);
                                }}
                                required
                              />

                              <br />
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Employee Id</label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Enter Employee Id"
                              value={empid}
                              onChange={(e) => {
                                setEmpId(e.target.value);
                              }}
                              required
                            />

                            <br />
                          </div>
                          <div className="form-group">
                            <label>Mobile No:</label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Enter number"
                              value={mobile}
                              onChange={(e) => {
                                setMobile(e.target.value);
                              }}
                              required
                            />

                            <br />
                          </div>

                          <div className="row">
                            <div className="col">
                              <label>DOB</label>
                              <input
                                type="date"
                                className="form-control"
                                placeholder="dob"
                                value={dob}
                                onChange={(e) => {
                                  setDob(e.target.value);
                                }}
                                required
                              />

                              <br />
                            </div>
                            <div className="col">
                              <label>City</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="city"
                                value={city}
                                onChange={(e) => {
                                  setCity(e.target.value);
                                }}
                                required
                              />

                              <br />
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Address</label>
                            <textarea
                              type="text"
                              className="form-control"
                              placeholder="address"
                              value={address}
                              onChange={(e) => {
                                setAddress(e.target.value);
                              }}
                              required
                            />
                            <br />
                          </div>
                          <Button
                            className="btn btn-primary btn-block"
                            onClick={handleShowUpdate}
                          >
                            update
                          </Button>

                          <Modal show={showUpdate} onHide={handleUpdateClose}>
                            <Modal.Body>
                              <h4>Do you want update data</h4>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button
                                variant="secondary"
                                onClick={handleUpdateClose}
                              >
                                No
                              </Button>
                              <Button
                                variant="primary"
                                onClick={() => updateUser()}
                              >
                                Yes
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </form>
                      </Modal.Body>
                    </Modal>
                  </td>

                  <td className="opration">
                    <Button variant="warning" onClick={handleDeleteShow}>
                      Delete
                    </Button>

                    <Modal show={deleteShow} onHide={handleDeleteClose}>
                      <Modal.Body>
                        <h4>Do you want delete</h4>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleDeleteClose}>
                          No
                        </Button>
                        <Button
                          variant="primary"
                          onClick={() => deleteData(id)}
                        >
                          Yes
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Home;
