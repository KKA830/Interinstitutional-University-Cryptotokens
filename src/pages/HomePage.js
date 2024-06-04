// pages/HomePage.js
import React from "react";
import { useWeb3 } from "../contexts/Web3Provider";
import { Button, Dimmer, Loader, Segment } from "semantic-ui-react";

const HomePage = () => {
  const { web3, account, loading, role, addProps } = useWeb3();

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
    <div className="flex flex-col items-center justify-center min-h-screen">
      {role === "STU" && (
        <>
          <h2 className="text-4xl font-bold text-center text-gray-700">
            Welcome back {addProps.name} {addProps.surnames}, your account is
            connected:
          </h2>
          <p className="text-xl text-gray-500">{account}</p>
          <p className="text-xl text-gray-500">Role: {role}</p>
          <p className="text-xl text-gray-500">DNI/NIE: {addProps.id}</p>
          <p className="text-xl text-gray-500">
            Belonging to degree: {addProps.degreeAdd}
          </p>
        </>
      )}
      {role !== "STU" && (
        <>
          <h2 className="text-4xl font-bold text-center text-gray-700">
            Welcome, your account is connected:
          </h2>
          <p className="text-xl text-gray-500">{account}</p>
          <p className="text-xl text-gray-500">Role: {role}</p>
          {!account && (
            <Button
              className="bg-[#005daa] hover:bg-[#004080] text-white font-bold rounded py-2 px-4 shadow-md mt-4"
              onClick={() => window.ethereum.enable()}
            >
              Connect to MetaMask
            </Button>
          )}
          {role === "DEG" && (
            <>
              <p className="text-xl text-gray-500">Code: {addProps.code}</p>
              <p className="text-xl text-gray-500">
                <b classname="bold">1 {addProps.code}</b> coin is currently
                worth <b classname="bold">{addProps.exchRate.toString()} UVS</b>
              </p>
              <p className="text-xl text-gray-500">
                Belonging to university: {addProps.universityAdd}
              </p>
              <div>
                {addProps.active ? (
                  <p className="text-xl text-green-500 bold">
                    <b>This currency is currently active</b>
                  </p>
                ) : (
                  <p className="text-xl text-red-500 bold">
                    <b>This currency is currently inactive</b>
                  </p>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
