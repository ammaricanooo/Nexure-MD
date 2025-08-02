let handler = async (m) => {
  let replyMessage = `
*「 Owner Website 」*

Nonton Anime: arnime.ammaricano.my.id
Rest API: api.ammaricano.my.id

`.trim();

  m.reply(replyMessage);
};

handler.help = ['website']
handler.tags = ['main']
handler.command = /^(website)$/i

handler.limit = false

export default handler
