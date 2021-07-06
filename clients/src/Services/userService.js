import http from "./httpService";

const UserDataService = {
  create(data) {
    return http.post("/auth/signup", data);
  },
};

export default UserDataService;
