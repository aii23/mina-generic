import { Bool, FlexibleProvablePure, Struct, ZkProgram } from 'o1js';

interface IProofInfo<
  T extends FlexibleProvablePure<any>,
  K extends FlexibleProvablePure<any>
> {
  PublicInput: T;
  PublicOutput: K;
  ZkApp: ZkProgram<{ publicInput: T; publicOutput: K }, any>; // Struct can't be used as PublicInput???
}

interface IValid {
  myIsValid: () => Bool;
}

export function generateProof<ST extends IValid, T, K>(
  someType: new (value: any) => ST
): IProofInfo<T, K> {
  class PublicInput extends Struct({
    value: someType,
  }) {}

  class PublicOutput extends Struct({}) {}

  const prove = (input: PublicInput): PublicOutput => {
    input.value.myIsValid().assertTrue(); // No myIsValid property, but value shoud have it

    return new PublicOutput({});
  };

  const ZkApp = ZkProgram({
    name: 'zk-app',
    publicInput: PublicInput,
    publicOutput: PublicOutput,
    methods: {
      prove: {
        privateInputs: [],

        method: prove,
      },
    },
  });

  return {
    PublicInput, // PublicOutput is not assignable to type Struct
    PublicOutput, // PublicInput is not assignable to type Struct
    ZkApp, // ZKApp is not assignable to type ZKProgram
  };
}
