import { useEffect, useState } from "react";
import { fetchAllUser } from "../../services/userService";
import ReactPaginate from "react-paginate";

const Users = (props) => {
  const [listusers, setListUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(2);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    let response = await fetchAllUser(currentPage, currentLimit);
    if (response && response.data && response.data.EC === 0) {
      console.log(response.data.DT);
      setTotalPages(response.data.DT.totalPages);
      setListUsers(response.data.DT.users);
    }
  };
  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
    // await fetchUsers(+event.selected + 1);
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
        {totalPages > 0 && (
          <div className="user-footer">
            <ReactPaginate
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={totalPages}
              previousLabel="< previous"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
