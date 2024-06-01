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
  const [role, setRole] = useState(null); // Add role state
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

          console.log('User role:', userRole);
          setRole(userRole); // Set the user's role

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
    <Web3Context.Provider value={{ web3, account, role, loading }}> {/* Include role in the context */}
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => useContext(Web3Context);