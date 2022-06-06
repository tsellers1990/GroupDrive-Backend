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
        brokers: ['192.168.56.1:9092'],
    });
    const producer = kafka.producer()
    await producer.connect()
    await producer.send({
        topic: 'test-topic',
        messages: [
            { value: 'Hello KafkaJS user!                       ' },
        ],
    })
    await producer.disconnect()
    const consumer = kafka.consumer({ groupId: 'test-group' })
    await consumer.connect()
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                value: message.value.toString(),
            })
        },
    })

}


module.exports = {test};