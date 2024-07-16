import fetch from 'node-fetch'
let handler = async (m, { conn }) => {
  let caption = `
*「 معلومات عن صاحب البوت 」*

*Number :*\nwa.me/201020182886
*instagram:*\ninstagram.com/_bcqf

*youtube:*\nyoutube.com/@EG-SNIPER

*facebook page:*\nfacebook.com/profile.php?id=100077566560854

*My website :* egsniper.com

`.trim()
  m.reply(caption)
}
handler.help = ['owner']
handler.tags = ['infobot']
handler.command = /^(owner)|المالك|سورس|السورس|المطور$/i
handler.limit = false

export default handler
