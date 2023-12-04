/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export interface BetWaveOrganizerInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "betList"
      | "deployNewBet"
      | "getBetValidatorsResult"
      | "getvalidatorAddress"
      | "setBetVote"
      | "startBetValidation"
      | "tallyVote"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "newBet" | "startCount" | "startValidation"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "betList",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "deployNewBet",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getBetValidatorsResult",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getvalidatorAddress",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setBetVote",
    values: [BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "startBetValidation",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "tallyVote",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(functionFragment: "betList", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "deployNewBet",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getBetValidatorsResult",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getvalidatorAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setBetVote", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "startBetValidation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "tallyVote", data: BytesLike): Result;
}

export namespace newBetEvent {
  export type InputTuple = [arg0: AddressLike, arg1: string, arg2: string];
  export type OutputTuple = [arg0: string, arg1: string, arg2: string];
  export interface OutputObject {
    arg0: string;
    arg1: string;
    arg2: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace startCountEvent {
  export type InputTuple = [arg0: AddressLike];
  export type OutputTuple = [arg0: string];
  export interface OutputObject {
    arg0: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace startValidationEvent {
  export type InputTuple = [arg0: AddressLike];
  export type OutputTuple = [arg0: string];
  export interface OutputObject {
    arg0: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface BetWaveOrganizer extends BaseContract {
  connect(runner?: ContractRunner | null): BetWaveOrganizer;
  waitForDeployment(): Promise<this>;

  interface: BetWaveOrganizerInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  betList: TypedContractMethod<
    [arg0: AddressLike],
    [
      [bigint, string, string, string, bigint, bigint, bigint, bigint] & {
        validationNumber: bigint;
        compName1: string;
        compName2: string;
        owner: string;
        voteCount: bigint;
        comp1VoteCount: bigint;
        comp2VoteCount: bigint;
        betStatus: bigint;
      }
    ],
    "view"
  >;

  deployNewBet: TypedContractMethod<
    [_compName1: string, _compName2: string],
    [void],
    "nonpayable"
  >;

  getBetValidatorsResult: TypedContractMethod<
    [_betAddress: AddressLike],
    [bigint],
    "view"
  >;

  getvalidatorAddress: TypedContractMethod<
    [_betAddress: AddressLike, _id: BigNumberish],
    [string],
    "view"
  >;

  setBetVote: TypedContractMethod<
    [_compId: BigNumberish, _betAddress: AddressLike],
    [void],
    "nonpayable"
  >;

  startBetValidation: TypedContractMethod<
    [_betAddress: AddressLike],
    [void],
    "nonpayable"
  >;

  tallyVote: TypedContractMethod<
    [_betAddress: AddressLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "betList"
  ): TypedContractMethod<
    [arg0: AddressLike],
    [
      [bigint, string, string, string, bigint, bigint, bigint, bigint] & {
        validationNumber: bigint;
        compName1: string;
        compName2: string;
        owner: string;
        voteCount: bigint;
        comp1VoteCount: bigint;
        comp2VoteCount: bigint;
        betStatus: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "deployNewBet"
  ): TypedContractMethod<
    [_compName1: string, _compName2: string],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "getBetValidatorsResult"
  ): TypedContractMethod<[_betAddress: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "getvalidatorAddress"
  ): TypedContractMethod<
    [_betAddress: AddressLike, _id: BigNumberish],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "setBetVote"
  ): TypedContractMethod<
    [_compId: BigNumberish, _betAddress: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "startBetValidation"
  ): TypedContractMethod<[_betAddress: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "tallyVote"
  ): TypedContractMethod<[_betAddress: AddressLike], [void], "nonpayable">;

  getEvent(
    key: "newBet"
  ): TypedContractEvent<
    newBetEvent.InputTuple,
    newBetEvent.OutputTuple,
    newBetEvent.OutputObject
  >;
  getEvent(
    key: "startCount"
  ): TypedContractEvent<
    startCountEvent.InputTuple,
    startCountEvent.OutputTuple,
    startCountEvent.OutputObject
  >;
  getEvent(
    key: "startValidation"
  ): TypedContractEvent<
    startValidationEvent.InputTuple,
    startValidationEvent.OutputTuple,
    startValidationEvent.OutputObject
  >;

  filters: {
    "newBet(address,string,string)": TypedContractEvent<
      newBetEvent.InputTuple,
      newBetEvent.OutputTuple,
      newBetEvent.OutputObject
    >;
    newBet: TypedContractEvent<
      newBetEvent.InputTuple,
      newBetEvent.OutputTuple,
      newBetEvent.OutputObject
    >;

    "startCount(address)": TypedContractEvent<
      startCountEvent.InputTuple,
      startCountEvent.OutputTuple,
      startCountEvent.OutputObject
    >;
    startCount: TypedContractEvent<
      startCountEvent.InputTuple,
      startCountEvent.OutputTuple,
      startCountEvent.OutputObject
    >;

    "startValidation(address)": TypedContractEvent<
      startValidationEvent.InputTuple,
      startValidationEvent.OutputTuple,
      startValidationEvent.OutputObject
    >;
    startValidation: TypedContractEvent<
      startValidationEvent.InputTuple,
      startValidationEvent.OutputTuple,
      startValidationEvent.OutputObject
    >;
  };
}
