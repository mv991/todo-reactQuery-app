import React, { useState } from "react";
import './Modal.css'
function InputArea(props) {
  const [title, setTitle] = useState("");

  function handleChange(event) {
    const newValue = event.target.value;

    setTitle(newValue);
  }

  return (
    <div className="form">
      <input onChange={handleChange} type="text" value={title}  required />
      <button
        onClick={() => {
          props.onAdd(title);
          setTitle("");
        }}
      >
        <span>Add</span>
      </button>
    </div>
  );
}

export default InputArea;