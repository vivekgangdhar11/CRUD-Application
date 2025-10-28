import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user data for prefill
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`http://localhost:5000/getUser/${id}`);
        const result = await response.json();
        if (response.ok) {
          setName(result.user.name || "");
          setEmail(result.user.email || "");
          setAge(result.user.age || 0);
        } else {
          setError(result.message || "Failed to fetch user");
        }
      } catch (err) {
        setError("Network error: " + err);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, email, age: Number(age) };
    try {
      const res = await fetch(`http://localhost:5000/updateUser/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json"
        }
      });

      const result = await res.json();
      if (res.ok) {
        alert("User updated successfully");
        navigate("/allPost");
      } else {
        setError(result.error || "Unknown error");
      }
    } catch (err) {
      setError("Network error: " + err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
          />
        </div>
        {error && <div className="alert alert-danger mt-2">{error}</div>}
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default Update;
