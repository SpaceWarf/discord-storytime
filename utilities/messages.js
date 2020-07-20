const getMessagesForUser = async (channel, userId) => {
  let messages = await channel.fetchMessages();
  return messages.filter(message => message.author.id === userId);
}

const getLastUserMessage = async (channel, userId) => {
  const userMessages = await getMessagesForUser(channel, userId);
  const lastUserMessageTimestamp = userMessages.map(msg => msg.createdTimestamp)[1];

  // If the last found message if older than one minute, it's probably not related to the command
  if (lastUserMessageTimestamp < (new Date()).getTime() - 60000) {
    return { content: "" };
  }

  return userMessages.find(msg => msg.createdTimestamp === lastUserMessageTimestamp)
    || { content: "" };
}

module.exports = {
  getMessagesForUser,
  getLastUserMessage
};
