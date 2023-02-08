import Container from "@/components/Container";
import { Link } from "react-router-dom";

function IndexView() {
  return (
    <Container>
      <div>
        <div className="text-center text-7xl">
          <p> Battle Ball 2D </p>
          <p className="text-5xl mt-4 text-blue-500"> ---Remaster Version </p>
        </div>
        <div className="w-full text-center mt-5">
          <Link to="/account">
            <button className="m-auto text-3xl px-3 py-2 bg-amber-600 rounded-xl mt-2 text-gray-100 transition hover:bg-amber-700 active:bg-amber-800">
              START
            </button>
          </Link>
        </div>
      </div>
    </Container>
  );
}

export default IndexView;
