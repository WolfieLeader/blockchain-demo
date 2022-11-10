import * as crypto from "crypto";
import Transaction from "./Transaction";
import Block from "./Block";
import { verifyIt } from "../helpers/sign";
import { easyHashIt } from "../helpers/hash";

// The blockchain
class Chain {
  // Singleton instance
  public static instance = new Chain();

  chain: Block[];

  constructor() {
    this.chain = [
      // Genesis block
      new Block("", new Transaction(100, "genesis", "satoshi")),
    ];
  }

  // Most recent block
  get lastBlock() {
    return this.chain[this.chain.length - 1];
  }

  // Proof of work system
  mine(nonce: number) {
    let solution = 1;
    console.log("⛏️  mining...");

    while (true) {
      const attempt = (nonce + solution).toString();
      const hash = easyHashIt(attempt);
      if (hash.startsWith("0000")) {
        console.log(`Solved: ${solution}`);
        return solution;
      }
      solution += 1;
    }
  }

  // Add a new block to the chain if valid signature & proof of work is complete
  addBlock(transaction: Transaction, senderPublicKey: string, signature: string) {
    const isValid = verifyIt(transaction.toString(), signature, senderPublicKey);
    if (!isValid) return;

    const newBlock = new Block(this.lastBlock.hash, transaction);
    this.mine(newBlock.nonce);
    this.chain.push(newBlock);
  }
}

export default Chain;
