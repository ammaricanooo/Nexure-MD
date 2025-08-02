import fetch from "node-fetch"
const timeout = 60000;

let handler = async (m, { conn }) => {
    conn.tebakgambar = conn.tebakgambar ? conn.tebakgambar : {};
    const tebakgambar_id = m.chat;

    let json = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakgambar.json')).json()
    json = json[Math.floor(Math.random() * json.length)];

    let caption = `[ TEBAK GAMBAR ]

• *Question :* ${json.soal}
• *Timeout :* 60 seconds


Reply to this message to answer the question
Type *nyerah* to surrender`.trim();
    conn.tebakgambar[tebakgambar_id] = {
        tebakgambar_id,
        msg: conn.sendMessage(m.chat, { image: { url: json.img }, caption }, { quoted: m }),
        ...json,
        terjawab: false,
        timeout: setTimeout(() => {
            if (conn.tebakgambar[tebakgambar_id]) {
                m.reply(`Waktu habis! Jawaban yang benar adalah: *${json.jawaban}*`,)
                delete conn.tebakgambar[tebakgambar_id];
            }
        }, timeout),
    };
}
handler.help = ['tebakgambar']
handler.tags = ['game']
handler.command = /^tebakgambar/i

handler.register = false
handler.group = true

export default handler

// tested di bileys versi 6.5.0 dan sharp versi 0.30.5
// danaputra133