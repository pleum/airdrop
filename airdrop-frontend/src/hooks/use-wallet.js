import { useState, useEffect } from "react";
import { ethers } from "ethers";

// Use chain.
export const useWallet = () => {
  const [address, setAddress] = useState(null);
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    if (typeof window.ethereum === "undefined") {
      return;
    }

    const setUp = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.listAccounts();
      if (accounts.length === 0) {
        return;
      }

      const currentSigner = provider.getSigner();
      setSigner(currentSigner);

      const currentAddress = await currentSigner.getAddress();
      setAddress(currentAddress);
    };

    // Setup wallet
    setUp();

    const handleAccountsChanged = async () => {
      window.location.reload();
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);

    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, []);

  return [address, signer];
};
