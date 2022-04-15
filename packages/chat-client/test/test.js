import ChatClient from "../index.js";

// make fake wallet lol
let wallet = { publicKey: "fakepubkey1" };

it('sender', async () => {
	let wallet = { publicKey: "fakepubkey1" };
	const testClient = new ChatClient(wallet);

	try {
		await testClient.channelSubscribe("fakepubkey2", true);
		await new Promise(r => setTimeout(r, 2000));
		await testClient.sendMessage("hello world" ,"fakepubkey2", true);
		await testClient.sendMessage("hello world2" ,"fakepubkey2", true);
		await testClient.sendMessage("hello world3" ,"fakepubkey2", true);
	} finally {
		await testClient.kafkaProducer.disconnect();
		await testClient.kafkaConsumer.disconnect();
	}
})