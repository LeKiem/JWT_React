import "./Role.scss";
import { useEffect, useState } from "react";
import _, { values } from "lodash";
import { v4 as uuidv4 } from "uuid";

const Role = (props) => {
  const [listChilds, setListChids] = useState({
    child1: { url: "", description: "" },
  });

  useEffect(() => {
    Object.entries(listChilds).map(([key, value]) => {
      console.log(key, value);
    });
  }, []);
  const handleOnChangeInput = (name, value, key) => {
    let _listChilds = _.cloneDeep(listChilds);
    _listChilds[key][name] = value;
    setListChids(_listChilds);
  };
  const handleAddNewInput = () => {
    let _listChilds = _.cloneDeep(listChilds);
    _listChilds[`child-${uuidv4()}`] = {
      url: "",
      description: "",
    };
    setListChids(_listChilds);
  };
  const hadleDeleteInput = (key) => {
    let _listChilds = _.cloneDeep(listChilds);
    delete _listChilds[key];
    setListChids(_listChilds);
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
                          className="form-control"
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
                  <button className="btn btn-warning mt-4">Save</button>
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
