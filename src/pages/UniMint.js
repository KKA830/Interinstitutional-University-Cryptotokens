import React, { useEffect, useState } from "react";
import { useWeb3 } from "../contexts/Web3Provider";

import PrimaryTextInput from "../components/PrimaryTextInput";
import SplitPrimaryTextInput from "../components/SplitPrimaryTextInput";
import SplitSecondaryTextInput from "../components/SplitSecondaryTextInput";
import PrimaryButton from "../components/PrimaryButton";
import FakePrimaryTextInput from "../components/FakePrimaryTextInput";
import SecondaryTextInput from "./SecondaryTextInput";

const handleForm = async () => {
  /* retreive values from form */
  console.log("form submitted");
};

const UniMint = () => {
  const { web3, accounts, loading, role } = useWeb3();
  const [address, setAddress] = useState("");
  const [dstCurrency, setDstCurrency] = useState("");
  const [srcCurrencyAmmount, setSrcCurrencyAmmount] = useState("0");
  const [dstCode, setDstCode] = useState("Destination Currency reference");

  return (
    <form onSubmit={handleForm}>
      <PrimaryTextInput
        title="To Address"
        placeholder="Insert the destination address of the transaction"
        value={address}
        onChange={setAddress}
      />
      <PrimaryTextInput
        title={dstCode}
        placeholder="Insert the destination currency address"
        value={dstCurrency}
        onChange={setDstCurrency}
      />
      <SecondaryTextInput
        title="Sending Value"
        placeholder="Insert the desired value to send"
        value={srcCurrencyAmmount}
        onChange={setSrcCurrencyAmmount}
      />
      <div className="mt-4 flex justify-center">
        <PrimaryButton type="submit" label="Submit" />
      </div>
    </form>
  );
};

export default UniMint;
