import axios from "../setup/axios";
const creaRoles = (roles) => {
  return axios.post("/api/v1/role/create", [...roles]);
};

export { creaRoles };
