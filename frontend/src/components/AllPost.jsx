import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const AllPost = () => {
  let [data, setData] = useState(null);

  let handleDelete = async (id) => {
    let res=await fetch(`https://crud-application-backend-enbv.onrender.com/deleteUser/${id}`,{
      method:"DELETE",
      headers:{
        "content-type":"application/json"
      }
    });
    let result=await res.json();
    if(res.ok){
      alert("User deleted successfully");
      allData(); // Refresh the data after deletion
    } else{
      console.error(result.error || "Unknown error");
    }
    
  };

  async function allData() {
    let response = await fetch("https://crud-application-backend-enbv.onrender.com/getAllUser", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      }
    });

    let dataa = await response.json();

    if (response.ok) {
      setData(dataa);
      console.log(dataa);
    } else {
      console.error(dataa.error || "Unknown error");
    }
  }

  useEffect(() => {
    allData();
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        {
          data && data.users && data.users.map((item, index) =>
            <div className="col-md-4 mb-3" key={item._id || index}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{item.email}</h6>
                  <p className="card-text">{item.age}</p>
                  <a href="#" className="card-link" onClick={()=>{handleDelete(item._id)}}>delete</a>
                  <Link to={`/update/${item._id}`} className="card-link">update</Link>
                </div>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default AllPost;
