import { useState, useEffect } from "react";

// Use chain.
export const useChain = () => {
  const [chainId, setChainId] = useState(-1);

  useEffect(() => {
    if (typeof window.ethereum === "undefined") {
      return;
    }

    const getCurrentChain = async () => {
      const hexChainId = await window.ethereum.request({
        method: "eth_chainId",
      });

      setChainId(parseInt(hexChainId));
    };

    getCurrentChain();

    // Handle chain changed.
    const handleChainChanged = (_chainId) => {
      window.location.reload();
    };

    window.ethereum.on("chainChanged", handleChainChanged);
    return () => {
      window.ethereum.removeListener("chainChanged", handleChainChanged);
    };
  }, []);

  return [chainId];
};
