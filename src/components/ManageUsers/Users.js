import { useEffect, useState } from "react";
import { fetchAllUser } from "../../services/userService";

const Users = (props) => {
  const [listusers, setListUsers] = useState([]);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    let response = await fetchAllUser();
    if (response && response.data && response.data.EC === 0) {
      setListUsers(response.data.DT);
      console.log(response.data.DT);
    }
  };
  return (
    <div className="container">
      <div className="managet-users-container">
        <div className="user-header">
          <div className="title">
            <h3>Table</h3>
          </div>
          <div className="actions">
            <button className="btn btn-success">Refesh</button>
            <button className="btn btn-primary">Add new</button>
          </div>
        </div>
        <div className="user-body">
          <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">ID</th>
                <th scope="col">Email</th>
                <th scope="col">Username</th>
                <th scope="col">Group</th>
              </tr>
            </thead>
            <tbody>
              {listusers && listusers.length > 0 ? (
                <>
                  {listusers.map((item, index) => {
                    return (
                      <tr key={`row-${index}`}>
                        {/* <td>{index + 1}</td> */}
                        <td>{item.id}</td>
                        <td>{item.email}</td>
                        <td>{item.username}</td>
                        <td>{item.phone}</td>
                        <td>{item.Group ? item.Group.name : ""}</td>
                      </tr>
                    );
                  })}
                </>
              ) : (
                <>
                  <span>Not found users</span>
                </>
              )}
            </tbody>
          </table>
        </div>

        <div className="user-footer">
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item">
                <a class="page-link" href="#">
                  Previous
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  1
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  2
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  3
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Users;
