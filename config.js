import { watchFile, unwatchFile } from 'fs'
import fs from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'

global.setting = {
 autoclear: false,
 addReply: true
 }

global.owner = [
['201020182886', '𓏺𝙰𝙷𝙼𝙴𝙳 𝙰𝙱𝙳𝙴𝙻𝙵𝙰𝚃𝚃𝙰𝙷', true],
['201286226940', '𝚂𝙽𝙸𝙿𝙴𝚁', false],
['', '', false]
]

global.info = {
 nomerbot: '201286226940',
 pairingNumber: '201286226940',
 nameown: '𓏺𝙰𝙷𝙼𝙴𝙳 𝙰𝙱𝙳𝙴𝙻𝙵𝙰𝚃𝚃𝙰𝙷',
 nomerown: '201020182886',
 packname: 'sticker by ',
 author: '𓏺𝙰𝙷𝙼𝙴𝙳 𝙰𝙱𝙳𝙴𝙻𝙵𝙰𝚃𝚃𝙰𝙷',
 namebot: '𝚂𝙽𝙸𝙿𝙴𝚁',
 wm: ''-'_꩜ 𝚂𝙽𝙸𝙿𝙴𝚁 ꩜_'-'',
 stickpack: 'Whatsapp',
 stickauth: '𓏺𝙰𝙷𝙼𝙴𝙳 𝙰𝙱𝙳𝙴𝙻𝙵𝙰𝚃𝚃𝙰𝙷'
}

// Thumbnail 
global.media = {
 profil: 'https://i.ibb.co/3Fh9V6p/avatar-contact.png',
 did: 'https://telegra.ph/file/fdc1a8b08fe63520f4339.jpg',
 rules: 'https://telegra.ph/file/afcfa712bd09f4fcf027a.jpg',
 thumbnail: 'https://www2.0zz0.com/2025/01/29/22/218411100.png',
 thumb: 'https://www2.0zz0.com/2025/01/29/22/218411100.png',
 logo: 'https://www2.0zz0.com/2025/01/29/22/218411100.png',
 unReg: 'https://telegra.ph/file/ef02d1fdd59082d05f08d.jpg',
 registrasi: 'https://telegra.ph/file/0169f000c9ddc7c3315ff.jpg',
 confess: 'https://telegra.ph/file/03cabea082a122abfa5be.jpg',
 akses: 'https://telegra.ph/file/6c7b9ffbdfb0096e1db3e.jpg', 
 wel: 'https://telegra.ph/file/9dbc9c39084df8691ebdd.mp4', // gif welcome 
 bye: 'https://telegra.ph/file/1c05b8c019fa525567d01.mp4', // gif good bye
 sound: 'https://media.vocaroo.com/mp3/1awgSZYHXP3B' // untuk menu
}

// Sosmed
global.url = {
 sig: 'https://instagram.com/_bcqf',
 sgh:  'https://youtube.com/@eg-sniper?si=3Suag9_YPaBo7O_F',
 sgc: 'https://wa.me/201020182886'
}

global.wait =` انتظر .. أنا أحاول تلبية طلبك ...`

// Info Wait
global.msg = {
 wait: '⏱️ *Please be patient*\n\> Running command from *User*!',
 eror: '🤖*Bot Information*\n\> Sorry for the inconvenience in using *𝚂𝙽𝙸𝙿𝙴𝚁 Bot*. There was an error in the system while executing the command.'
}

global.multiplier = 69
global.rpg = {
  emoticon(string) {
    string = string.toLowerCase();
      let emot = {
      agility: '🤸‍♂️',
      arc: '🏹',
      armor: '🥼',
      bank: '🏦',
      bibitanggur: '🍇',
      bibitapel: '🍎',
      bibitjeruk: '🍊',
      bibitmangga: '🥭',
      bibitpisang: '🍌',
      bow: '🏹',
      bull: '🐃',
      cat: '🐈',
      chicken: '🐓',
      common: '📦',
      cow: '🐄',
      crystal: '🔮',
      darkcrystal: '♠️',
      diamond: '💎',
      dog: '🐕',
      dragon: '🐉',
      elephant: '🐘',
      emerald: '💚',
      exp: '✉️',
      fishingrod: '🎣',
      fox: '🦊',
      gems: '🍀',
      giraffe: '🦒',
      gold: '👑',
      health: '❤️',
      horse: '🐎',
      intelligence: '🧠',
      iron: '⛓️',
      keygold: '🔑',
      keyiron: '🗝️',
      knife: '🔪',
      legendary: '🗃️',
      level: '🧬',
      limit: '🌌',
      lion: '🦁',
      magicwand: '⚕️',
      mana: '🪄',
      money: '💵',
      mythic: '🗳️',
      pet: '🎁',
      petFood: '🍖',
      pickaxe: '⛏️',
      pointxp: '📧',
      potion: '🥤',
      rock: '🪨',
      snake: '🐍',
      stamina: '⚡',
      strength: '🦹‍♀️',
      string: '🕸️',
      superior: '💼',
      sword: '⚔️',
      tiger: '🐅',
      trash: '🗑',
      uncommon: '🎁',
      upgrader: '🧰',
      wood: '🪵'
    }
    let results = Object.keys(emot).map(v => [v, new RegExp(v, 'gi')]).filter(v => v[1].test(string));
    if (!results.length) return '';
    else return emot[results[0][0]];
  }
}

// Apikey
global.api = {
 lol: 'GataDios'

}
global.APIs = {
  lol: "https://api.lolhumaan.xyz"
}

//Apikey
global.APIKeys = {
    "https://api.lolhumaan.xyz": "GataDios"
}

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'settings.js'"))
  import(`${file}?update=${Date.now()}`)
})
