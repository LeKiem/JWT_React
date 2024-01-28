import {
  useEffect,
  useState,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";
import { fetchAllRole, deleteRole } from "../../services/roleService";
import { toast } from "react-toastify";

const TableRole = forwardRef((props, ref) => {
  const [listRoles, setListRoles] = useState("");
  useEffect(() => {
    getAllRoles();
  }, []);
  useImperativeHandle(ref, () => ({
    fetchListRolesAgain() {
      getAllRoles();
    },
  }));
  const handelDeleteRoles = async (role) => {
    let data = await deleteRole(role);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      await getAllRoles();
    }
  };
  const getAllRoles = async () => {
    let data = await fetchAllRole();
    if (data && +data.EC === 0) {
      setListRoles(data.DT);
    }
  };
  return (
    <>
      {" "}
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">URL</th>
            <th scope="col">Description</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listRoles && listRoles.length > 0 ? (
            <>
              {listRoles.map((item, index) => {
                return (
                  <tr key={`row-${index}`}>
                    <td>{item.id}</td>
                    <td>{item.url}</td>
                    <td>{item.description}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handelDeleteRoles(item)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </>
          ) : (
            <>
              <span>Not found role</span>
            </>
          )}
        </tbody>
      </table>
    </>
  );
});

export default TableRole;
