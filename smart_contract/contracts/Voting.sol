//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract Voting {

    address private owner =0x9CcD452bf6c33D1D7fe59cd8AA988e31Ad965Ca2;
    
    struct Voted{   
        address sender;
        uint256 timestamp;
        bool voted;
    }
    mapping(address => Voted) private voter;
    uint256 private votersCount;
    string[] private votes;

    function Vote ( string memory candidate) public returns (bool){
        require(! (voter[msg.sender].voted) );
        votersCount+=1;
        voter[msg.sender]= Voted(msg.sender,block.timestamp,true);
        votes.push(candidate);
        return true;
    }
    
    
        // Function to return encrypted votes. For testing purposes, not added in front end.
     function returnEncryptedVotes(uint256 startpoint, uint256 numVotes) public view returns (string[] memory) {
         require(startpoint < votersCount, "Startpoint exceeds total votes");
        
         uint256 endpoint = startpoint + numVotes;
         if (endpoint > votersCount) {
             endpoint = votersCount;
         }

         string[] memory chunk = new string[](endpoint - startpoint);
         uint256 j = 0;

         for (uint256 i = startpoint; i < endpoint; i++) {
             chunk[j] = votes[i];
             j++;
         }
        
         return chunk;
     }


    function checkIfVoted() public view returns(bool){

      if(voter[msg.sender].voted == true)
      return true;
      else
      return false;
    }

    uint256 keyCount;

    struct Keywrds{
      string key;
      uint256 keyTime;
    }
    mapping(address => Keywrds) private keyword;

    function addKeyword(string memory keywrd) public {
      keyCount+=1;
      keyword[msg.sender] = Keywrds(keywrd, block.timestamp);
    }

    function checkIfKeywordIsCorrect(string memory keywrd) public view returns(bool){
      uint256 timeDiff = block.timestamp - keyword[msg.sender].keyTime;

      if ( keccak256(abi.encodePacked(keyword[msg.sender].key )) 
      == keccak256(abi.encodePacked(keywrd)))
        if( timeDiff < 5 minutes )
          return true;
        else
          return false;
      else
        return false;
    }

//User Login 
    uint256 userCount;

    mapping(address => string) private authentications;

    function addUser(string memory authphrase, address _address) public{
      require(msg.sender == owner);
      require(bytes(authentications[_address]).length == 0, "Authentication already exists for this address");

      userCount += 1;
      authentications[_address] = authphrase;
    }

      function logUser(string memory authphrase, string memory keywrd) public returns(bool){
        require(! (voter[msg.sender].voted) );

        if( keccak256(abi.encodePacked(authentications[msg.sender])) 
        == keccak256(abi.encodePacked(authphrase)) ){
            addKeyword(keywrd);
            return (true);
        }
        else 
            return (false);
        }

    function checkIfUserExists(string memory authphrase) public view returns(bool){

      if( keccak256(abi.encodePacked(authentications[msg.sender])) 
      == keccak256(abi.encodePacked(authphrase)) )
        return true;
      else 
        return false;
    }

    function getUserCount() public view returns (uint256){
      return userCount;
    }
}

