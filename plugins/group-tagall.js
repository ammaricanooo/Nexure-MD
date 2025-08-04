import { generateWAMessageFromContent } from '@adiwajshing/baileys'

let handler = async (m, { conn, text, participants, isAdmin, isOwner }) => {
    if (text || m.quoted?.text) {
        let q = m.quoted ? m.quoted : m
        let teks = `┌─${text ? text : q.text}\n${readMore}`
        for (let mem of participants) {
            teks += `\n│◦❒ @${mem.id.split('@')[0]}`
        }
        teks += `\n└───────`
        await conn.sendMessage(m.chat, { text: teks, mentions: participants.map((a) => a.id) })
    } else {
        let teks = `┌─「 Tag All 」\n${readMore}`
        for (let mem of participants) {
            teks += `\n│◦❒ @${mem.id.split('@')[0]}`
        }
        teks += `\n└───────`
        await conn.sendMessage(m.chat, { text: teks, mentions: participants.map((a) => a.id) })
    }
}

handler.help = ['tagall']
handler.tags = ['group']
handler.command = ['tagall']
handler.admin = true
handler.group = true

export default handler
