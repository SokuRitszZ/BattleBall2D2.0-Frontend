import wait from "@/utils/wait";

async function updateAvatarApi(param: { blob: Blob }) {
  return wait(1000).then(() => {
    return `https://sdfsdf.dev/100x100.png,${(Math.random() * 1000000) >>> 0},${
      (Math.random() * 1000000) >>> 0
    }`;
  });
}

export default updateAvatarApi;
