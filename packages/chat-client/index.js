const { Provider } = require('@project-serum/anchor');
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

export class ChatClient {

	constructor(wallet) {
		this.wallet = wallet;

		// can this client id overlap?
		this.kafkaDriver = new Kafka({
			clientId: 'chat-client',
			brokers: ['localhost:9092'],
		});

		this.kafkaProducer = this.kafkaDriver.producer();
		this.kafkaConsumer = this.kafkaDriver.consumer({ groupId: 'chat-client' });

		await this.kafkaProducer.connect();
		await this.kafkaConsumer.connect();

		// set up encryption consts, load from browser if possible
	}
	
	// send a message to a counterparty (a solana wallet)
	sendMessage = async (counterpartyPk, isSeller) => {
		let topicName = isSeller 
			? `${wallet.publicKey}:${counterpartyPk}`
			: `${counterpartyPk}:${wallet.publicKey}`;

		// here we sign the message
		let signedMessage = await wallet.signMessage(message);

		// encrypt message
		// something something here

		await this.kafkaProducer.send({
			topic: topicName,
			messages: [
				{ 
					value: signedMessage
				},
			]
		})
	}

	// Receive a message 
	channelSubscribe = async (counterpartyPk, isSeller) => {
		let topicName = isSeller 
			? `${wallet.publicKey}:${counterpartyPk}` 
			: `${counterpartyPk}:${wallet.publicKey}`;

		await this.kafkaConsumer.subscribe({
			topic: topicName,
			fromBeginning: true,
		});

		await consumer.run({
			eachMessage: async ({ topic, partition, message }) => {
				console.log(`${topic} <- ${message.value.toString()}`);
			}
		});
	}
}