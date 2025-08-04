let handler = async (m, { conn, text, participants }) => {
	const fkontak = {
		"key": {
			"participants": "0@s.whatsapp.net",
			"remoteJid": "status@broadcast",
			"fromMe": false,
			"id": "Halo"
		},
		"message": {
			"contactMessage": {
				"vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
			}
		},
		"participant": "0@s.whatsapp.net"
	}

    const rawText = m.quoted?.text || text ;
    const texts = rawText.replace(new RegExp(`^${m.prefix}${m.command}\\s*`, 'i'), '').trim();
    const mentions = participants.map(a => a.id);

	conn.sendMessage(m.chat, { text: texts || 'Tag semua member 👥', mentions }, { quoted: fkontak })
}

handler.help = ['hidetag']
handler.tags = ['group']
handler.command = /^(hidetag|totag|ht|h)$/i

handler.group = true
handler.admin = true

export default handler
