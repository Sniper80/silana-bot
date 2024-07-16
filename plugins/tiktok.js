import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) throw `مثال : \n${usedPrefix + command} https://www.tiktok.com/@egsniper4/video/7327413030008982789`
  conn.sendMessage(m.chat, { react: { text: '🕐', key: m.key }})
  let kiku = await fetch(`https://aemt.me/download/ttdl?url=${text}`) 
  try {
  let res = await kiku.json()
await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
  conn.sendFile(m.chat, res.result.video[0], 'tiktok.mp4', 'success', m)
   } catch (e) {
    console.log(e);
    m.reply('not found') 
  }
}
handler.help = ['tiktok'];
handler.tags = ['downloader'];
handler.command = /^(tiktok|tt|tiktokdl)$/i;
export default handler;
