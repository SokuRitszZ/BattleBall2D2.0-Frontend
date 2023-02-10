import { useRef } from 'react';
import typeCropper from 'cropperjs';
import "cropperjs/dist/cropper.min.css";
import "cropperjs/dist/cropper.min";
import { useEffect } from 'react';

type typeProps = any;

function Cropper(props: typeProps) {
  const $img = useRef<HTMLImageElement>(null);
  const $inputFile = useRef<HTMLInputElement>(null);
  
  const cropperRef = useRef<typeCropper>();

  function crop() {
    if (!cropperRef.current) return ;
    cropperRef.current.getCroppedCanvas({
      width: 100,
      height: 100,
    }).toBlob((data: any) => props.onCropped(data));
  }

  function initCropper() {
    const options: typeCropper.Options = {
      aspectRatio: 1 / 1,
      modal: false,
      background: false,
      cropBoxResizable: true,
      crop(e) {},
    }
    if ($img.current) {
      cropperRef.current = new typeCropper($img.current, options);
    }
  } 
  
  function handleChangeImg() {
    if (!$inputFile.current || !$inputFile.current.files) return ;

    const file = $inputFile.current.files[0];
    if (!file.type) return ;
    if (!/image\/.*/.test(file.type)) return alert("不能选择非图片文件");
    const url = URL.createObjectURL(file);

    if (!$img.current) return ;
    $img.current.src = url;
    cropperRef.current!.destroy();
    initCropper();
  }

  useEffect(() => {
    initCropper();
  }, []);

  return (
    <div className={props.className}>
      <div className="w-full flex justify-center p-5 pt-10">
        <img ref={$img} className="w-[200px] h-[200px]" src={props.defaultSrc} alt="avatar" />
      </div>
      <div className='w-full grid grid-cols-2 mt-3 text-3xl gap-2'>
        <label className="w-full text-center px-3 py-2 rounded-lg bg-slate-500 hover:bg-slate-600 active:ring-2 ring-slate-700" htmlFor="input-avatar">选择图片</label>
        <button onClick={crop} className='w-full text-center px-3 py-2 rounded-lg bg-slate-500 hover:bg-slate-600 active:ring-2 ring-slate-700'>裁剪</button>
      </div>
      <input ref={$inputFile} onChange={handleChangeImg} type="file" className="hidden" id="input-avatar" />
    </div>
  );
}

export default Cropper;