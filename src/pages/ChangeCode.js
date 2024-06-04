import React, { useState } from "react";
import { useWeb3 } from "../contexts/Web3Provider";
import PrimaryTextInput from "../components/PrimaryTextInput";
import PrimaryButton from "../components/PrimaryButton";
import instance from "../ethereum/universies";

const ChangeCode = () => {
  const { account, loading, role, addProps } = useWeb3();
  const [newCode, setNewCode] = useState("");

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

  if (loading) {
    return <div>Loading...</div>;
  }

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
