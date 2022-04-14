const { WalletAccountError } = require('@solana/wallet-adapter-base');
const { Kafka } = require('kafkajs');

// just some general knowledge:
// this reads from a kafka service we plan to decentralize and offer rewards for running
// but as it it POC we're just going to use a centralized service
// 
// Client reads from a kafka topic called 'buyerPK:sellerPK'
// Sender must sign messages with its private key
// If messages are recieved but cannot be verified as signed by the proper address
// (as specified in the topic name) then the message is dropped
//
// All messages are exchanged through the kafka service...

const startclient = (wallet) => {
	const kafkaDriver = new Kafka({
		clientId: 'chat-client',
		brokers: ['localhost:9092'],
	});
	
	const kafkaProducer = kafkaDriver.producer();
	const kafkaConsumer = kafkaDriver.consumer({ groupId: wallet.publicKey }); 

	// return our producer and consumer
	return{ kafkaConsumer, kafkaProducer };
}

// Send a message
const txMessage = async (producer, message, wallet, counterpartyPk) => {
}

// Receive a message 
const rxMessage = async (consumer, wallet, counterpartyPk) => {
}