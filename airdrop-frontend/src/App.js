import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { AirdropABI, AirdropAddress } from "./data";
import "./App.css";

const App = () => {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [canClaim, setCanClaim] = useState(false);

  // Setup provider.
  useEffect(() => {
    const setUp = async () => {
      await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(AirdropAddress, AirdropABI, signer);
      const address = await signer.getAddress();

      setAccount(address);
      setContract(contract);
    };

    setUp();
  }, []);

  // Handle account change.
  useEffect(() => {
    const handleAccountsChanged = async () => {
      window.location.reload();
    };
    window.ethereum.on("accountsChanged", handleAccountsChanged);
    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, []);

  // Check can claim.
  useEffect(() => {
    if (contract === null) {
      return;
    }

    const checkCanClaim = async () => {
      const isClaimed = await contract.claimed(account);
      setCanClaim(!isClaimed);
    };

    checkCanClaim();
  }, [contract, account]);

  const claimReward = useCallback(() => {
    if (contract === null) {
      return;
    }

    if (canClaim) {
      contract.claim();
    }
  }, [contract, canClaim]);

  if (account == null) {
    return <div>Please connect to wallet</div>;
  }

  return (
    <div>
      <div>Hello {account}</div>
      <div>
        {canClaim ? (
          <button onClick={claimReward}>Claim Reward</button>
        ) : (
          <div>You already claimed reward</div>
        )}
      </div>
    </div>
  );
};

export default App;
