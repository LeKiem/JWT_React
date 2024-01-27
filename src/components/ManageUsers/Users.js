import { useEffect, useState } from "react";
import { fetchAllUser, deleteUser } from "../../services/userService";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import "./Users.scss";
import ModalDelete from "./ModalDelete";
import ModalUser from "./ModalUser";
const Users = (props) => {
  const [listusers, setListUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(4);
  const [totalPages, setTotalPages] = useState(0);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  //modal delete
  const [dataModal, setDataModal] = useState({});
  const [isShowModaluser, setIsShowModalUser] = useState(false);
  const [actionModaluser, setActionModaluser] = useState("CREATE");
  //modal update
  const [dataModalUser, setDataModaluser] = useState({});

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    let response = await fetchAllUser(currentPage, currentLimit);
    if (response && response.EC === 0) {
      console.log(response.DT);
      setTotalPages(response.DT.totalPages);
      setListUsers(response.DT.users);
    }
  };
  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
    // await fetchUsers(+event.selected + 1);
  };
  const handelDeleteuser = async (user) => {
    setDataModal(user);
    setIsShowModalDelete(true);
  };
  const handleClose = (user) => {
    setDataModal({});
    setIsShowModalDelete(false);
  };
  const confrmDeleteUser = async (user) => {
    let response = await deleteUser(dataModal);
    console.log(response);
    if (response && response.EC === 0) {
      await fetchUsers();
      setIsShowModalDelete(false);
      toast.success(response.EM);
    } else {
      toast.error(response.EM);
    }
  };
  const onHideModaluser = async () => {
    setIsShowModalUser(false);
    setDataModaluser({});
    await fetchUsers();
  };
  const handelEditUser = (user) => {
    setActionModaluser("UPDATE");
    setDataModaluser(user);
    setIsShowModalUser(true);
  };
  const handleRefresh = async () => {
    await fetchUsers();
  };
  return (
    <>
      <div className="container">
        <div className="managet-users-container">
          <div className="user-header">
            <div className="title mt-3">
              <h3>Manage User</h3>
            </div>
            <div className="actions my-4">
              <button
                className="btn btn-success refresh"
                onClick={() => handleRefresh()}
              >
                {" "}
                <i class="fa fa-refresh"></i>
                Refesh
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setIsShowModalUser(true);
                  setActionModaluser("CREATE");
                }}
              >
                <i class="fa fa-plus-circle"></i>
                Add new
              </button>
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
                          <td>
                            {(currentPage - 1) * currentLimit + index + 1}
                          </td>
                          <td>{item.id}</td>
                          <td>{item.email}</td>
                          <td>{item.username}</td>
                          <td>{item.phone}</td>
                          <td>{item.Group ? item.Group.name : ""}</td>
                          <td>
                            <button
                              className="btn btn-warning mx-3"
                              onClick={() => handelEditUser(item)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => handelDeleteuser(item)}
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
      <ModalDelete
        show={isShowModalDelete}
        handleClose={handleClose}
        confrmDeleteUser={confrmDeleteUser}
        dataModal={dataModal}
      />
      <ModalUser
        // title={"Create A New User"}
        onHide={onHideModaluser}
        show={isShowModaluser}
        action={actionModaluser}
        dataModalUser={dataModalUser}
      />
    </>
  );
};

export default Users;
