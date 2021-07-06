import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8180/api",
  headers: {
    "Content-type": "application/json",
    "X-Custom-Header": "foobar",
  },
});
