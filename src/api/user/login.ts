import api from "..";

async function loginApi(params: {
  name: string,
  password: string,
}) {
  return api.post("/user/login", params);
}
export default loginApi;