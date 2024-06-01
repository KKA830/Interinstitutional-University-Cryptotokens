import React, { useEffect, useState } from 'react';
import { useWeb3 } from '../contexts/Web3Provider';
import { Segment, Dimmer, Loader } from 'semantic-ui-react';
import instance from '../ethereum/universies';

import PrimaryTextInput from '../components/PrimaryTextInput';
import PrimaryMultiOption from '../components/PrimaryMultiOption';
import PrimaryButton from '../components/PrimaryButton';

const AddUsr = () => {
  const { account, role } = useWeb3();
  const [fRole, setFRole] = useState('UNI');
  const [address, setAddress] = useState('');
  const [code, setCode] = useState('');
  const [university, setUniversity] = useState('');
  const [name, setName] = useState('');
  const [surnames, setSurnames] = useState('');
  const [id, setId] = useState('');
  const [degree, setDegree] = useState('');
    
  const options = role === 'AUT'
  ? [
      { value: 'UNI', label: 'UNI' },
      { value: 'DEG', label: 'DEG' },
      { value: 'STU', label: 'STU' },
    ]
  : [
      { value: 'DEG', label: 'DEG' },
      { value: 'STU', label: 'STU' },
    ];

    const handleForm = async (event) => {
      event.preventDefault();
    
      try {
        if (fRole === 'UNI') {
          await instance.methods.setUniversity(address, code).send({ from: account });
        } else if (fRole === 'DEG') {
          await instance.methods.setDegree(address, code, university).send({ from: account });
        } else if (fRole === 'STU') {
          await instance.methods.setStudent(address, name, surnames, id, degree).send({ from: account });
        }
    
        // Reset form values after successful submission
        setAddress('');
        setCode('');
        setUniversity('');
        setName('');
        setSurnames('');
        setId('');
        setDegree('');
      } catch (error) {
        console.error('Transaction failed', error);
      }

    };

    return (
      <form onSubmit={handleForm} className="flex flex-col gap-3">
        <PrimaryMultiOption title="Role" options={options} onChange={setFRole}/>
    
        <PrimaryTextInput title="Address" placeholder="Insert the new address" value={address} onChange={setAddress} />
    
        {fRole === 'UNI' && (
          <>
          <PrimaryTextInput title="Code" placeholder="Insert the new code" value={code} onChange={setCode} />
          </>
        )}
    
        {fRole === 'DEG' && (
          <>
          <PrimaryTextInput title="Code" placeholder="Insert the new code" value={code} onChange={setCode} />
          <PrimaryTextInput title="University" placeholder="Insert address of the university" value={university} onChange={setUniversity} />
          </>
        )}
    
        {fRole === 'STU' && (
          <>
          <PrimaryTextInput title="Name" placeholder="Student's name" value={name} onChange={setName} />
          <PrimaryTextInput title="Surname" placeholder="Student's surname" value={surnames} onChange={setSurnames} />
          <PrimaryTextInput title="DNI/NIE" placeholder="Student's ID" value={id} onChange={setId} />
          <PrimaryTextInput title="Degree" placeholder="Student's degree" value={degree} onChange={setDegree} />
          </>
        )}
        <div className="mt-4 flex justify-center">
          <PrimaryButton type="submit" label="Submit" />
        </div>
      </form>
    );    
};

export default AddUsr;
