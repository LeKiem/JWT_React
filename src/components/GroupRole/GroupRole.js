import "./GroupRole.scss";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { fetchGroup } from "../../services/userService";
import {
  fetchAllRole,
  fetchRolesByGroup,
  assignRoleToGroup,
} from "../../services/roleService";
import _ from "lodash";

const GroupRole = () => {
  const [userGroup, setUserGroup] = useState([]);
  const [selectGroup, setSelectGroup] = useState("");
  const [listRoles, setListRoles] = useState("");
  const [assighRolesByGroup, setAssignRoleByGroup] = useState([]);

  useEffect(() => {
    getGroups();
    getAllRoles();
    // getRolesByGroup();
  }, []);
  const getGroups = async () => {
    let res = await fetchGroup();
    if (res && res.EC === 0) {
      setUserGroup(res.DT);
    } else {
      toast.error(res.EM);
    }
  };
  const getAllRoles = async () => {
    let data = await fetchAllRole();
    if (data && +data.EC === 0) {
      setListRoles(data.DT);
    }
  };
  const hanleOnChangeGroup = async (value) => {
    setSelectGroup(value);
    if (value) {
      let data = await fetchRolesByGroup(value);
      if (data && +data.EC === 0) {
        // setListRoles(data.DT);
        let result = buildDataRolesByGroup(data.DT.Roles, listRoles);
        setAssignRoleByGroup(result);
      }
    }
    // alert(value);
  };

  const buildDataRolesByGroup = (groupRoles, allRoles) => {
    let result = [];
    if (allRoles && allRoles.length > 0) {
      allRoles.map((role) => {
        let obj = {};
        obj.url = role.url;
        obj.description = role.description;
        obj.id = role.id;
        obj.isAssigned = false;
        if (groupRoles && groupRoles.length > 0) {
          obj.isAssigned = groupRoles.some((item) => item.url === obj.url);
        }

        result.push(obj);
      });
    }
    return result;
  };
  const handleSelectRole = (value) => {
    const _assighRolesByGroup = _.cloneDeep(assighRolesByGroup);
    let foundIndex = _assighRolesByGroup.findIndex(
      (item) => +item.id === +value
    );
    if (foundIndex > -1) {
      _assighRolesByGroup[foundIndex].isAssigned =
        !_assighRolesByGroup[foundIndex].isAssigned;
    }
    setAssignRoleByGroup(_assighRolesByGroup);
  };
  const buildDataToSave = () => {
    let result = {};
    const _assighRolesByGroup = _.cloneDeep(assighRolesByGroup);
    result.groupId = selectGroup;
    let groupRolesFilter = _assighRolesByGroup.filter(
      (item) => item.isAssigned === true
    );
    let finalGroupRoles = groupRolesFilter.map((item) => {
      let data = { groupId: +selectGroup, roleId: +item.id };
      return data;
    });
    result.groupRoles = finalGroupRoles;
    return result;
  };
  const handleSave = async () => {
    let data = buildDataToSave();
    let res = await assignRoleToGroup(data);
    if (res && res.EC === 0) {
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
    // console.log("check data: ", data);
    // assignRoleToGroup();
  };
  return (
    <>
      <div className="group-role-container">
        <div className="container">
          <div className="container mt-4">
            <h4>Group Role</h4>
            <div className="assign-group-role">
              <div className="col-12 col-sm-6 form-group">
                <label>
                  Select roles (<span className="red-color">*</span>)
                </label>
                <select
                  className={"form-select"}
                  onChange={(event) => hanleOnChangeGroup(event.target.value)}
                >
                  <option value="">Please select your group..</option>
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
              <hr />
              {selectGroup && (
                <div className="roles">
                  <h4> Assign Roles:</h4>
                  {assighRolesByGroup &&
                    assighRolesByGroup.length > 0 &&
                    assighRolesByGroup.map((item, index) => {
                      return (
                        <div className="form-check" key={`list-role-${index}`}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value={item.id}
                            id={`list-role-${index}`}
                            checked={item.isAssigned}
                            onChange={(event) =>
                              handleSelectRole(event.target.value)
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`list-role-${index}`}
                          >
                            {item.url}
                          </label>
                        </div>
                      );
                    })}
                  <div className="mt-4">
                    <button
                      className="btn btn-success"
                      onClick={() => handleSave()}
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupRole;
