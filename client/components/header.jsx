import React from "react";

export default function Header(props) {
  return (
    <header className="d-flex bg-dark align-items-center text-light">
      <img className="p-2" src="./images/favicon.png" alt="Wicked Sales logo" width="75px"/>
      <h1 className="ml-3">Wicked Sales</h1>
    </header>
  );
}
