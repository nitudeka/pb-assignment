const Button = (props) => {
  const { text } = props;

  return (
    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
      {text}
    </button>
  );
};

export default Button;
