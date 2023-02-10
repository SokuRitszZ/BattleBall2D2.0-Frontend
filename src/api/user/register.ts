import api from "..";

async function registerApi(params: {
  name: string,
  password: string,
  confirmedPassword: string,
}) {
  return api.post("/user/register", params);
}

export default registerApi;