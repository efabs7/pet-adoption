import "./InputImg.css";

export const InputImg = ({ onChange, placeholder, type }) => {
  return (
    <div>
      <input
        className="InputImg"
        onChange={onChange}
        placeholder={placeholder}
        type={type}
      />
    </div>
  );
};
