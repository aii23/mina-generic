import { Bool, Struct, ZkProgram } from 'o1js';

interface IProofInfo<T, K> {
  PublicInput: Struct<T>;
  PublicOutput: Struct<K>;
  ZkApp: ZkProgram<Struct<T>, Struct<K>>; // ?
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
    input.value.myIsValid().assertTrue(); // ?

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
    PublicInput,
    PublicOutput,
    ZkApp,
  };
}

// PublicInput is not struct?
// No valid in value
