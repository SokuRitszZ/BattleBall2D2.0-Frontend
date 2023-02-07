import wait from "@/utils/wait";
import axios from "axios";

async function loginApi(params: {
  name: string,
  password: string,
}) {
  return wait(1000).then(() => {
    return {
      token: "",
    };
  });
  return axios({
    method: "GET",
    params,
    url: ""
  });
}
export default loginApi;