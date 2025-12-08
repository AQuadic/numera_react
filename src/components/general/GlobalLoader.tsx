/**
 * GlobalLoader - Full screen loading spinner shown during app hydration
 * Uses the app's brand colors for a cohesive look
 */
const GlobalLoader = () => {
  return (
    <div className="fixed inset-0 bg-[#FEFEFE] flex flex-col items-center justify-center z-50">
      {/* Logo */}
      <img
        src="/images/header/numra_logo.png"
        alt="Numra"
        className="w-40 mb-8 animate-pulse"
      />

      {/* Spinner */}
      <div className="relative">
        <div className="w-12 h-12 border-4 border-[#F0F0F0] rounded-full"></div>
        <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-[#EBAF29] rounded-full animate-spin"></div>
      </div>

      {/* Loading text */}
      <p className="mt-4 text-[#192540] text-base font-medium">Loading...</p>
    </div>
  );
};

export default GlobalLoader;
