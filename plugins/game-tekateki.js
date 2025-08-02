import fetch from "node-fetch"
const timeout = 60000;

let handler = async (m, { conn }) => {
    conn.tekateki = conn.tekateki ? conn.tekateki : {};
    const tekateki_id = m.chat;

    let json = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tekateki.json')).json()
    json = json[Math.floor(Math.random() * json.length)];

    let caption = `[ TEKA TEKI ]

• *Question :* ${json.soal}
• *Timeout :* 60 seconds


Reply to this message to answer the question
Type *nyerah* to surrender`.trim();
    conn.tekateki[tekateki_id] = {
        tekateki_id,
        msg: m.reply(`${caption}`),
        ...json,
        terjawab: false,
        timeout: setTimeout(() => {
            if (conn.tekateki[tekateki_id]) {
                m.reply(`Waktu habis! Jawaban yang benar adalah: *${json.jawaban}*`,)
                delete conn.tekateki[tekateki_id];
            }
        }, timeout),
    };
}
handler.help = ['tekateki']
handler.tags = ['game']
handler.command = /^tekateki/i

handler.register = false
handler.group = true

export default handler

// tested di bileys versi 6.5.0 dan sharp versi 0.30.5
// danaputra133