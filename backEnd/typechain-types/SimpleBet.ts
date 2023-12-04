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
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "./common";

export interface SimpleBetInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "beginEventTimestamp"
      | "betWaveDaoAddress"
      | "betWavesOrganizerAddress"
      | "bettors"
      | "calculateValidatorReward"
      | "competitors"
      | "endEventTimestamp"
      | "getContractBalance"
      | "redeemToBettor"
      | "sendPlatfromAndCreatorFees"
      | "sendValidatorFees"
      | "setBet"
      | "setFeesBooleanToTrue"
      | "test"
      | "totalBet"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "beginEventTimestamp",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "betWaveDaoAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "betWavesOrganizerAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "bettors",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "calculateValidatorReward",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "competitors",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "endEventTimestamp",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getContractBalance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "redeemToBettor",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "sendPlatfromAndCreatorFees",
    values: [BigNumberish, BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "sendValidatorFees",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setBet",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setFeesBooleanToTrue",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "test", values?: undefined): string;
  encodeFunctionData(functionFragment: "totalBet", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "beginEventTimestamp",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "betWaveDaoAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "betWavesOrganizerAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "bettors", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "calculateValidatorReward",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "competitors",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "endEventTimestamp",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getContractBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "redeemToBettor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "sendPlatfromAndCreatorFees",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "sendValidatorFees",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setBet", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setFeesBooleanToTrue",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "test", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "totalBet", data: BytesLike): Result;
}

export interface SimpleBet extends BaseContract {
  connect(runner?: ContractRunner | null): SimpleBet;
  waitForDeployment(): Promise<this>;

  interface: SimpleBetInterface;

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

  beginEventTimestamp: TypedContractMethod<[], [bigint], "view">;

  betWaveDaoAddress: TypedContractMethod<[], [string], "view">;

  betWavesOrganizerAddress: TypedContractMethod<[], [string], "view">;

  bettors: TypedContractMethod<
    [arg0: AddressLike],
    [
      [string, bigint, bigint, bigint] & {
        bettorAddress: string;
        betId: bigint;
        bettingAmout: bigint;
        bettingReward: bigint;
      }
    ],
    "view"
  >;

  calculateValidatorReward: TypedContractMethod<
    [_validatorFees: BigNumberish],
    [bigint],
    "nonpayable"
  >;

  competitors: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [string, bigint, bigint, bigint] & {
        name: string;
        odd: bigint;
        betNumber: bigint;
        betAmount: bigint;
      }
    ],
    "view"
  >;

  endEventTimestamp: TypedContractMethod<[], [bigint], "view">;

  getContractBalance: TypedContractMethod<[], [bigint], "view">;

  redeemToBettor: TypedContractMethod<[], [void], "payable">;

  sendPlatfromAndCreatorFees: TypedContractMethod<
    [
      _plateformeFees: BigNumberish,
      _creatorFees: BigNumberish,
      _ownerAddress: AddressLike
    ],
    [void],
    "nonpayable"
  >;

  sendValidatorFees: TypedContractMethod<
    [_validatorAddress: AddressLike, _validatorReward: BigNumberish],
    [void],
    "nonpayable"
  >;

  setBet: TypedContractMethod<[_betId: BigNumberish], [void], "payable">;

  setFeesBooleanToTrue: TypedContractMethod<[], [void], "nonpayable">;

  test: TypedContractMethod<[], [bigint], "view">;

  totalBet: TypedContractMethod<[], [bigint], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "beginEventTimestamp"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "betWaveDaoAddress"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "betWavesOrganizerAddress"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "bettors"
  ): TypedContractMethod<
    [arg0: AddressLike],
    [
      [string, bigint, bigint, bigint] & {
        bettorAddress: string;
        betId: bigint;
        bettingAmout: bigint;
        bettingReward: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "calculateValidatorReward"
  ): TypedContractMethod<
    [_validatorFees: BigNumberish],
    [bigint],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "competitors"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [string, bigint, bigint, bigint] & {
        name: string;
        odd: bigint;
        betNumber: bigint;
        betAmount: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "endEventTimestamp"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getContractBalance"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "redeemToBettor"
  ): TypedContractMethod<[], [void], "payable">;
  getFunction(
    nameOrSignature: "sendPlatfromAndCreatorFees"
  ): TypedContractMethod<
    [
      _plateformeFees: BigNumberish,
      _creatorFees: BigNumberish,
      _ownerAddress: AddressLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "sendValidatorFees"
  ): TypedContractMethod<
    [_validatorAddress: AddressLike, _validatorReward: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setBet"
  ): TypedContractMethod<[_betId: BigNumberish], [void], "payable">;
  getFunction(
    nameOrSignature: "setFeesBooleanToTrue"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "test"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "totalBet"
  ): TypedContractMethod<[], [bigint], "view">;

  filters: {};
}
