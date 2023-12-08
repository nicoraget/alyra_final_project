/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../common";
import type {
  BetWaveDAO,
  BetWaveDAOInterface,
} from "../../contracts/BetWaveDAO";

const _abi = [
  {
    inputs: [],
    name: "ReentrancyGuardReentrantCall",
    type: "error",
  },
  {
    inputs: [],
    name: "insufficientBalance",
    type: "error",
  },
  {
    inputs: [],
    name: "notRegistered",
    type: "error",
  },
  {
    inputs: [],
    name: "notValidator",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "enum BetWaveDAO.VoteType",
        name: "",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "newDAOVote",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "newUser",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "newValidator",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "setDAOVote",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "voteRejected",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "withdrawValidator",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [],
    name: "DAOQuorum",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    name: "DAOVoteList",
    outputs: [
      {
        internalType: "enum BetWaveDAO.VoteType",
        name: "voteType",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "voteFor",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "voteAgainst",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "newValue",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "addUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "addValidators",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum BetWaveDAO.VoteType",
        name: "_voteType",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "_newValue",
        type: "uint8",
      },
    ],
    name: "askDAOVote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "betQuorum",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "creatorFees",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "daoVoteNumber",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getDaoControlValue",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "_id",
        type: "uint64",
      },
    ],
    name: "getDaoVoteHasVoted",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "platformFees",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "_id",
        type: "uint64",
      },
      {
        internalType: "uint8",
        name: "_option",
        type: "uint8",
      },
    ],
    name: "setDaoVote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    name: "userList",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "userNumber",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "userToId",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "validatorFees",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "validatorNumber",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "validatorNumberRequired",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "validators",
    outputs: [
      {
        internalType: "address payable",
        name: "userAddress",
        type: "address",
      },
      {
        internalType: "bool",
        name: "isBlacklisted",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "strike",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawFromValidators",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x60806040526096600160006101000a81548160ff021916908360ff16021790555060326001806101000a81548160ff021916908360ff160217905550604b600160026101000a81548160ff021916908360ff160217905550604b600160036101000a81548160ff021916908360ff160217905550600a600160046101000a81548160ff021916908360ff1602179055506004600160056101000a81548161ffff021916908361ffff16021790555060018060096101000a81548167ffffffffffffffff021916908367ffffffffffffffff1602179055503480156100e257600080fd5b506001600081905550612440806100fa6000396000f3fe6080604052600436106101235760003560e01c8063494c3ee3116100a0578063cb61bd8c11610064578063cb61bd8c14610443578063d495e0571461046e578063dc07067114610497578063e55bd9d0146104a1578063fa52c7d8146104de5761016f565b8063494c3ee31461038f57806353db7e77146103b85780636694ba61146103e357806372e24fdd1461040e578063c5ee74eb146104395761016f565b806318dc4295116100e757806318dc4295146102b5578063194a4e7e146102f25780632b4e84131461031d578063455c928c1461034857806346123d821461035f5761016f565b80630b4805d3146101b75780630b85000d146101f45780630ed337ad1461021f578063139f29a11461024a57806313bb35a5146102755761016f565b3661016f5761c35034101561016d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161016490611919565b60405180910390fd5b005b600080369050146101b5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101ac90611985565b60405180910390fd5b005b3480156101c357600080fd5b506101de60048036038101906101d99190611a08565b61051d565b6040516101eb9190611a58565b60405180910390f35b34801561020057600080fd5b50610209610544565b6040516102169190611a8f565b60405180910390f35b34801561022b57600080fd5b50610234610557565b6040516102419190611a58565b60405180910390f35b34801561025657600080fd5b5061025f610571565b60405161026c9190611ac7565b60405180910390f35b34801561028157600080fd5b5061029c60048036038101906102979190611b0e565b610585565b6040516102ac9493929190611bcb565b60405180910390f35b3480156102c157600080fd5b506102dc60048036038101906102d79190611b0e565b6105cf565b6040516102e99190611c1f565b60405180910390f35b3480156102fe57600080fd5b50610307610602565b6040516103149190611a8f565b60405180910390f35b34801561032957600080fd5b50610332610615565b60405161033f9190611a58565b60405180910390f35b34801561035457600080fd5b5061035d61062f565b005b34801561036b57600080fd5b50610374610858565b60405161038696959493929190611c3a565b60405180910390f35b34801561039b57600080fd5b506103b660048036038101906103b19190611cc7565b6108f9565b005b3480156103c457600080fd5b506103cd610d69565b6040516103da9190611ac7565b60405180910390f35b3480156103ef57600080fd5b506103f8610d7d565b6040516104059190611a8f565b60405180910390f35b34801561041a57600080fd5b50610423610d8e565b6040516104309190611a8f565b60405180910390f35b610441610da1565b005b34801561044f57600080fd5b50610458610ffb565b6040516104659190611a8f565b60405180910390f35b34801561047a57600080fd5b5061049560048036038101906104909190611d2c565b61100e565b005b61049f611208565b005b3480156104ad57600080fd5b506104c860048036038101906104c39190611b0e565b611513565b6040516104d59190611d87565b60405180910390f35b3480156104ea57600080fd5b5061050560048036038101906105009190611a08565b611591565b60405161051493929190611dc3565b60405180910390f35b60056020528060005260406000206000915054906101000a900467ffffffffffffffff1681565b600160029054906101000a900460ff1681565b600160119054906101000a900467ffffffffffffffff1681565b600160079054906101000a900461ffff1681565b60026020528060005260406000206000915090508060000160009054906101000a900460ff16908060010154908060020154908060030160009054906101000a900460ff16905084565b60046020528060005260406000206000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600160009054906101000a900460ff1681565b600160099054906101000a900467ffffffffffffffff1681565b6000600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900467ffffffffffffffff1667ffffffffffffffff16146106cf576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106c690611e46565b60405180910390fd5b600160099054906101000a900467ffffffffffffffff16600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548167ffffffffffffffff021916908367ffffffffffffffff16021790555033600460006001600981819054906101000a900467ffffffffffffffff168092919061077690611e95565b91906101000a81548167ffffffffffffffff021916908367ffffffffffffffff16021790555067ffffffffffffffff1667ffffffffffffffff16815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507ff9ac505b144a1879609b52f02d3441e478cdd9c19c5d198a2712ac5184ecef673360018060099054906101000a900467ffffffffffffffff166108409190611ec5565b60405161084e929190611f3c565b60405180910390a1565b600080600080600080600160059054906101000a900461ffff16600160009054906101000a900460ff1660018054906101000a900460ff16600160029054906101000a900460ff16600160039054906101000a900460ff16600160049054906101000a900460ff168561ffff1695508460ff1694508360ff1693508260ff1692508160ff1691508060ff169050955095509550955095509550909192939495565b3373ffffffffffffffffffffffffffffffffffffffff16600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146109c0576040517fec752d2a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60001515600260008467ffffffffffffffff1667ffffffffffffffff16815260200190815260200160002060040160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16151514610a7b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a7290611fb1565b60405180910390fd5b60018160ff1603610acb57600260008367ffffffffffffffff1667ffffffffffffffff1681526020019081526020016000206001016000815480929190610ac190611fd1565b9190505550610b18565b60028160ff1603610b1757600260008367ffffffffffffffff1667ffffffffffffffff1681526020019081526020016000206002016000815480929190610b1190611fd1565b91905055505b5b6001600260008467ffffffffffffffff1667ffffffffffffffff16815260200190815260200160002060040160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055507f57fa7ee32e77146f6e9aadee04f4b229dea9dd0ee4e030569ae2c317a6635f86338383604051610bcb9392919061204a565b60405180910390a1600160039054906101000a900460ff1660ff16600160079054906101000a900461ffff1661ffff166064600260008667ffffffffffffffff1667ffffffffffffffff16815260200190815260200160002060010154610c329190612081565b610c3c91906120f2565b10610cbe57610cb9600260008467ffffffffffffffff1667ffffffffffffffff16815260200190815260200160002060000160009054906101000a900460ff16600260008567ffffffffffffffff1667ffffffffffffffff16815260200190815260200160002060030160009054906101000a900460ff166115e8565b610d65565b600160039054906101000a900460ff1660ff16600160079054906101000a900461ffff1661ffff166064600260008667ffffffffffffffff1667ffffffffffffffff16815260200190815260200160002060020154610d1d9190612081565b610d2791906120f2565b10610d64577f91944425928af46b7fe486868fbdd04cd88c32637b4c91612caa1781c1b91f8c82604051610d5b9190612123565b60405180910390a15b5b5050565b600160059054906101000a900461ffff1681565b60018054906101000a900460ff1681565b600160049054906101000a900460ff1681565b610da96117b8565b30670de0b6b3a76400008173ffffffffffffffffffffffffffffffffffffffff163111610e02576040517f47108e3e00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff16600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610ed2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ec99061218a565b60405180910390fd5b6000670de0b6b3a76400009050610ee933826117fe565b6000600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001600781819054906101000a900461ffff1680929190610f8b906121aa565b91906101000a81548161ffff021916908361ffff160217905550507fb3bc30c2eb83dd1ef4aad192471c667c224e080e78df2817341b34cc3f7c0cdb33600160079054906101000a900461ffff16604051610fe7929190612204565b60405180910390a15050610ff96118b2565b565b600160039054906101000a900460ff1681565b3373ffffffffffffffffffffffffffffffffffffffff16600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146110d5576040517fec752d2a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8160026000600160119054906101000a900467ffffffffffffffff1667ffffffffffffffff1667ffffffffffffffff16815260200190815260200160002060000160006101000a81548160ff0219169083600581111561113857611137611b3b565b5b021790555080600260006001601181819054906101000a900467ffffffffffffffff168092919061116890611e95565b91906101000a81548167ffffffffffffffff021916908367ffffffffffffffff16021790555067ffffffffffffffff1667ffffffffffffffff16815260200190815260200160002060030160006101000a81548160ff021916908360ff1602179055507f7db73385b391e7e7978c190c3b502ccedba9406d603a02455ab6abf83edaf73382826040516111fc92919061222d565b60405180910390a15050565b6000600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900467ffffffffffffffff1667ffffffffffffffff160361129f576040517f3a70817d00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b33670de0b6b3a76400008173ffffffffffffffffffffffffffffffffffffffff1631116112f8576040517f47108e3e00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b670de0b6b3a7640000341015611343576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161133a906122a2565b60405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff16600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1603611413576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161140a9061230e565b60405180910390fd5b61141d30346117fe565b33600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001600781819054906101000a900461ffff16809291906114be9061232e565b91906101000a81548161ffff021916908361ffff160217905550507f065c11cc5f89e47625944fdc09a187635ac139aaa42f9632d675d57e39b1473d336040516115089190611c1f565b60405180910390a150565b6000600260008367ffffffffffffffff1667ffffffffffffffff16815260200190815260200160002060040160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff169050919050565b60036020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060000160149054906101000a900460ff16908060010154905083565b600060058111156115fc576115fb611b3b565b5b82600581111561160f5761160e611b3b565b5b036116345780600160006101000a81548160ff021916908360ff1602179055506117b4565b6001600581111561164857611647611b3b565b5b82600581111561165b5761165a611b3b565b5b0361167f57806001806101000a81548160ff021916908360ff1602179055506117b3565b6002600581111561169357611692611b3b565b5b8260058111156116a6576116a5611b3b565b5b036116cb5780600160026101000a81548160ff021916908360ff1602179055506117b2565b600360058111156116df576116de611b3b565b5b8260058111156116f2576116f1611b3b565b5b036117175780600160036101000a81548160ff021916908360ff1602179055506117b1565b6004600581111561172b5761172a611b3b565b5b82600581111561173e5761173d611b3b565b5b03611768578060ff16600160056101000a81548161ffff021916908361ffff1602179055506117b0565b60058081111561177b5761177a611b3b565b5b82600581111561178e5761178d611b3b565b5b036117af5780600160046101000a81548160ff021916908360ff1602179055505b5b5b5b5b5b5050565b6002600054036117f4576040517f3ee5aeb500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6002600081905550565b6000808373ffffffffffffffffffffffffffffffffffffffff168360405161182590612389565b60006040518083038185875af1925050503d8060008114611862576040519150601f19603f3d011682016040523d82523d6000602084013e611867565b606091505b5091509150816118ac576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016118a3906123ea565b60405180910390fd5b50505050565b6001600081905550565b600082825260208201905092915050565b7f796f752063616e27742073656e64206c657373207468616e2035306b20776569600082015250565b60006119036020836118bc565b915061190e826118cd565b602082019050919050565b60006020820190508181036000830152611932816118f6565b9050919050565b7f4e6f2066616c6c6261636b206465736972656400000000000000000000000000600082015250565b600061196f6013836118bc565b915061197a82611939565b602082019050919050565b6000602082019050818103600083015261199e81611962565b9050919050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006119d5826119aa565b9050919050565b6119e5816119ca565b81146119f057600080fd5b50565b600081359050611a02816119dc565b92915050565b600060208284031215611a1e57611a1d6119a5565b5b6000611a2c848285016119f3565b91505092915050565b600067ffffffffffffffff82169050919050565b611a5281611a35565b82525050565b6000602082019050611a6d6000830184611a49565b92915050565b600060ff82169050919050565b611a8981611a73565b82525050565b6000602082019050611aa46000830184611a80565b92915050565b600061ffff82169050919050565b611ac181611aaa565b82525050565b6000602082019050611adc6000830184611ab8565b92915050565b611aeb81611a35565b8114611af657600080fd5b50565b600081359050611b0881611ae2565b92915050565b600060208284031215611b2457611b236119a5565b5b6000611b3284828501611af9565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60068110611b7b57611b7a611b3b565b5b50565b6000819050611b8c82611b6a565b919050565b6000611b9c82611b7e565b9050919050565b611bac81611b91565b82525050565b6000819050919050565b611bc581611bb2565b82525050565b6000608082019050611be06000830187611ba3565b611bed6020830186611bbc565b611bfa6040830185611bbc565b611c076060830184611a80565b95945050505050565b611c19816119ca565b82525050565b6000602082019050611c346000830184611c10565b92915050565b600060c082019050611c4f6000830189611bbc565b611c5c6020830188611bbc565b611c696040830187611bbc565b611c766060830186611bbc565b611c836080830185611bbc565b611c9060a0830184611bbc565b979650505050505050565b611ca481611a73565b8114611caf57600080fd5b50565b600081359050611cc181611c9b565b92915050565b60008060408385031215611cde57611cdd6119a5565b5b6000611cec85828601611af9565b9250506020611cfd85828601611cb2565b9150509250929050565b60068110611d1457600080fd5b50565b600081359050611d2681611d07565b92915050565b60008060408385031215611d4357611d426119a5565b5b6000611d5185828601611d17565b9250506020611d6285828601611cb2565b9150509250929050565b60008115159050919050565b611d8181611d6c565b82525050565b6000602082019050611d9c6000830184611d78565b92915050565b6000611dad826119aa565b9050919050565b611dbd81611da2565b82525050565b6000606082019050611dd86000830186611db4565b611de56020830185611d78565b611df26040830184611bbc565b949350505050565b7f7573657220616c72656164792065786973740000000000000000000000000000600082015250565b6000611e306012836118bc565b9150611e3b82611dfa565b602082019050919050565b60006020820190508181036000830152611e5f81611e23565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000611ea082611a35565b915067ffffffffffffffff8203611eba57611eb9611e66565b5b600182019050919050565b6000611ed082611a35565b9150611edb83611a35565b9250828203905067ffffffffffffffff811115611efb57611efa611e66565b5b92915050565b6000819050919050565b6000611f26611f21611f1c84611a35565b611f01565b611bb2565b9050919050565b611f3681611f0b565b82525050565b6000604082019050611f516000830185611c10565b611f5e6020830184611f2d565b9392505050565b7f616c726561647920766f74656400000000000000000000000000000000000000600082015250565b6000611f9b600d836118bc565b9150611fa682611f65565b602082019050919050565b60006020820190508181036000830152611fca81611f8e565b9050919050565b6000611fdc82611bb2565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361200e5761200d611e66565b5b600182019050919050565b600061203461202f61202a84611a73565b611f01565b611bb2565b9050919050565b61204481612019565b82525050565b600060608201905061205f6000830186611c10565b61206c6020830185611f2d565b612079604083018461203b565b949350505050565b600061208c82611bb2565b915061209783611bb2565b92508282026120a581611bb2565b915082820484148315176120bc576120bb611e66565b5b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b60006120fd82611bb2565b915061210883611bb2565b925082612118576121176120c3565b5b828204905092915050565b60006020820190506121386000830184611f2d565b92915050565b7f596f7520617265206e6f742076616c696461746f727300000000000000000000600082015250565b60006121746016836118bc565b915061217f8261213e565b602082019050919050565b600060208201905081810360008301526121a381612167565b9050919050565b60006121b582611aaa565b9150600082036121c8576121c7611e66565b5b600182039050919050565b60006121ee6121e96121e484611aaa565b611f01565b611bb2565b9050919050565b6121fe816121d3565b82525050565b60006040820190506122196000830185611c10565b61222660208301846121f5565b9392505050565b60006040820190506122426000830185611ba3565b61224f602083018461203b565b9392505050565b7f73656e6420312065746800000000000000000000000000000000000000000000600082015250565b600061228c600a836118bc565b915061229782612256565b602082019050919050565b600060208201905081810360008301526122bb8161227f565b9050919050565b7f596f7520616c7265616479206172650000000000000000000000000000000000600082015250565b60006122f8600f836118bc565b9150612303826122c2565b602082019050919050565b60006020820190508181036000830152612327816122eb565b9050919050565b600061233982611aaa565b915061ffff820361234d5761234c611e66565b5b600182019050919050565b600081905092915050565b50565b6000612373600083612358565b915061237e82612363565b600082019050919050565b600061239482612366565b9150819050919050565b7f4661696c656420746f2073656e64204574686572000000000000000000000000600082015250565b60006123d46014836118bc565b91506123df8261239e565b602082019050919050565b60006020820190508181036000830152612403816123c7565b905091905056fea2646970667358221220ecdc0445fbe5067aadc7c2acff9762f11c8ec5df99dd76c1b7e401c1f92de91b64736f6c63430008150033";

type BetWaveDAOConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BetWaveDAOConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BetWaveDAO__factory extends ContractFactory {
  constructor(...args: BetWaveDAOConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      BetWaveDAO & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): BetWaveDAO__factory {
    return super.connect(runner) as BetWaveDAO__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BetWaveDAOInterface {
    return new Interface(_abi) as BetWaveDAOInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): BetWaveDAO {
    return new Contract(address, _abi, runner) as unknown as BetWaveDAO;
  }
}
