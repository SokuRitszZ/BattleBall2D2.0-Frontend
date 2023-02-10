import api from "..";

async function updateAvatarApi(param: { blob: Blob }) {
  const form = new FormData();
  form.append("img", param.blob);
  return api.post("/user/avatar", form);
}

export default updateAvatarApi;
