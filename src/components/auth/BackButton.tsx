import { useNavigate } from "react-router";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    // Prefer history back when available, otherwise go to home
    if (window.history.length > 1) navigate(-1);
    else navigate("/");
  };

  return (
    <button
      onClick={handleBack}
      aria-label="Go back"
      className="md:hidden absolute left-4 top-6 z-20 inline-flex items-center gap-3 rounded-full bg-white/95 px-3 py-2 text-sm font-medium shadow-sm transition hover:shadow-md"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        className="h-4 w-4"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 18l-6-6 6-6"
        />
      </svg>
      <span className="text-neutral-800">Back</span>
    </button>
  );
};

export default BackButton;
