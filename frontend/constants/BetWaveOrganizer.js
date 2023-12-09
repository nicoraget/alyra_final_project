export const betWaveOrganizer = {
    address: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
    blockNumber: 1,
   abi : [
       {
           "inputs": [
               {
                   "internalType": "address",
                   "name": "_betWaveDAOAddress",
                   "type": "address"
               }
           ],
           "stateMutability": "payable",
           "type": "constructor"
       },
       {
           "inputs": [],
           "name": "noWinner",
           "type": "error"
       },
       {
           "inputs": [],
           "name": "notOwner",
           "type": "error"
       },
       {
           "inputs": [],
           "name": "notRegistered",
           "type": "error"
       },
       {
           "inputs": [],
           "name": "notValidator",
           "type": "error"
       },
       {
           "inputs": [],
           "name": "wrongStep",
           "type": "error"
       },
       {
           "anonymous": false,
           "inputs": [
               {
                   "indexed": false,
                   "internalType": "address",
                   "name": "",
                   "type": "address"
               },
               {
                   "indexed": false,
                   "internalType": "string",
                   "name": "",
                   "type": "string"
               },
               {
                   "indexed": false,
                   "internalType": "string",
                   "name": "",
                   "type": "string"
               }
           ],
           "name": "newBet",
           "type": "event"
       },
       {
           "anonymous": false,
           "inputs": [
               {
                   "indexed": false,
                   "internalType": "address",
                   "name": "",
                   "type": "address"
               }
           ],
           "name": "startCount",
           "type": "event"
       },
       {
           "anonymous": false,
           "inputs": [
               {
                   "indexed": false,
                   "internalType": "address",
                   "name": "",
                   "type": "address"
               }
           ],
           "name": "startValidation",
           "type": "event"
       },
       {
           "inputs": [
               {
                   "internalType": "address",
                   "name": "",
                   "type": "address"
               }
           ],
           "name": "betList",
           "outputs": [
               {
                   "internalType": "string",
                   "name": "betName",
                   "type": "string"
               },
               {
                   "internalType": "string",
                   "name": "compName1",
                   "type": "string"
               },
               {
                   "internalType": "string",
                   "name": "compName2",
                   "type": "string"
               },
               {
                   "internalType": "address",
                   "name": "owner",
                   "type": "address"
               },
               {
                   "internalType": "uint256",
                   "name": "voteCount",
                   "type": "uint256"
               },
               {
                   "internalType": "uint256",
                   "name": "comp1VoteCount",
                   "type": "uint256"
               },
               {
                   "internalType": "uint256",
                   "name": "comp2VoteCount",
                   "type": "uint256"
               },
               {
                   "internalType": "enum BetWaveOrganizer.BetStatus",
                   "name": "betStatus",
                   "type": "uint8"
               }
           ],
           "stateMutability": "view",
           "type": "function"
       },
       {
           "inputs": [
               {
                   "internalType": "string",
                   "name": "_betName",
                   "type": "string"
               },
               {
                   "internalType": "string",
                   "name": "_compName1",
                   "type": "string"
               },
               {
                   "internalType": "string",
                   "name": "_compName2",
                   "type": "string"
               }
           ],
           "name": "deployNewBet",
           "outputs": [],
           "stateMutability": "nonpayable",
           "type": "function"
       },
       {
           "inputs": [
               {
                   "internalType": "address",
                   "name": "_betAddress",
                   "type": "address"
               }
           ],
           "name": "getBetValidatorsResult",
           "outputs": [
               {
                   "internalType": "uint256",
                   "name": "",
                   "type": "uint256"
               }
           ],
           "stateMutability": "view",
           "type": "function"
       },
       {
           "inputs": [
               {
                   "internalType": "address",
                   "name": "_betAddress",
                   "type": "address"
               },
               {
                   "internalType": "uint256",
                   "name": "_id",
                   "type": "uint256"
               }
           ],
           "name": "getvalidatorAddress",
           "outputs": [
               {
                   "internalType": "address",
                   "name": "",
                   "type": "address"
               }
           ],
           "stateMutability": "view",
           "type": "function"
       },
       {
           "inputs": [],
           "name": "lastSimpleBetAddress",
           "outputs": [
               {
                   "internalType": "address",
                   "name": "",
                   "type": "address"
               }
           ],
           "stateMutability": "view",
           "type": "function"
       },
       {
           "inputs": [
               {
                   "internalType": "uint256",
                   "name": "_compId",
                   "type": "uint256"
               },
               {
                   "internalType": "address",
                   "name": "_betAddress",
                   "type": "address"
               }
           ],
           "name": "setBetVote",
           "outputs": [],
           "stateMutability": "nonpayable",
           "type": "function"
       },
       {
           "inputs": [
               {
                   "internalType": "address",
                   "name": "_betAddress",
                   "type": "address"
               }
           ],
           "name": "startBetValidation",
           "outputs": [],
           "stateMutability": "nonpayable",
           "type": "function"
       }
],
}