import { Bool, Field, Struct, ZkProgram } from 'o1js';

class MyStruct extends Struct({
  isValid: Bool,
  id: Field,
  someOtherField: Field,
}) {
  myIsValid(): Bool {
    return this.isValid;
  }
}

class PublicInput extends Struct({
  value: MyStruct,
}) {}

class PublicOutput extends Struct({}) {}

const prove = (input: PublicInput): PublicOutput => {
  input.value.myIsValid().assertTrue();

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
