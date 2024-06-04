import React, { useState } from "react";
import { useWeb3 } from "../contexts/Web3Provider";
import { Dimmer, Loader, Segment } from "semantic-ui-react";
import PrimaryTextInput from "../components/PrimaryTextInput";
import PrimaryButton from "../components/PrimaryButton";
import instance from "../ethereum/universies";

// this page is designed for degrees to change their code
const ChangeCode = () => {
  const { web3, account, loading, role, addProps } = useWeb3();
  const [newCode, setNewCode] = useState("");

  // handles the submission of the form
  const handleForm = async (event) => {
    event.preventDefault();

    try {
      await instance.methods.changeCode(newCode).send({ from: account });

      // Reset form values after successful submission
      setNewCode("");
      // Optionally, refetch the current code
    } catch (error) {
      console.error("Transaction failed", error);
    }
  };

  // the following 2 if statements check wether the account is collrectly linked with the wbsite and using a propper browser
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
      {role === "DEG" && (
        <form onSubmit={handleForm}>
          <h2 className="text-4xl font-bold text-center text-gray-700">
            Current Code: {addProps.code}
          </h2>
          <PrimaryTextInput
            title="New Code"
            placeholder="Insert a new code"
            value={newCode}
            onChange={setNewCode}
          />

          <div className="mt-4 flex justify-center">
            <PrimaryButton type="submit" label="Submit" />
          </div>
        </form>
      )}

      {role !== "DEG" && (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h2 className="text-4xl font-bold text-center text-gray-700">
            Request not suitable for this address
          </h2>
        </div>
      )}
    </div>
  );
};

export default ChangeCode;
