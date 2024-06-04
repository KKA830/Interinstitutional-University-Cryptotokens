import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';

import PrimaryTextInput from "../components/PrimaryTextInput"
import PrimaryButton from "../components/PrimaryButton"

const Search = () => {
    const [address, setAddress] = useState('');
    const navigate = useNavigate ();
  
    const handleForm = async (event) => {
      event.preventDefault();
      navigate(`/universies/add-info/${address}`);
    }

      return (
        <form onSubmit={handleForm}>
          <PrimaryTextInput title="Look Up" placeholder="Insert the address to look for" value={address} onChange={setAddress} />
          <div className="mt-4 flex justify-center">
            <PrimaryButton type="submit" label="Search" />
          </div>
        </form>
      );    
  };

export default Search;

