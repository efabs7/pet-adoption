import { forwardRef } from "react";
import "./Input.css";

export const Input = forwardRef((props, ref) => {
  const { value, onChange, placeholder } = props;

  const handleInputChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <input
        className="Input"
        ref={ref}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
    </div>
  );
});
