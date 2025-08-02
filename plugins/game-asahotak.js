import fetch from "node-fetch"
const timeout = 60000;

let handler = async (m, { conn }) => {
    conn.asahotak = conn.asahotak ? conn.asahotak : {};
    const asahotak_id = m.chat;

    let json = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/asahotak.json')).json()
    json = json[Math.floor(Math.random() * json.length)];

    let caption = `[ ASAH OTAK ]

• *Question :* ${json.soal}
• *Timeout :* 60 seconds


Reply to this message to answer the question
Type *nyerah* to surrender`.trim();
    conn.asahotak[asahotak_id] = {
        asahotak_id,
        msg: m.reply(`${caption}`),
        ...json,
        terjawab: false,
        timeout: setTimeout(() => {
            if (conn.asahotak[asahotak_id]) {
                m.reply(`Waktu habis! Jawaban yang benar adalah: *${json.jawaban}*`,)
                delete conn.asahotak[asahotak_id];
            }
        }, timeout),
    };
}
handler.help = ['asahotak']
handler.tags = ['game']
handler.command = /^asahotak/i

handler.register = false
handler.group = true

export default handler

// tested di bileys versi 6.5.0 dan sharp versi 0.30.5
// danaputra133