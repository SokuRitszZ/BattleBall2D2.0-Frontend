import api from "..";

async function getInfoApi() {
  return api({
    url: "/user/get_info",
    method: "GET",
  });
}

export default getInfoApi;