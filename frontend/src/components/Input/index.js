const Input = (props) => {
  const { onChange, value, label, name, placeholder, icon, type } = props;

  return (
    <div className="mt-4 relative">
      <label
        className="block font-bold px-1 absolute left-2 -top-2 bg-white text-gray-500 text-xs b"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        onChange={({ target: { value } }) => onChange(value)}
        className="focus:border-gray-700 pr-11 appearance-none border rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
        id={name}
        value={value}
        type={type || "text"}
        placeholder={placeholder}
      />
      {icon && <img src={icon} className="absolute z-10 h-6 right-3 top-2.5" />}
    </div>
  );
};

export default Input;
