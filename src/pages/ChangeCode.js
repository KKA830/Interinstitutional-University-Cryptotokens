import React, { useEffect, useState } from 'react';
import { useWeb3 } from '../contexts/Web3Provider';
import { Segment, Dimmer, Loader } from 'semantic-ui-react';
import instance from '../ethereum/universies';

import PrimaryTextInput from '../components/PrimaryTextInput';
import PrimaryMultiOption from '../components/PrimaryMultiOption';
import PrimaryButton from '../components/PrimaryButton';

const handleForm = async () => {
  /* retreive values from form */
  console.log('form submitted');
}

const ChangeCode = () => {
  const { web3, accounts, loading, role } = useWeb3();
  const [newCode, setNewCode] = useState('');

    return (
      <form onSubmit={handleForm}>

        <h2 className="text-4xl font-bold text-center text-gray-700">
           Current Code: 
        </h2>
        <PrimaryTextInput title="New Code" placeholder="Insert a new code" value={newCode} onChange={setNewCode} />
    
        <div className="mt-4 flex justify-center">
          <PrimaryButton type="submit" label="Submit" />
        </div>
      </form>
    );    
};

export default ChangeCode;
