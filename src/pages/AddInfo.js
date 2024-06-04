import React, { useEffect, useState } from "react";
import { useWeb3 } from "../contexts/Web3Provider";
import { Dimmer, Loader, Segment } from "semantic-ui-react";
import instance from "../ethereum/universies";
import { useParams, useNavigate } from "react-router-dom";

import PrimaryButton from "../components/PrimaryButton";
import FakeSecondaryTextInput from "../components/FakeSecondaryTextInput";

const AddInfo = () => {
  const { web3, loading, account } = useWeb3();
  const { address } = useParams();
  const [resultRole, setResultRole] = useState(null);
  const [props, setProps] = useState(null);
  const navigate = useNavigate ();

  const roleMapping = {
    0: "NONE",
    1: "STU",
    2: "DEG",
    3: "UNI",
    4: "AUT",
  };

  const viewBalance = async (event) => {
    event.preventDefault();
    navigate(`/universies/view-balance/${account}/${address}/${props.code}/${props.exchRate}`);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const role = await instance.methods.ownRole(address).call();
        const roleStr = roleMapping[role] || "UNKNOWN";
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

  if ((!resultRole && !props) || !resultRole) {
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-4xl font-bold text-center text-gray-700">
        {address}
      </h2>
      <p className="text-xl text-gray-500">Role: {resultRole}</p>
      {resultRole === "DEG" && props && (
        <>
          <p className="text-xl text-gray-500">Code: {props.code}</p>

          <p className="text-xl text-gray-500">
            Belonging to university: {props.universityAdd}
          </p>
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
          <PrimaryButton label="View My Current Balance" onClick={viewBalance}/>
        </>
      )}
      {resultRole === "STU" && props && (
        <>
          <p className="text-xl text-gray-500">Name: {props.name}</p>
          <p className="text-xl text-gray-500">Surnames: {props.surname}</p>
          <p className="text-xl text-gray-500">DNI/NIE: {props.id}</p>
          <p className="text-xl text-gray-500">
            Belonging to degree: {props.degreeAdd}
          </p>
        </>
      )}
    </div>
  );
};

export default AddInfo;
