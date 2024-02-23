import React, { useEffect, useState } from "react";
import "./SearchBar.scss";
import { useUser } from "../../../hooks/useUser";

export const SearchBar = ({ setSearch }) => {
  const { users, loading, getUsers, auth } = useUser();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  const handleChange = (e) => {
    const searchText = e.target.value;
    setSearchText(searchText);
    setSearch(searchText);
  };
  return (
    <>
      <div className="containerInput">
        <input
          className="form-control inputSearch"
          value={searchText}
          placeholder="Buscar por nombre..."
          onChange={handleChange}
          type="text"
        />
        <button
          className="btn btn-success"
          onClick={() => setSearch(searchText)}
        >
          
        </button>
      </div>
    </>
  );
};
