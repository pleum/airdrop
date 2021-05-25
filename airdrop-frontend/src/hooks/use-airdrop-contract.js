import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { AIRDROP_AIB, AIRDROP_ADDRESS, CHAIN_ID } from "../config";

// Use airdrop contract.
export const useAirdropContract = (signer = null, chainId = -1) => {
  const [contract, setContract] = useState(null);
  const [isClaimed, setClaimed] = useState(true);
  const [isClaiming, setClaiming] = useState(false);

  useEffect(() => {
    if (signer === null || chainId !== CHAIN_ID) {
      setContract(null);
      return;
    }

    const airdropContract = new ethers.Contract(
      AIRDROP_ADDRESS,
      AIRDROP_AIB,
      signer
    );

    setContract(airdropContract);
  }, [signer, chainId]);

  useEffect(() => {
    if (contract === null || signer === null) {
      return;
    }

    const checkClaim = async () => {
      const address = await signer.getAddress();
      const isClaim = await contract.claimed(address);

      setClaimed(isClaim);
    };

    checkClaim();
  }, [signer, contract]);

  const claimTokens = useCallback(async () => {
    if (contract === null || isClaimed) {
      return;
    }

    try {
      setClaiming(true);
      const claim = await contract.claim();
      await claim.wait();

      window.location.reload();
    } catch (err) {
      console.error("unable to claim");
    } finally {
      setClaiming(false);
    }
  }, [contract, isClaimed]);

  return [claimTokens, isClaimed, isClaiming];
};
