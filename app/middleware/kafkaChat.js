// request topicId from UID from kafka
// get chat, create chat





// const create = async () => {
//
// }
//
const {Kafka} = require('kafkajs');
const test = async () => {
    const kafka = new Kafka({
        clientId: 'my-app',
        brokers: ['kafka1:19092'],
    });
    const producer = kafka.producer()
    await producer.connect()
    // use uuid gen for topic
    // push first message to kafka
    await producer.send({
        topic: 'test-topic',
        messages: [
            { key: 'foo', value: 'does this work'},
            { key: 'foo1', value: 'Hello KafkaJS user!' },
        ],
    })
    await producer.disconnect()
    // groupId - Event, Peer2Peer, GroupDriveChat

    const consumer = kafka.consumer({ groupId: 'test-group' })
    await consumer.connect()
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })
    await consumer.run({
        eachMessage: async ({ topic, partition, message, heartbeat }) => {
            console.log({
                key: message.key.toString(),
                value: message.value.toString(),

            })
        },
    })

}


module.exports = {test};