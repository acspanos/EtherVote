**Setting Up the Smart Contract**
Change the Owner Address:
  1. Open the file smart_contract/contracts/Voting.sol.
  2. Replace the owner address with one of your own test addresses. This address will be the only one able to perform voter registration.
  3. Update Hardhat Configuration:
     - Open the file smart_contract/hardhat.config.js.
     - Modify the following variables accordingly:
        > url: 'add your Alchemy project URL',
        > accounts: ['add your Metamask address private key']

**Deploying the Smart Contract**

  1. Run the deployment script using the following command:
    > npx hardhat run scripts/deploy.js --network sepolia
  2. Copy the contract address from the output (e.g., 0x2a5D019F75D3f65d3D7167cd54bcd6d7eD423456).
     Paste it into the file /client/src/components/utils/constants.js, replacing the value of the contractAddress variable.
  3. Copy the contract ABI from /smart_contract/artifacts/contracts/Voting.sol/Voting.json.
     Paste it into /client/components/utils/Voting.json.

**Running the Client**
  1. npm init vite@latest
  2. npm install
  3. npm run dev 

**Extra**
  1. Set your public RSA key on 'publicKeyPem' variable in 'client/src/context/VotingContext.js'.
  2. The vote tallying process is not added. Functions only added for testing purposes.
