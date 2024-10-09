import { Coinbase, Transfer, Wallet } from "@coinbase/coinbase-sdk";
import { getRandomItems } from "../utils/random";

export const transferReward = async (accountAddress: `0x${string}`) => {
  const { API_KEY_NAME, API_KEY_PRIVATE_KEY, WALLET_DATA } = process.env;

  // Check if the environment variables are set
  if (!API_KEY_NAME || !API_KEY_PRIVATE_KEY) {
    return Response.json(
      { message: "Environment variables are not set" },
      { status: 500 }
    );
  }

  let userWallet;

  // Check if the wallet data is provided
  if (WALLET_DATA && WALLET_DATA?.length > 0) {
    try {
      // Parse the wallet data
      const seedFile = JSON.parse(WALLET_DATA || "{}");

      // Get the wallet ids
      const walletIds = Object.keys(seedFile);

      // get the random wallet id
      const walletId = getRandomItems(walletIds, 1)[0];

      // Get the seed of the wallet
      const seed = seedFile[walletId]?.seed;

      // Import the wallet
      userWallet = await Wallet.import({ seed, walletId });
      await userWallet.listAddresses();
    } catch (e) {
      return Response.json(
        { message: "Failed to import wallet" },
        { status: 500 }
      );
    }
  } else {
    // Otherwise, create a new wallet
    userWallet = await Wallet.create();
    try {
      // Request funds from the faucet if it's available
      await userWallet?.faucet();
    } catch (e) {
      // Log if the faucet is not available.
      console.log("Faucet is not available");
    }
  }

  // Create a transfer to the destination address
  let transfer: Transfer;
  try {
    transfer = await userWallet?.createTransfer({
      amount: 0.00000001,
      assetId: "eth",
      destination: accountAddress,
    });

    await transfer.wait();
  } catch (e) {
    console.error(e);
    return Response.json(
      { message: "Failed to create transfer" },
      { status: 500 }
    );
  }

  // Return the transaction hash and link
  return Response.json(
    {
      transactionHash: transfer?.getTransactionHash()?.substring(0, 10),
      transactionLink: transfer?.getTransactionLink(),
    }
  );
};
