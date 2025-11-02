const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      {/* Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-8 h-8 text-green-600"
      >
        <path d="M3 3h18v2H3V3zm2 4h14v2H5V7zm-2 4h18v2H3v-2zm2 4h14v2H5v-2zm-2 4h18v2H3v-2z" />
      </svg>
      {/* Text */}
      <span className="text-xl font-bold text-gray-800">
        Excel<span className="text-green-600">Analytics</span>
      </span>
    </div>
  );
};

export default Logo;
