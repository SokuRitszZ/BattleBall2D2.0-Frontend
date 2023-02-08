import updateAvatarApi from "@/api/user/update_avatar";
import Container from "@/components/Container";
import Cropper from "@/components/Cropper";
import { useContext } from "react";
import { UserStore } from "@/store/user";
import { useNavigate } from 'react-router-dom';

function SettingsView() {
  const nav = useNavigate();
  const { user, setUser } = useContext(UserStore);

  async function handleCropped(data: any) {
    try {
      const url = await updateAvatarApi({ blob: data });
      setUser({
        ...user,
        avatar: url,
      });
    } catch (e) {
      alert("更换头像失败");
    }
  }

  return (
    <Container>
      <div className="bg-slate-400 rounded-xl shadow-lg pb-5 p-5">
        <button onClick={() => nav(-1)} className="text-xl text-gray-800 rounded-lg px-2 py-1 bg-slate-500 hover:bg-slate-600 active:ring-2 ring-slate-700">返回</button>
        <Cropper onCropped={handleCropped} defaultSrc={user.avatar} />
      </div>
    </Container>
  );
}

export default SettingsView;
