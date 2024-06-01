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