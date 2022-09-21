import "./Button.css";

function Button({ value, className, onclick }) {
  return (
    <button className={className} onClick={onclick}>
      {value}
    </button>
  );
}

export default Button;
