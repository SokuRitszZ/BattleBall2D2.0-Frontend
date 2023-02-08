function Container(props: { children: any }) {
  return (
    <div className="w-screen h-screen min-w-[1200px] min-h-[800px] flex justify-center items-center">
      {props.children}
    </div>
  );
}

export default Container;
