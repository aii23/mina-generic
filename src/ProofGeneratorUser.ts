import { Bool, Field, Struct } from 'o1js';
import { generateProof } from './ProofGenerator';

class MyStruct extends Struct({
  isValid: Bool,
  id: Field,
  someOtherField: Field,
}) {
  myIsValid(): Bool {
    return this.isValid;
  }
}

let { PublicInput, PublicOutput, ZkApp } = generateProof(MyStruct);
