import fetch from "node-fetch"
const timeout = 60000;

let handler = async (m, { conn }) => {
    conn.caklontong = conn.caklontong ? conn.caklontong : {};
    const caklontong_id = m.chat;

    let json = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/caklontong.json')).json()
    json = json[Math.floor(Math.random() * json.length)];

    let caption = `[ CAK LONTONG ]

• *Question :* ${json.soal}
• *Timeout :* 60 seconds


Reply to this message to answer the question
Type *nyerah* to surrender`.trim();
    conn.caklontong[caklontong_id] = {
        caklontong_id,
        msg: m.reply(`${caption}`),
        ...json,
        terjawab: false,
        timeout: setTimeout(() => {
            if (conn.caklontong[caklontong_id]) {
                m.reply(`Waktu habis! Jawaban yang benar adalah: *${json.jawaban}*`,)
                delete conn.caklontong[caklontong_id];
            }
        }, timeout),
    };
}
handler.help = ['caklontong']
handler.tags = ['game']
handler.command = /^caklontong/i

handler.register = false
handler.group = true

export default handler

// tested di bileys versi 6.5.0 dan sharp versi 0.30.5
// danaputra133