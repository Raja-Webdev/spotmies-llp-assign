const Button = ({ children, type = 'button', disabled = false, ...props }) => {
    return (
      <button
        type={type}
        disabled={disabled}
        className={`px-4 py-2 rounded-lg font-medium ${
          disabled
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
        {...props}
      >
        {children}
      </button>
    );
  };
  
  export default Button;