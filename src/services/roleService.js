import axios from "../setup/axios";
const creaRoles = (roles) => {
  return axios.post("/api/v1/role/create", [...roles]);
};
const fetchAllRole = () => {
  return axios.get(`/api/v1/role/read`);
};

const deleteRole = (role) => {
  return axios.delete("/api/v1/role/delete", {
    data: { id: role.id },
  });
};

const fetchRolesByGroup = (groupId) => {
  return axios.get(`/api/v1/role/by-group/${groupId}`);
};
export { creaRoles, fetchAllRole, deleteRole, fetchRolesByGroup };
