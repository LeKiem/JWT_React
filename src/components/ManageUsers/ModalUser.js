import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { fetchGroup, createNewuser } from "../../services/userService";
import { toast } from "react-toastify";
import _ from "lodash";

const ModalUser = (props) => {
  const defaultUserData = {
    email: "",
    phone: "",
    username: "",
    password: "",
    address: "",
    sex: "",
    group: "",
  };

  const validInputsDefault = {
    email: true,
    phone: true,
    username: true,
    password: true,
    address: true,
    sex: true,
    group: true,
  };

  const [userData, setUserData] = useState(defaultUserData);
  const [valiInputs, setValisInputs] = useState(validInputsDefault);
  const [userGroup, setUserGroup] = useState([]);
  useEffect(() => {
    getGroups();
  }, []);

  const getGroups = async () => {
    let res = await fetchGroup();
    if (res && res.data && res.data.EC === 0) {
      setUserGroup(res.data.DT);
      if (res.data.DT && res.data.DT.length > 0) {
        let groups = res.data.DT;
        setUserData({ ...userData, group: groups[0].id });
      }
    } else {
      toast.error(res.data.EM);
    }
  };
  const handleOnChangeInput = (value, name) => {
    let __userData = _.cloneDeep(userData);
    __userData[name] = value;
    setUserData(__userData);
  };

  const checkValidateInputs = () => {
    setValisInputs(validInputsDefault);

    let arr = ["email", "phone", "password", "address", "group"];
    let check = true;
    for (let i = 0; i < arr.length; i++) {
      if (!userData[arr[i]]) {
        let _valiInputs = _.cloneDeep(validInputsDefault);
        _valiInputs[arr[i]] = false;
        setValisInputs(_valiInputs);
        toast.error(`Empty input ${arr[i]}`);
        check = false;
        break;
      }
    }

    return check;
  };

  const handleConfirmUser = async () => {
    let check = checkValidateInputs();
    if (check === true) {
      let res = await createNewuser({
        ...userData,
        groupId: userData["group"],
      });
      if (res.data && res.data.EC === 0) {
        props.onHide();
        setUserData({ ...defaultUserData, group: userGroup[0].id });
      } else {
        toast.error(`Error create user...`);
      }
      console.log(res);
    }
  };
  return (
    <>
      <Modal
        size="lg"
        show={props.show}
        className="modal-user"
        onHide={props.onHide}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <span>{props.title}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body row">
            <div className="col-12 col-sm-6 form-group">
              <label>
                Email (<span className="red-color">*</span>)
              </label>
              <input
                className={
                  valiInputs.email ? "form-control" : "form-control is-invalid"
                }
                type="email"
                value={userData.email}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "email")
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Phone number (<span className="red-color">*</span>)
              </label>
              <input
                className={
                  valiInputs.phone ? "form-control" : "form-control is-invalid"
                }
                type="text"
                value={userData.phone}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "phone")
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>Username</label>
              <input
                className="form-control"
                type="text"
                value={userData.username}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "username")
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Password (<span className="red-color">*</span>)
              </label>
              <input
                className={
                  valiInputs.password
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="password"
                value={userData.password}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "password")
                }
              />
            </div>
            <div className="col-12 col-sm-12 form-group">
              <label>
                Address (<span className="red-color">*</span>)
              </label>
              <input
                className={
                  valiInputs.address
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="text"
                value={userData.address}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "address")
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>Gender</label>
              <select
                className="form-select"
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "sex")
                }
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other ">Other</option>
              </select>
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Group (<span className="red-color">*</span>)
              </label>
              <select
                className={
                  valiInputs.group ? "form-select" : "form-select is-invalid"
                }
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "group")
                }
              >
                {userGroup.length > 0 &&
                  userGroup.map((item, index) => {
                    return (
                      <option key={`group-${index}`} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} variant="secondary">
            Close
          </Button>
          <Button variant="primary" onClick={() => handleConfirmUser()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUser;
