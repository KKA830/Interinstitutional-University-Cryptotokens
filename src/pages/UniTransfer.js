import React, { useState } from "react";
import { useWeb3 } from "../contexts/Web3Provider";
import { Dimmer, Loader, Segment } from "semantic-ui-react";
import instance from "../ethereum/universies";

// components
import SecondaryTextInput from "../components/SecondaryTextInput";
import SplitSecondaryTextInput from "../components/SplitSecondaryTextInput";
import PrimaryButton from "../components/PrimaryButton";
import FakePrimaryTextInput from "../components/FakePrimaryTextInput";

// this page is designed for transacting coins
const UniTransfer = () => {
  const { web3, account, loading } = useWeb3();
  const [address, setAddress] = useState("");
  const [srcCurrency, setSrcCurrency] = useState("");
  const [dstCurrency, setDstCurrency] = useState("");
  const [srcCurrencyAmmount, setSrcCurrencyAmmount] = useState("0");
  const [dstCurrencyAmmount, setDstCurrencyAmmount] = useState("0");
  const [srcCode, setSrcCode] = useState("Source Currency reference");
  const [dstCode, setDstCode] = useState("Destination Currency reference");
  const [currentSrcBalance, setCurrentSrcBalance] = useState("0");
  const [newSrcBalance, setNewSrcBalance] = useState("0");
  const [srcRate, setSrcRate] = useState("1");
  const [dstRate, setDstRate] = useState("1");

  const roleMapping = {
    0: "NONE",
    1: "STU",
    2: "DEG",
    3: "UNI",
    4: "AUT",
  };

  const changeSrcCode = async (event) => {
    const newSrcCurrency = event.target.value;
    setSrcCurrency(newSrcCurrency);

    if (!web3.utils.isAddress(newSrcCurrency)) {
      console.error("Invalid Ethereum address");
      setSrcCode("Source Currency reference");
      return;
    }

    try {
      const role = await instance.methods.ownRole(newSrcCurrency).call();
      const roleStr = roleMapping[role] || "UNKNOWN";

      if (roleStr === "DEG") {
        const data = await instance.methods.degreeRef(newSrcCurrency).call();
        setSrcCode(data.code);
        setSrcRate(Number(data.exchRate));
        const balance = await instance.methods
          .specificBalanceOf(account, newSrcCurrency)
          .call();
        setCurrentSrcBalance(Number(balance));
      } else {
        setSrcCode("Source Currency reference");
      }
    } catch (error) {
      console.error("Error fetching role or degree data:", error);
      setSrcCode("Source Currency reference");
    }
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
        setDstRate(Number(data.exchRate));
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
        .uniTransfer(address, srcCurrencyAmmount, srcCurrency, dstCurrency)
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

  // Function to handle changes in source currency value
  const handleSrcCurrencyChange = (event) => {
    const value = event.target.value;
    setSrcCurrencyAmmount(value);
    // Automatically set the value for destination currency
    const newValue = Math.floor((parseFloat(value) * srcRate) / dstRate);
    setDstCurrencyAmmount(newValue);
    setNewSrcBalance((currentSrcBalance - value).toString());
  };

  // Function to handle changes in destination currency value
  const handleDstCurrencyChange = (event) => {
    const value = event.target.value;
    setDstCurrencyAmmount(value);
    // Automatically set the value for source currency
    const newValue = Math.floor((parseFloat(value) * dstRate) / srcRate);
    setSrcCurrencyAmmount(newValue);
    setNewSrcBalance((currentSrcBalance - newValue).toString());
  };

  // outputs page
  return (
    <form onSubmit={handleForm}>
      <SecondaryTextInput
        title="To Address"
        placeholder="Insert the destination address of the transaction"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <SplitSecondaryTextInput
        titleLeft={srcCode}
        titleRight={dstCode}
        placeholderLeft="Insert the source currency address"
        placeholderRight="Insert the destination currency address"
        valueLeft={srcCurrency}
        valueRight={dstCurrency}
        onChangeLeft={changeSrcCode}
        onChangeRight={changeDstCode}
      />
      <SplitSecondaryTextInput
        titleLeft="Sending Value"
        titleRight="Receiving Value"
        placeholderLeft="Insert the desired value to send"
        valueLeft={srcCurrencyAmmount}
        valueRight={dstCurrencyAmmount}
        onChangeLeft={handleSrcCurrencyChange}
        onChangeRight={handleDstCurrencyChange}
      />
      <FakePrimaryTextInput
        title={srcCode}
        label="currentSrcBalance"
        value={currentSrcBalance}
      />
      <FakePrimaryTextInput
        title="You will be left with:"
        label="newSrcBalance"
        value={newSrcBalance}
      />
      <div className="mt-4 flex justify-center">
        <PrimaryButton type="submit" label="Submit" />
      </div>
    </form>
  );
};

export default UniTransfer;
