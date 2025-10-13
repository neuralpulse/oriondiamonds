import { useNavigate } from "react-router-dom";

export function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-center">
      <h1 className="text-6xl font-bold text-[#0a1833] mb-4">404</h1>
      <p className="text-[#0a1833] text-lg mb-6">
        Oops! The page you're looking for doesn’t exist.
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-[#0a1833] text-white px-8 py-3 rounded-lg hover:bg-[#142850] transition"
      >
        Go Home
      </button>
    </div>
  );
}
