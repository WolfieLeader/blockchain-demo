import Transaction from "./Transaction";
import Chain from "./Chain";
import { getKeyPair } from "../helpers/keypair";
import { signIt } from "../helpers/sign";

// Wallet gives a user a public/private keypair
class Wallet {
  public publicKey: string;
  public privateKey: string;

  constructor() {
    const keypair = getKeyPair();

    this.privateKey = keypair.privateKey;
    this.publicKey = keypair.publicKey;
  }

  sendMoney(amount: number, payeePublicKey: string) {
    const transaction = new Transaction(amount, this.publicKey, payeePublicKey);
    const signature = signIt(transaction.toString(), this.privateKey);
    Chain.instance.addBlock(transaction, this.publicKey, signature);
  }
}

export default Wallet;
