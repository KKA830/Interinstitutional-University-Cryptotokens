import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// components
import PrimaryTextInput from "../components/PrimaryTextInput";
import PrimaryButton from "../components/PrimaryButton";

// this page is designed to look up an address
const Search = () => {
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  // handles the submission of the form
  const handleForm = async (event) => {
    event.preventDefault();
    navigate(`/universies/add-info/${address}`);
  };

  // outputs page
  return (
    <form onSubmit={handleForm}>
      <PrimaryTextInput
        title="Look Up"
        placeholder="Insert the address to look for"
        value={address}
        onChange={setAddress}
      />
      <div className="mt-4 flex justify-center">
        <PrimaryButton type="submit" label="Search" />
      </div>
    </form>
  );
};

export default Search;
