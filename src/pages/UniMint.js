import React, { useState } from "react";
import { useWeb3 } from "../contexts/Web3Provider";
import { Dimmer, Loader, Segment } from "semantic-ui-react";
import instance from "../ethereum/universies";

// components
import SecondaryTextInput from "../components/SecondaryTextInput";
import PrimaryButton from "../components/PrimaryButton";

// this page is designed for minting addresses
const UniMint = () => {
  const { web3, account, loading, role } = useWeb3();
  const [address, setAddress] = useState("");
  const [dstCurrency, setDstCurrency] = useState("");
  const [dstCurrencyAmmount, setDstCurrencyAmmount] = useState("0");
  const [dstCode, setDstCode] = useState("Destination Currency reference");

  const roleMapping = {
    0: "NONE",
    1: "STU",
    2: "DEG",
    3: "UNI",
    4: "AUT",
  };

  const changeDstCode = async (event) => {
    const newDstCurrency = event.target.value;
    setDstCurrency(newDstCurrency);

    if (!web3.utils.isAddress(newDstCurrency)) {
      console.error("Invalid Ethereum address");
      setDstCode("Destination Currency reference");
      return;
    }

    try {
      const role = await instance.methods.ownRole(newDstCurrency).call();
      const roleStr = roleMapping[role] || "UNKNOWN";

      if (roleStr === "DEG") {
        const data = await instance.methods.degreeRef(newDstCurrency).call();
        setDstCode(data.code);
      } else {
        setDstCode("Destination Currency reference");
      }
    } catch (error) {
      console.error("Error fetching role or degree data:", error);
      setDstCode("Destination Currency reference");
    }
  };

  // handles the submission of the form
  const handleForm = async (event) => {
    event.preventDefault();

    try {
      await instance.methods
        .uniMint(address, dstCurrencyAmmount, dstCurrency)
        .send({ from: account });
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
    <>
      {(role === "AUT" || role === "UNI" || role === "DEG") && (
        <form onSubmit={handleForm}>
          <SecondaryTextInput
            title="To Address"
            placeholder="Insert the destination address of the transaction"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <SecondaryTextInput
            title={dstCode}
            placeholder="Insert the destination currency address"
            value={dstCurrency}
            onChange={changeDstCode}
          />
          <SecondaryTextInput
            title="Sending Value"
            placeholder="Insert the desired value to send"
            value={dstCurrencyAmmount}
            onChange={(e) => setDstCurrencyAmmount(e.target.value)}
          />
          <div className="mt-4 flex justify-center">
            <PrimaryButton type="submit" label="Submit" />
          </div>
        </form>
      )}
      {role !== "AUT" && role !== "UNI" && role !== "DEG" && (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h2 className="text-4xl font-bold text-center text-gray-700">
            Request not suitable for this address
          </h2>
        </div>
      )}
    </>
  );
};

export default UniMint;
