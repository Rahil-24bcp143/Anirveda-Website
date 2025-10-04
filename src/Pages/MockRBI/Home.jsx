import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <h1 className="text-5xl font-extrabold mb-10 text-[#C9872B]">
        MOCK-RBI
      </h1>
      <button
        onClick={() => navigate("/mock-rbi/playerlogin")}
        className="px-8 py-3 rounded-lg font-bold text-black text-lg bg-[#C9872B] hover:bg-[#b07625] transition"
      >
        Login as Team
      </button>
    </div>
  );
};

export default Home;