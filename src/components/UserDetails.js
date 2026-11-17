import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const UserDetails = ({ user: propUser }) => {
  const params = useParams();
  const id = params ? params.id : null;
  const [user, setUser] = useState(propUser || null);
  const [loading, setLoading] = useState(!propUser);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    } else if (propUser) {
      setUser(propUser);
      setLoading(false);
    }
  }, [id, propUser]);

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>Name: {user.name}</p>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Website: {user.website}</p>
    </div>
  );
};

export default UserDetails;
