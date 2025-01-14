export const Button = ({ children, onClick, variant = 'primary', className, disabled }) => {
    const baseStyles =
      "px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-300";
    const variants = {
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
      success: "bg-green-600 text-white hover:bg-green-700",
    };
  
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${baseStyles} ${variants[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""
          } ${className}`}
      >
        {children}
      </button>
    );
  };