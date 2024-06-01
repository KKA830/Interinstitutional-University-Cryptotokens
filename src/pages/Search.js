/*
import React, { useEffect, useState } from 'react';
import { useWeb3 } from '../contexts/Web3Provider';

import PrimaryTextInput from "../components/PrimaryTextInput"
import SplitPrimaryTextInput from "../components/SplitPrimaryTextInput"
import SplitSecondaryTextInput from "../components/SplitSecondaryTextInput"
import PrimaryButton from "../components/PrimaryButton"
import FakePrimaryTextInput from './FakePrimaryTextInput';
import SecondaryTextInput from './SecondaryTextInput';

const handleForm = async () => {
    
    console.log('form submitted');
  }

const Search = () => {
    const { web3, accounts, loading, role } = useWeb3();
    const [address, setAddress] = useState('');
    const [code, setCode] = useState('');
    const [university, setUniversity] = useState('');
    const [name, setName] = useState('');
    const [surnames, setSurnames] = useState('');
    const [id, setId] = useState('');
    const [degree, setDegree] = useState('');
  
      return (
        <form onSubmit={handleForm}>
          <PrimaryTextInput title="Look For" placeholder="Insert the address to lookup" value={address} onChange={setAddress} />
          <PrimaryTextInput title={dstCode} placeholder="Insert the destination currency address" value={dstCurrency} onChange={setDstCurrency} />
          <SecondaryTextInput title="Sending Value" placeholder="Insert the desired value to send" value={srcCurrencyAmmount} onChange={setSrcCurrencyAmmount} />
          <div className="mt-4 flex justify-center">
            <PrimaryButton type="submit" label="Submit" />
          </div>
        </form>
      );    
  };

export default Search;

*/