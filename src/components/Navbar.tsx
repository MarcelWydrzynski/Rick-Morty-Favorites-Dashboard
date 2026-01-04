import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  async function handleLogout() {
    await signOut();
    navigate("/login");
  }

  return (
    <div className="flex justify-between items-center mb-6 max-[650px]:flex-col w-full gap-4">
      <h1 className="text-2xl text-white font-semibold">Rick & Morty Characters</h1>

      <div className="flex space-x-2">
        <button
          onClick={() => navigate("/favorites")}
          className="cursor-pointer bg-indigo-600 px-3 py-1 rounded-lg text-white"
        >
          Favorites
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          className="cursor-pointer bg-indigo-600 px-3 py-1 rounded-lg text-white"
        >
          Dashboard
        </button>

        <button
          onClick={handleLogout}
          className="cursor-pointer bg-red-600 px-3 py-1 rounded-lg text-white"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Navbar
