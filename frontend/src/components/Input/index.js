const Input = (props) => {
  const { label, placeholder, icon, type } = props;

  return (
    <div className="mt-4 relative">
      <label
        className="block font-bold px-1 absolute left-2 -top-2 bg-white text-gray-500 text-xs b"
        for="username"
      >
        {label}
      </label>
      <input
        className="appearance-none border rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
        id="username"
        type={type || "text"}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
