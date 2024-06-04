import React, { useEffect, useState } from 'react';
import { useWeb3 } from '../contexts/Web3Provider';

import PrimaryTextInput from "../components/PrimaryTextInput"
import SplitPrimaryTextInput from "../components/SplitPrimaryTextInput"
import SplitSecondaryTextInput from "../components/SplitSecondaryTextInput"
import PrimaryButton from "../components/PrimaryButton"
import FakePrimaryTextInput from '../components/FakePrimaryTextInput';

const handleForm = async () => {
    /* retreive values from form */
    console.log('form submitted');
  }

const UniTransfer = () => {
    const { web3, accounts, loading, role } = useWeb3();
    const [address, setAddress] = useState('');
    const [srcCurrency, setSrcCurrency] = useState('');
    const [dstCurrency, setDstCurrency] = useState('');
    const [srcCurrencyAmmount, setSrcCurrencyAmmount] = useState('0');
    const [dstCurrencyAmmount, setDstCurrencyAmmount] = useState('0');
    const [srcCode, setSrcCode] = useState('Source Currency reference');
    const [dstCode, setDstCode] = useState('Destination Currency reference');
    const [currentSrcBalance, setCurrentSrcBalance] = useState('100');
    const [newSrcBalance, setNewSrcBalance] = useState('0');

    // Function to handle changes in source currency value
    const handleSrcCurrencyChange = (event) => {
        const value = event.target.value;
        setSrcCurrencyAmmount(value);
        // Automatically set the value for destination currency
        const newValue = parseFloat(value) * 2;
        setDstCurrencyAmmount(newValue.toString());
        setNewSrcBalance((currentSrcBalance - value).toString());
    };

    // Function to handle changes in destination currency value
    const handleDstCurrencyChange = (event) => {
        const value = event.target.value;
        setDstCurrencyAmmount(value);
        // Automatically set the value for source currency
        const newValue = parseFloat(value) / 2;
        setSrcCurrencyAmmount(newValue.toString());
        setNewSrcBalance((currentSrcBalance - newValue).toString());
    };
  
      return (
        <form onSubmit={handleForm}>
          <PrimaryTextInput title="To Address" placeholder="Insert the destination address of the transaction" value={address} onChange={setAddress} />
          <SplitPrimaryTextInput titleLeft={srcCode} titleRight={dstCode} placeholderLeft="Insert the source currency address" placeholderRight="Insert the destination currency address" valueLeft={srcCurrency} valueRight={dstCurrency} onChangeLeft={setSrcCurrency} onChangeRight={setDstCurrency} />
          <SplitSecondaryTextInput titleLeft="Sending Value" titleRight="Receiving Value" placeholderLeft="Insert the desired value to send" valueLeft={srcCurrencyAmmount} valueRight={dstCurrencyAmmount} onChangeLeft={handleSrcCurrencyChange} onChangeRight={handleDstCurrencyChange} />
          <FakePrimaryTextInput title={srcCode} label="currentSrcBalance" value={currentSrcBalance}/>
          <FakePrimaryTextInput title="You will be left with:" label="newSrcBalance" value={newSrcBalance}/>
          <div className="mt-4 flex justify-center">
            <PrimaryButton type="submit" label="Submit" />
          </div>
        </form>
      );    
  };

export default UniTransfer;

/*
import React, { useState } from "react";
import { useWeb3 } from "../contexts/Web3Provider";
import { Dimmer, Loader, Segment } from "semantic-ui-react";
import instance from "../ethereum/universies";

import SecondaryTextInput from "../components/SecondaryTextInput";
import PrimaryButton from "../components/PrimaryButton";

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
    console.log("New dst currency:", newDstCurrency);

    if (!web3.utils.isAddress(newDstCurrency)) {
      console.error("Invalid Ethereum address");
      setDstCode("Invalid address");
      return;
    }

    try {
      const role = await instance.methods.ownRole(newDstCurrency).call();
      const roleStr = roleMapping[role] || "UNKNOWN";

      if (roleStr === "DEG") {
        console.log("Fetching DEG data...");
        const data = await instance.methods.degreeRef(newDstCurrency).call();
        setDstCode(data.code);
        console.log("Data fetched:", data);
      } else {
        setDstCode("Destination Currency reference");
      }
    } catch (error) {
      console.error("Error fetching role or degree data:", error);
      setDstCode("Destination Currency reference");
    }
  };

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

*/