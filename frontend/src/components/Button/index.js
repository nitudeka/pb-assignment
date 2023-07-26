const Button = (props) => {
  const { text, type, onClick } = props;

  return (
    <button
      type={type || "button"}
      className="w-full bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
