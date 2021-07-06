import http from "./httpService";

class AuthService {
  login(email, password) {
    return http
      .post("/auth/signin", {
        email,
        password,
      })
      .then((res) => {
        if (res.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(res.data));
        }
        return res.data;
      });
  }

  logOut() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
