import React, { useEffect, useState } from "react";
import { useWeb3 } from "../contexts/Web3Provider";
import { Dimmer, Loader, Segment } from "semantic-ui-react";
import instance from "../ethereum/universies";
import { useParams, useNavigate } from "react-router-dom";

import PrimaryButton from "../components/PrimaryButton";
import FakeSecondaryTextInput from "../components/FakeSecondaryTextInput";

const ViewBalance = () => {
  const { web3, loading } = useWeb3();
  const { account, address, code, exchRate } = useParams();
  const [balance, setBalance] = useState(null);
  const navigate = useNavigate();

  const transfer = async (event) => {
    event.preventDefault();
    navigate(`/universies/uni-transfer`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(`Fetching balance for address: ${account}`);
        const data = await instance.methods.specificBalanceOf(account, address).call();
        console.log("Data fetched:", data);
        setBalance(Number(data));
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
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-4xl font-bold text-center text-gray-700">
        Your Balance for {code} is:
      </h2>
      <FakeSecondaryTextInput value={`${balance.toString()} ${code}`} />
      <p className="text-xl text-gray-500">Which is equivalent to:</p>
      <FakeSecondaryTextInput
        label="Rate"
        value={`${(balance*exchRate).toString()} UVS`}
      />
      <PrimaryButton label="Transfer" onClick={transfer} />
    </div>
  );
};

export default ViewBalance;
