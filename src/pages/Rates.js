import React, { useState } from 'react';
import { useWeb3 } from "../contexts/Web3Provider";
import { useNavigate  } from 'react-router-dom';

import PrimaryTextInput from "../components/PrimaryTextInput"
import PrimaryButton from "../components/PrimaryButton"

const Rates = () => {
    const { role } = useWeb3();
    const [address, setAddress] = useState('');
    const navigate = useNavigate ();
  
    const handleForm = async (event) => {
      event.preventDefault();
      navigate(`/universies/set-rate/${address}`);
    }

      return (
        <div>
        {role === "AUT" && (
            <>
        <form onSubmit={handleForm}>
          <PrimaryTextInput title="Look Up" placeholder="Insert the address to look for" value={address} onChange={setAddress} />
          <div className="mt-4 flex justify-center">
            <PrimaryButton type="submit" label="Consult Rate" />
          </div>
        </form>
        </>
        )}
        {role !== "AUT" && (
            <div className="flex flex-col items-center justify-center min-h-screen">
              <h2 className="text-4xl font-bold text-center text-gray-700">
                Request not suitable for this address
              </h2>
            </div>
          )}
          </div>
      );    
  };

export default Rates;

