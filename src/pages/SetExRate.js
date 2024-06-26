import React, { useEffect, useState } from "react";
import { useWeb3 } from "../contexts/Web3Provider";
import { Dimmer, Loader, Segment } from "semantic-ui-react";
import instance from "../ethereum/universies";
import { useParams } from "react-router-dom";

// components
import PrimaryButton from "../components/PrimaryButton";
import FakeSecondaryTextInput from "../components/FakeSecondaryTextInput";
import SecondaryTextInput from "../components/SecondaryTextInput";

// this page is designed for the AUT address to change the exchange rates of degree currencies
const SetExRate = () => {
  const { web3, account, loading, role } = useWeb3();
  const { address } = useParams();
  const [resultRole, setResultRole] = useState(null);
  const [props, setProps] = useState(null);
  const [newExchangeRate, setNewExchangeRate] = useState(null);

  const roleMapping = {
    0: "NONE",
    1: "STU",
    2: "DEG",
    3: "UNI",
    4: "AUT",
  };

  // handles the submission of the form
  const handleForm = async (event) => {
    event.preventDefault();

    try {
      await instance.methods
        .setExRate(address, newExchangeRate)
        .send({ from: account });
    } catch (error) {
      console.error("Transaction failed", error);
    }
  };

  const handleDegree = async (event) => {
    event.preventDefault();
    if (props.active) {
      try {
        await instance.methods.DisDegree(address).send({ from: account });
      } catch (error) {
        console.error("Transaction failed", error);
      }
    } else {
      try {
        await instance.methods.EnDegree(address).send({ from: account });
      } catch (error) {
        console.error("Transaction failed", error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fRole = await instance.methods.ownRole(address).call();
        const roleStr = roleMapping[fRole] || "UNKNOWN";
        setResultRole(roleStr);

        let data;
        if (roleStr === "DEG") {
          data = await instance.methods.degreeRef(address).call();
        } else if (roleStr === "STU") {
          data = await instance.methods.studentRef(address).call();
        }
        setProps(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [address]);

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

  if (!resultRole || !props) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h2 className="text-4xl font-bold text-center text-gray-700">
          <Segment>
            <Dimmer active inverted>
              <Loader inverted content="Loading data..." />
            </Dimmer>
          </Segment>
        </h2>
      </div>
    );
  }

  // based on the role, outputs an appropriate page
  return (
    <>
      {role === "AUT" && (
        <form onSubmit={handleForm} className="flex flex-col gap-3">
          <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-4xl font-bold text-center text-gray-700">
              {address}
            </h2>
            <p className="text-xl text-gray-500">Code: {props.code}</p>
            <div>
              {props.active ? (
                <p className="text-xl text-green-500 bold">
                  <b>This currency is currently active</b>
                </p>
              ) : (
                <p className="text-xl text-red-500 bold">
                  <b>This currency is currently inactive</b>
                </p>
              )}
            </div>
            <FakeSecondaryTextInput
              label="Rate"
              value={`1 ${props.code} = ${props.exchRate.toString()} UVS`}
            />
            <SecondaryTextInput
              title="Exchange rate"
              placeholder="New exchange rate"
              value={newExchangeRate ? newExchangeRate.toString() : ""}
              onChange={(e) => setNewExchangeRate(e.target.value)}
            />
            <PrimaryButton type="submit" label="Set New Exchange Rate" />
            <PrimaryButton
              label="Enable/Disable Currency"
              onClick={handleDegree}
            />
          </div>
        </form>
      )}
      {role !== "AUT" && (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h2 className="text-4xl font-bold text-center text-gray-700">
            Request not suitable for this address
          </h2>
        </div>
      )}
    </>
  );
};

export default SetExRate;
