Setting Up the Smart Contract
Change the Owner Address:

Open the file smart_contract/contracts/Voting.sol.
Replace the owner address with one of your own test addresses. This address will be the only one able to perform voter registration.
Update Hardhat Configuration:

Open the file smart_contract/hardhat.config.js.
Modify the following variables accordingly:
url: 'add your Alchemy project URL',
accounts: ['add your Metamask address private key']
Deploying the Smart Contract
Open your terminal and navigate to the project directory.

Run the deployment script using the following command:
npx hardhat run scripts/deploy.js --network sepolia
Post-Deployment:

Copy the contract address from the output (e.g., 0x2a5D019F75D3f65d3D7167cd54bcd6d7eD423456).
Paste it into the file /client/components/utils/constants.js, replacing the value of the contractAddress variable.
Also, copy the contract ABI from /smart_contract/artifacts/contracts/Voting.sol/Voting.json.
Paste it into /client/components/utils/Voting.json.
Running the Client
After setting up the smart contract, you can run the client-side application (add your client-side setup instructions here).

