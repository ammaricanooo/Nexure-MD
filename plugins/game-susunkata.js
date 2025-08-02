import fetch from "node-fetch"
const timeout = 60000;

let handler = async (m, { conn }) => {
    conn.susunkata = conn.susunkata ? conn.susunkata : {};
    const susunkata_id = m.chat;

    let json = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/susunkata.json')).json()
    json = json[Math.floor(Math.random() * json.length)];

    let caption = `[ SUSUN KATA ]

• *Question :* ${json.soal}
• *Tipe :* ${json.tipe}
• *Timeout :* 60 seconds


Reply to this message to answer the question
Type *nyerah* to surrender`.trim();
    conn.susunkata[susunkata_id] = {
        susunkata_id,
        msg: m.reply(`${caption}`),
        ...json,
        terjawab: false,
        timeout: setTimeout(() => {
            if (conn.susunkata[susunkata_id]) {
                m.reply(`Waktu habis! Jawaban yang benar adalah: *${json.jawaban}*`,)
                delete conn.susunkata[susunkata_id];
            }
        }, timeout),
    };
}
handler.help = ['susunkata']
handler.tags = ['game']
handler.command = /^susunkata/i

handler.register = false
handler.group = true

export default handler

// tested di bileys versi 6.5.0 dan sharp versi 0.30.5
// danaputra133