import cheerio from 'cheerio';
import fetch from 'node-fetch';
import mime from 'mime-types';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {

    let lister = [
        "s",
        "d"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("+")
    if (!lister.includes(feature)) return m.reply("*هذا الامر سوف ينفع المصممين و اصحاب المونتاج سواء الصور او الفيديو يمكن من خلال هذا الامر تحميل الخطوط العربية منها والاجنبية من موقع*\n\nhttps://www.dafont.com/\n\n سوف اعطيك مثال لكيفية تشغيله:\n\n*.dafonts s+arab*\n\nالان عندما يعطيك البوت الروابط الخاصة بالخطوط قم بنسخ الدي تريد ثم اكتب \n\n*.dafonts d+*(رابط الخط)\n\n♥\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "s") {
            if (!inputs) return m.reply("مثال \n\n.dafonts s+arab")
            await m.reply(wait)
            try {
                let res = await searchDafont(inputs)
                let teks = res.map((item, index) => {
                    return `🔍 *[ RESULT ${index + 1} ]*

📰 *Title:* ${item.title}
🔗 *Link:* ${item.link}
📌 *Theme:* ${item.theme}
🏷️ *Theme link:* ${item.themeLink}
👤 *Author Name:* ${item.author}
🔗 *Author Link:* ${item.authorLink}
🔢 *Total Downloads:* ${formatNumber(item.totalDownloads)}
🖼️ *Preview Image:* ${item.previewImage}`

                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply('error')
            }
        }

        if (feature == "d") {
            if (!inputs) return m.reply("مثال:\n\n.dafonts d+https://www.dafont.com/arabia.font")
            try {
                let item = await downloadDafont(inputs)
                let cap = '🔍 *[ RESULT ]*\n\n📰 *Title:* ' + item.title +
          '\n👤 *Author:* ' + item.author +
          '\n📌 *Theme:* ' + item.theme +
          '\n🔢 *Total Downloads:* ' + formatNumber(item.totalDownloads) +
          '\n📁 *Filenames:*\n' + item.filename.map((e, i) => '   ' + (i + 1) + '. \'' + e + '\'').join('\n') +
          '\n🖼️ *Image:* ' + item.image +
          '\n📝 *Note:* ' + item.note.replace(/(Note of the author)(.*)/, '$1\n$2') +
          '\n⬇️ *Download:* ' + item.download
          let details = await getFileDetails(item.download)
          
                await conn.sendFile(m.chat, item.image, "", cap, m)
                await conn.sendFile(m.chat, item.download, item.title + details.fileFormat, null, m, true, {
                    quoted: m,
                    mimetype: details.mimeType
                })
                
            } catch (e) {
                await m.reply('error')
            }
        }
    }
}
handler.help = ["dafonts"]
handler.tags = ["downloader"]
handler.command = /^(dafonts)$/i
export default handler

/* New Line */
async function searchDafont(q) {
  const response = await fetch(`https://www.dafont.com/search.php?q=${q}`);
  const html = await response.text();
  const $ = cheerio.load(html);

  const results = [];

  const regex = /<div class="lv1left dfbg">.*?<span class="highlight">(.*?)<\/span>.*?by <a href="(.*?)">(.*?)<\/a>.*?<\/div>.*?<div class="lv1right dfbg">.*?<a href="(.*?)">(.*?)<\/a>.*?>(.*?)<\/a>.*?<\/div>.*?<div class="lv2right">.*?<span class="light">(.*?)<\/span>.*?<\/div>.*?<div style="background-image:url\((.*?)\)" class="preview">.*?<a href="(.*?)">/g;

  let match;
  while ((match = regex.exec(html)) !== null) {
    const [, title, authorLink, author, themeLink, theme, , totalDownloads, previewImage, link] = match;

    const result = {
      title: title.trim() || 'Tidak diketahui',
      authorLink: `https://www.dafont.com/${authorLink.trim()}` || 'Tidak diketahui',
      author: author.trim() || 'Tidak diketahui',
      themeLink: `https://www.dafont.com/${themeLink.trim()}` || 'Tidak diketahui',
      theme: theme.trim() || 'Tidak diketahui',
      totalDownloads: totalDownloads.trim().replace(/[^0-9]/g, '') || 'Tidak diketahui',
      previewImage: `https://www.dafont.com${previewImage.trim()}` || 'Tidak diketahui',
      link: `https://www.dafont.com/${link.trim()}` || 'Tidak diketahui',
    };

    results.push(result);
  }

  return results;
}

async function downloadDafont(link) {
  const response = await fetch(link);
  const html = await response.text();
  const $ = cheerio.load(html);

  const getValue = (selector) => $(selector).text().trim();
  const getFilenames = () => $('.filename').toArray().map(element => $(element).text().trim());
  const getImage = () => 'https://www.dafont.com' + $('.preview').css('background-image').replace(/^url\(["']?|['"]?\)$/g, '');
  const getDownloadLink = () => $('a.dl').attr('href') ? 'http:' + $('a.dl').attr('href') : '';

  return {
    title: getValue('.lv1left.dfbg strong'),
    author: getValue('.lv1left.dfbg a'),
    theme: getValue('.lv1right.dfbg a:last-child'),
    totalDownloads: getValue('.lv2right .light').replace(/\D/g, ''),
    filename: getFilenames(),
    image: getImage(),
    note: $('[style^="border-left"]').text().trim(),
    download: getDownloadLink(),
  };
}

async function getFileDetails(url) {
  const response = await fetch(url);
  const contentType = response.headers.get('content-type');
  const mimeType = mime.contentType(contentType);
  const extension = mime.extension(contentType);

  return {
    url: url,
    mimeType: await mimeType,
    fileFormat: '.' + await extension
  };
}

function formatNumber(num) {
  const suffixes = ['', 'k', 'M', 'B', 'T'];
  const numString = Math.abs(num).toString();
  const numDigits = numString.length;

  if (numDigits <= 3) {
    return numString;
  }

  const suffixIndex = Math.floor((numDigits - 1) / 3);
  let formattedNum = (num / Math.pow(1000, suffixIndex)).toFixed(1);
  
  // Menghapus desimal jika angka sudah bulat
  if (formattedNum.endsWith('.0')) {
    formattedNum = formattedNum.slice(0, -2);
  }

  return formattedNum + suffixes[suffixIndex];
}
