import React, { useState } from "react";
import { useWeb3 } from "../contexts/Web3Provider";
import { Dimmer, Loader, Segment } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

// components
import PrimaryTextInput from "../components/PrimaryTextInput";
import PrimaryButton from "../components/PrimaryButton";

// this page is designed for the AUT address look up the exchange rates of degree currencies
const Rates = () => {
  const { web3, loading, role } = useWeb3();
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  // handles the submission of the form
  const handleForm = async (event) => {
    event.preventDefault();
    navigate(`/universies/set-rate/${address}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h2 className="text-4xl font-bold text-center text-gray-700">
          <Segment>
            <Dimmer active inverted>
              <Loader inverted content="Connecting to MetaMask..." />
            </Dimmer>
          </Segment>
        </h2>
      </div>
    );
  }

  if (!web3) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h2 className="text-4xl font-bold text-center text-gray-700">
          Please use a browser that supports web3
        </h2>
      </div>
    );
  }

  // based on the role, outputs an appropriate page
  return (
    <div>
      {role === "AUT" && (
        <>
          <form onSubmit={handleForm}>
            <PrimaryTextInput
              title="Look Up"
              placeholder="Insert the address to look for"
              value={address}
              onChange={setAddress}
            />
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
