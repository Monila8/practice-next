import axios from "axios";
import { useState } from "react";

export default function NewUsers(params) {
  const [name, setName] = useState("");

  function handleSendBtnClick() {
    axios
      .post("http://localhost:3001/users", {
        message: name,
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .then(function onSucces(params) {
        setName("");
      })
      .catch(function onError(params) {
        alert("Error");
      });
  }

  function handleNameInputChange(event) {
    setName(event.target.value);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Insert name"
        value={name}
        onChange={handleNameInputChange}
      />
      <button onClick={handleSendBtnClick} disabled={!name.length}>
        Save
      </button>
    </div>
  );
}
