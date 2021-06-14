function Button(props) {
  let { callback, className, text } = props;
  return (
    <div onClick={callback} className={className}>{text}</div>
  );
}

export default Button;