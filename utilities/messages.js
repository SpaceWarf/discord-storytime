const getMessagesForUser = async (channel, userId) => {
  let messages = await channel.messages.fetch();
  return messages.filter(message => message.author.id === userId);
}

const getLastUserMessages = async (channel, userId) => {
  const userMessages = await getMessagesForUser(channel, userId);
  const userMessagesTimestamps = userMessages
    .map(msg => msg.createdTimestamp)
    .filter(timestamp => timestamp >= new Date().getTime() - 60000);

  return userMessages.filter(msg => userMessagesTimestamps.includes(msg.createdTimestamp))
    || [];
}

module.exports = {
  getMessagesForUser,
  getLastUserMessages
};
