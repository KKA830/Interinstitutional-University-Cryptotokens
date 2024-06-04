// contexts/Web3Provider.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import Web3 from 'web3';
import instance from '../ethereum/universies';

const Web3Context = createContext();

const roleMapping = {
  0: 'NONE',
  1: 'STU',
  2: 'DEG',
  3: 'UNI',
  4: 'AUT'
};

export const Web3Provider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [role, setRole] = useState(null);
  const [addProps, setAddProps] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          const accounts = await web3Instance.eth.getAccounts();
          setWeb3(web3Instance);
          setAccount(accounts[0]);
          // Fetch the role from the contract and map it to its string representation
          const userRoleNum = await instance.methods.ownRole(accounts[0]).call();
          const userRole = roleMapping[userRoleNum];

          setRole(userRole);

          // Fetch the code if the role is 'DEG'
          if (userRole === 'DEG') {
            const tempDegree = await instance.methods.degreeRef(accounts[0]).call();
            setAddProps(tempDegree);
          }
          // Fetch the code if the role is 'STU'
          else if (userRole === 'STU') {
            const tempStudent = await instance.methods.studentRef(accounts[0]).call();
            setAddProps(tempStudent);
          }

        } catch (error) {
          console.error('User denied account access', error);
        }
      } else {
        console.error('MetaMask is not installed');
      }
      setLoading(false);
    };

    initWeb3();
  }, []);

  return (
    <Web3Context.Provider value={{ web3, account, role, addProps, loading }}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => useContext(Web3Context);