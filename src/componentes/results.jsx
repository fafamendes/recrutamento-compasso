
function Results(props) {
  let {user} = props;
  console.log(props)
  return (
   
    <div>
      {user && user.name}
    </div>
  );
}

export default Results;