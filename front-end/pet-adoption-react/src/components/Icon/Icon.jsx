import "./Icon.css";

export const Icon = (props) => {
  return (
    <span
      className="material-symbols-rounded Icon"
      onClick={props.onClick}
      data-clickable={props.onClick && true}
    >
      {props.children || props.i || "no-icon"}
    </span>
  );
};
