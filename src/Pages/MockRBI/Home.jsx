import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/moving-border";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <h1 className="text-9xl font-extrabold mb-10 text-[#C9872B]">
        MOCK-RBI
        
      </h1>
      <h3 className="text-3xl font-extrabold mb-10 text-[#C9872B]">By Anirveda</h3>
      <Button
        onClick={() => navigate("/mock-rbi/playerlogin")}
        className="font-bold text-white text-lg bg-[#C9872B] hover:bg-[#b07625] border-[#C9872B]/50"
        borderClassName="bg-[radial-gradient(#C9872B_40%,transparent_60%)]"
        containerClassName="w-48"
        duration={2000}
      >
        Team Login
      </Button>
    </div>
  );
};

export default Home;