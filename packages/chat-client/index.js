import { Kafka } from 'kafkajs';

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

export default class ChatClient {

	constructor(wallet) {
		this.wallet = wallet;

		// can this client id overlap?
		this.kafkaDriver = new Kafka({
			clientId: 'chat-client',
			brokers: ['localhost:9092'],
		});
		

		this.admin = this.kafkaDriver.admin();
		this.kafkaProducer = this.kafkaDriver.producer();
		this.kafkaConsumer = this.kafkaDriver.consumer({ groupId: 'chat-client' });
	}

	// send a message to a counterparty (a solana wallet)
	sendMessage = async (message, counterpartyPk, isSeller) => {
		await this.kafkaProducer.connect();

		let topicName = isSeller 
			? `${this.wallet.publicKey}${counterpartyPk}`
			: `${counterpartyPk}${this.wallet.publicKey}`;

		// here we sign the message
		//let signedMessage = await wallet.signMessage(message);

		// encrypt message
		// something something here

		await this.kafkaProducer.send({
			topic: topicName,
			messages: [
				{ 
					value: message
				},
			]
		})
	}

	// Receive a message 
	channelSubscribe = async (counterpartyPk, isSeller) => {
		await this.kafkaConsumer.connect();
		let topicName = isSeller 
			? `${this.wallet.publicKey}${counterpartyPk}` 
			: `${counterpartyPk}${this.wallet.publicKey}`;

		await this.kafkaConsumer.subscribe({
			topic: topicName,
			fromBeginning: true,
		});

		await this.kafkaConsumer.run({
			eachMessage: async ({ topic, partition, message }) => {
				console.log(`${topic} <- ${message.value.toString()}`);
			}
		});
	}
}