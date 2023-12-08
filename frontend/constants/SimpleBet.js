export const simpleBet = {
    abi: [
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
                },
                {
                    "internalType": "address",
                    "name": "_betWavesOrganizerAddress",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_betWaveDaoAddress",
                    "type": "address"
                }
            ],
            "stateMutability": "payable",
            "type": "constructor"
        },
        {
            "inputs": [],
            "name": "ReentrancyGuardReentrantCall",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "alreadyBet",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "feesNotPaid",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "forbidden",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "insufficientBalance",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "minimumBetAmount",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "notRegistered",
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
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "newBid",
            "type": "event"
        },
        {
            "stateMutability": "payable",
            "type": "fallback"
        },
        {
            "inputs": [],
            "name": "beginEventTimestamp",
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
            "inputs": [],
            "name": "betName",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "betWaveDaoAddress",
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
            "name": "betWavesOrganizerAddress",
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
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "bettors",
            "outputs": [
                {
                    "internalType": "address payable",
                    "name": "bettorAddress",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "betId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "bettingAmout",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "bettingReward",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_validatorFees",
                    "type": "uint256"
                }
            ],
            "name": "calculateValidatorReward",
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
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "competitors",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "odd",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "betNumber",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "betAmount",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "endEventTimestamp",
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
            "inputs": [],
            "name": "redeemToBettor",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_plateformeFees",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_creatorFees",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "_ownerAddress",
                    "type": "address"
                }
            ],
            "name": "sendPlatfromAndCreatorFees",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_validatorAddress",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_validatorReward",
                    "type": "uint256"
                }
            ],
            "name": "sendValidatorFees",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_betId",
                    "type": "uint256"
                }
            ],
            "name": "setBet",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "setFeesBooleanToTrue",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_winnerId",
                    "type": "uint256"
                }
            ],
            "name": "setWinnerId",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalBet",
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
            "inputs": [],
            "name": "winnerId",
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
            "stateMutability": "payable",
            "type": "receive"
        }
    ]
}