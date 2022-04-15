const ChatClient = require('../index.js');

// make fake wallet lol
let wallet = { publicKey: "fakepubkey1" };

it('testing', function() {
	const testClient = new ChatClient(wallet);

	try{
		testClient.sendMessage("hello world" ,"fakepubkey2", true);
	} finally {
		testClient.kafkaProducer.disconnect();
		testClient.kafkaConsumer.disconnect();
	}
})