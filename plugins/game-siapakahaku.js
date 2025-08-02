import fetch from "node-fetch"
const timeout = 60000;

let handler = async (m, { conn }) => {
    conn.siapakahaku = conn.siapakahaku ? conn.siapakahaku : {};
    const siapakahaku_id = m.chat;

    let json = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/siapakahaku.json')).json()
    json = json[Math.floor(Math.random() * json.length)];

    let caption = `[ SIAPAKAH AKU ]

• *Question :* ${json.soal}
• *Timeout :* 60 seconds


Reply to this message to answer the question
Type *nyerah* to surrender`.trim();
    conn.siapakahaku[siapakahaku_id] = {
        siapakahaku_id,
        msg: m.reply(`${caption}`),
        ...json,
        terjawab: false,
        timeout: setTimeout(() => {
            if (conn.siapakahaku[siapakahaku_id]) {
                m.reply(`Waktu habis! Jawaban yang benar adalah: *${json.jawaban}*`,)
                delete conn.siapakahaku[siapakahaku_id];
            }
        }, timeout),
    };
}
handler.help = ['siapakahaku']
handler.tags = ['game']
handler.command = /^siapakahaku/i

handler.register = false
handler.group = true

export default handler

// tested di bileys versi 6.5.0 dan sharp versi 0.30.5
// danaputra133