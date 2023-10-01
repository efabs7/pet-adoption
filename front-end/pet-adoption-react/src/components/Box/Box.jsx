import "./Box.css";

const Box = (props) => {
  return (
    <div className="Box">
      <div>{props.children}</div>
    </div>
  );
};

export default Box;
