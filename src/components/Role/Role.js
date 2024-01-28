import "./Role.scss";
import { useEffect, useState } from "react";
import _, { values } from "lodash";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { creaRoles } from "../../services/roleService";
const Role = (props) => {
  const dataChildDefault = { url: "", description: "", isValidUrl: true };
  const [listChilds, setListChids] = useState({
    child1: dataChildDefault,
  });

  useEffect(() => {
    Object.entries(listChilds).map(([key, value]) => {
      console.log(key, value);
    });
  }, []);
  const handleOnChangeInput = (name, value, key) => {
    let _listChilds = _.cloneDeep(listChilds);
    _listChilds[key][name] = value;
    if (value && name === "url") {
      _listChilds[key]["isValidUrl"] = true;
    }
    setListChids(_listChilds);
  };
  const handleAddNewInput = () => {
    let _listChilds = _.cloneDeep(listChilds);
    _listChilds[`child-${uuidv4()}`] = dataChildDefault;
    setListChids(_listChilds);
  };
  const hadleDeleteInput = (key) => {
    let _listChilds = _.cloneDeep(listChilds);
    delete _listChilds[key];
    setListChids(_listChilds);
  };
  const buildDataToPersist = () => {
    let _listChilds = _.cloneDeep(listChilds);
    let result = [];
    Object.entries(_listChilds).map(([key, child], index) => {
      result.push({
        url: child.url,
        description: child.description,
      });
    });

    return result;
  };
  const handleSave = async () => {
    let check = true;
    let invalidObj = Object.entries(listChilds).find(([key, child], index) => {
      return child && !child.url;
    });

    if (!invalidObj) {
      let data = buildDataToPersist();
      let res = await creaRoles(data);
      if (res && res.EC === 0) {
        toast.success(res.EM);
      }
      console.log(data);
    } else {
      toast.error("Input URL must not be empty....");
      let _listChilds = _.cloneDeep(listChilds);
      const key = invalidObj[0];
      _listChilds[key]["isValidUrl"] = false;
      setListChids(_listChilds);
    }
  };
  return (
    <>
      <div className="role-container">
        <div className="container">
          <div className=" mt-4">
            <div className="title-role">
              {" "}
              <h4>Add a new role</h4>
              <div className=" role-parent">
                {Object.entries(listChilds).map(([key, child], index) => {
                  return (
                    <div className=" row row-child" key={`child-${key}`}>
                      <div className={`col-5 form-group ${key}`}>
                        <label>URL</label>
                        <input
                          type="text"
                          className={
                            child.isValidUrl
                              ? "form-control"
                              : "form-control is-invalid"
                          }
                          value={child.url}
                          onChange={(event) =>
                            handleOnChangeInput("url", event.target.value, key)
                          }
                        />
                      </div>
                      <div className="col-5 form-group">
                        <label>Description:</label>
                        <input
                          type="text"
                          className="form-control"
                          value={child.description}
                          onChange={(event) =>
                            handleOnChangeInput(
                              "description",
                              event.target.value,
                              key
                            )
                          }
                        />
                      </div>
                      <div className="col-2 mt-4 actions">
                        {/* <label></label> */}
                        <i
                          className="fa fa-plus-circle add"
                          onClick={() => handleAddNewInput()}
                        ></i>
                        {index >= 1 && (
                          <i
                            className="fa fa-trash-o delete mr-3"
                            onClick={() => hadleDeleteInput(key)}
                          ></i>
                        )}
                      </div>
                    </div>
                  );
                })}

                <div>
                  <button
                    className="btn btn-warning mt-4"
                    onClick={() => handleSave()}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Role;
