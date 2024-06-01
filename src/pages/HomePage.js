// pages/HomePage.js
import React from 'react';
import { useWeb3 } from '../contexts/Web3Provider';
import { Button, Dimmer, Loader, Segment } from 'semantic-ui-react';

const HomePage = () => {
  const { web3, account, loading, role } = useWeb3();

  if (loading) {
    return (
      <Segment style={{ height: '100vh' }}>
        <Dimmer active inverted>
          <Loader inverted content='Connecting to MetaMask...' />
        </Dimmer>
      </Segment>
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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-4xl font-bold text-center text-gray-700">
        Welcome, your account is connected:
      </h2>
      <p className="text-xl text-gray-500">{account}</p>
      <p className="text-xl text-gray-500">Role: {role}</p>
      {!account && (
        <Button className="bg-[#005daa] hover:bg-[#004080] text-white font-bold rounded py-2 px-4 shadow-md mt-4" onClick={() => window.ethereum.enable()}>
          Connect to MetaMask
        </Button>
      )}
    </div>
  );
};

export default HomePage;
