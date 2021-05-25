import { useChain } from "./hooks/use-chain";
import { useWallet } from "./hooks/use-wallet";
import { useAirdropContract } from "./hooks/use-airdrop-contract";
import { CHAIN_ID } from "./config";
import "./App.css";

const App = () => {
  const [chainId] = useChain();
  const [address, signer] = useWallet();
  const [claimTokens, isClaimed, isClaiming] = useAirdropContract(
    signer,
    chainId
  );

  const connectWallet = async () => {
    try {
      await window.ethereum.request({
        method: "eth_requestAccounts",
      });
    } catch (err) {
      console.log(err.code === 4001);
    }
  };

  return (
    <div className="container">
      <div className="app">
        <div className="title">100 TOKEN</div>
        {address !== null && <div className="address">{address}</div>}
        <div className="airdrop">
          {chainId !== CHAIN_ID ? (
            <div>Please change network</div>
          ) : address === null ? (
            <button onClick={connectWallet}>Connect wallet</button>
          ) : (
            <div>
              {isClaimed ? (
                <div className="message">You already claim tokens</div>
              ) : (
                <button
                  className="button"
                  onClick={claimTokens}
                  disabled={isClaiming}
                >
                  Claim
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
