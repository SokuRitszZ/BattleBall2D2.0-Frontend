import wait from "@/utils/wait";

async function getInfoApi(params: {
  token: string;
}) {
  return wait(1000).then(() => {
    return {
      id: Math.random().toString(),
      name: "Bernadette",
      avatar: "https://sdfsdf.dev/100x100.png",
    }
  });
}

export default getInfoApi;