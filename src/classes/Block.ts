import Transaction from "./Transaction";
import { hashIt } from "../helpers/hash";

// Individual block on the chain
class Block {
  public nonce = Math.round(Math.random() * 999999999);

  constructor(public prevHash: string, public transaction: Transaction, public ts = Date.now()) {
    console.log("New Block Created Its Nonce Is: " + this.nonce);
  }

  get hash() {
    const str = JSON.stringify(this);
    const hash = hashIt(str);
    return hash;
  }
}

export default Block;
