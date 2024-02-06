import React from "react"
import ReactDOM from "react-dom"
import Button from '@mui/material/Button'

const MUIButton = () => {
  function sayHello() {
    alert('Hello, World!');
  }

  return (
    <Button variant="contained">Olá Mundo!!!</Button>
  );
};

export default MUIButton;
// export default function Welcome(props) {
//   return <h1>Hello, {props.name}</h1>;
// }

// ReactDOM.render(
//   <MUIButton />,
//   document.getElementById('mui')
// );