import wait from "@/utils/wait";

async function registerApi(params: {
  name: string,
  password: string,
  confirmedPassword: string,
}) {
  return wait(100).then(() => {
    return { token: "" };
  });
}

export default registerApi;