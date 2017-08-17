const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TopicSchema = new Schema({
  "creator" : {type: String, required: true, unique: true},
  "title": {type: String, require: true},
  "content": {type: String, require: true},
  "time": {type: String, require: true}
});

var TopicModel = mongoose.model("topics", TopicSchema);

async function getTopics() {
  const topics = await TopicModel.find({})
    .catch(err => {
      throw Error(err);
    });
  return topics;
}

async function createTopic(params) {
  console.log(params);
  if (!params.creator || !params.title || !params.content || !params.time) {
    throw Error('请把资料补充完整');
  }
  const topic = await TopicModel.create(params)
    .catch(err => {
      throw Error(err);
    });
  if (topic) {
    return topic;
  }
}

async function updateTopic(id, update) {
  const topic = await TopicModel.findOneAndUpdate({_id: id}, update, {new: true})
    .catch(err => {
      throw Error(err);
    });
  if (topic) {
    return topic;
  }
}

async function findTopicById(id) {
  const topic = await TopicModel.findOne({_id: id})
    .catch(err => {
      throw Error(err);
    });
  return topic;
}

module.exports = {
  model: TopicModel,
  getTopics,
  createTopic,
  updateTopic,
  findTopicById
};