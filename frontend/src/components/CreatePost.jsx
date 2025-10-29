import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const CreatePost = () => {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [age, setAge] = useState(0);
  let [error, setError] = useState("");
  let navigate=useNavigate();

let handleSubmit = async (e) => {
  e.preventDefault();
  let data = { name, email, age };

  try {
    let res = await fetch("https://crud-application-backend-enbv.onrender.com/createUser", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json"
      }
    });

    let result = await res.json();

    if (res.ok) {        // Use res.ok here
      console.log(result);
      setName("");
      setEmail("");
      setAge(0);
      setError("");
      alert("User created successfully");
      navigate("/allPost");
      // Optionally show success message to user
    } else {
      // Backend should return error details
      console.error(result.error || "Unknown error");
      // Optionally show error to user
      setError(result.error || "Error creating user");
    }
  } catch (err) {
    console.error("Network error:", err);
    // Optionally show a network error message to user
  }
};


  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <h2>Enter Data</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
