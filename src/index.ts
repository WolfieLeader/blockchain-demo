import Wallet from "./classes/Wallet";
import Chain from "./classes/Chain";

// Example usage

const satoshi = new Wallet();
const bob = new Wallet();
const alice = new Wallet();

satoshi.sendMoney(50, bob.publicKey);
bob.sendMoney(23, alice.publicKey);
alice.sendMoney(5, bob.publicKey);

//Show the current blocks in the chain
console.log(Chain.instance);
