import React, { useState } from "react";
import { useWeb3 } from "../contexts/Web3Provider";
import { Segment, Dimmer, Loader } from "semantic-ui-react";
import instance from "../ethereum/universies";

// components
import PrimaryTextInput from "../components/PrimaryTextInput";
import PrimaryMultiOption from "../components/PrimaryMultiOption";
import PrimaryButton from "../components/PrimaryButton";

// this page is used to assign a role to an address and construct its profile
const AddUsr = () => {
  const { web3, account, loading, role } = useWeb3();
  const [fRole, setFRole] = useState("STU");
  const [address, setAddress] = useState("");
  const [code, setCode] = useState("");
  const [university, setUniversity] = useState("");
  const [name, setName] = useState("");
  const [surnames, setSurnames] = useState("");
  const [id, setId] = useState("");
  const [degree, setDegree] = useState("");

  const options =
    role === "AUT"
      ? [
          { value: "STU", label: "STU" },
          { value: "DEG", label: "DEG" },
          { value: "UNI", label: "UNI" },
        ]
      : [
          { value: "STU", label: "STU" },
          { value: "DEG", label: "DEG" },
        ];

  // handles the submission of the form
  const handleForm = async (event) => {
    event.preventDefault();

    try {
      if (fRole === "UNI") {
        await instance.methods
          .setUniversity(address, code)
          .send({ from: account });
      } else if (fRole === "DEG") {
        await instance.methods
          .setDegree(address, code, university)
          .send({ from: account });
      } else if (fRole === "STU") {
        await instance.methods
          .setStudent(address, name, surnames, id, degree)
          .send({ from: account });
      }

      // Reset form values after successful submission
      setAddress("");
      setCode("");
      setUniversity("");
      setName("");
      setSurnames("");
      setId("");
      setDegree("");
    } catch (error) {
      console.error("Transaction failed", error);
    }
  };

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

  // based on the role, outputs an appropriate page
  return (
    <div>
      {(role === "AUT" || role === "UNI") && (
        <form onSubmit={handleForm} className="flex flex-col gap-3">
          <PrimaryMultiOption
            title="Role"
            options={options}
            onChange={setFRole}
          />

          <PrimaryTextInput
            title="Address"
            placeholder="Insert the new address"
            value={address}
            onChange={setAddress}
          />

          {fRole === "UNI" && (
            <>
              <PrimaryTextInput
                title="Code"
                placeholder="Insert the new code"
                value={code}
                onChange={setCode}
              />
            </>
          )}

          {fRole === "DEG" && (
            <>
              <PrimaryTextInput
                title="Code"
                placeholder="Insert the new code"
                value={code}
                onChange={setCode}
              />
              <PrimaryTextInput
                title="University"
                placeholder="Insert address of the university"
                value={university}
                onChange={setUniversity}
              />
            </>
          )}

          {fRole === "STU" && (
            <>
              <PrimaryTextInput
                title="Name"
                placeholder="Student's name"
                value={name}
                onChange={setName}
              />
              <PrimaryTextInput
                title="Surname"
                placeholder="Student's surname"
                value={surnames}
                onChange={setSurnames}
              />
              <PrimaryTextInput
                title="DNI/NIE"
                placeholder="Student's ID"
                value={id}
                onChange={setId}
              />
              <PrimaryTextInput
                title="Degree"
                placeholder="Student's degree"
                value={degree}
                onChange={setDegree}
              />
            </>
          )}
          <div className="mt-4 flex justify-center">
            <PrimaryButton type="submit" label="Submit" />
          </div>
        </form>
      )}
      {role !== "AUT" && role !== "UNI" && (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h2 className="text-4xl font-bold text-center text-gray-700">
            Request not suitable for this address
          </h2>
        </div>
      )}
    </div>
  );
};

export default AddUsr;
