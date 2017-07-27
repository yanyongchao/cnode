let TOPIC_ID_INIT = 10000;
const topics = [];
class Topic {
    constructor(params) {
        if (!params.creator) throw {code: -1, msg: 'a topic must be sent by a user'};
        if (!params.title) throw {code: -1, msg: 'a topic must be sent by a title'};
        if (params.content.length < 5) throw {code: -1, msg: 'a topic must be longer five lenght'};
        this.creator = params.creator;
        this.title = params.title;
        this.content = params.content;
        this._id = TOPIC_ID_INIT++;
    }
}

async function createANewTopic(params) {
    const topic = new Topic(params);
    topics.push(topic);
    return topic;
}

async function getTopics(params) {
    return topics;
}

async function getTopicById(topicId) {
    return topics.find(u => u._id === topicId);
}

async function updateTopicById(topicId, update) {
    let u = topics.find(u => u._id === topicId);
    if (update.title) {
        u.title = update.title;
    }
    if (update.content) {
        u.content = update.content;
    }
    return u;
}

module.exports = {
    model: Topic,
    createANewTopic,
    getTopics,
    getTopicById,
    updateTopicById
};