import wait from "@/utils/wait";

async function loginApi(params: {
  name: string,
  password: string,
}) {
  return wait(100).then(() => {
    return {
      token: "",
    };
  });
}
export default loginApi;