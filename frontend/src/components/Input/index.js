const Input = (props) => {
  const { error, onChange, value, label, name, placeholder, icon, type } =
    props;

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
        className={[
          error ? "border-red-500" : "focus:border-gray-700",
          "pr-11 border appearance-none rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm",
        ].join(" ")}
        id={name}
        value={value}
        type={type || "text"}
        placeholder={placeholder}
      />
      {icon && <img src={icon} className="absolute z-10 h-6 right-3 top-2.5" />}
      {error && (
        <span className="text-xs text-red-500 ml-3 block -mt-.5">{error}</span>
      )}
    </div>
  );
};

export default Input;
