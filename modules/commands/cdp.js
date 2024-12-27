module.exports.config = {
  name: "تطقيم",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "S H A D O W",
  description: "صور تطقيمات",
  commandCategory: "الــتــرفــيــه والــالــعــاب",
  usages: " ",
  cooldowns: 5,
  dependencies: {
    "axios": "",
    "fs": "",
    "request": ""
  }
};

module.exports.run = async function ({ api, event }) {
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  const path = require("path");

  axios.get('https://markdevs69v2.onrender.com/api/randomgambar/couplepp').then(res => {
    const { male, female } = res.data.result;

    const maleExt = path.extname(male);
    const femaleExt = path.extname(female);

    const malePath = path.join(__dirname, `/cache/male${maleExt}`);
    const femalePath = path.join(__dirname, `/cache/female${femaleExt}`);

    const sendImages = () => {
      api.sendMessage({
        body: "تــفــضــل تــطــقــيــمــك :",
        attachment: [
          fs.createReadStream(malePath),
          fs.createReadStream(femalePath)
        ]
      }, event.threadID, () => {
        fs.unlinkSync(malePath);
        fs.unlinkSync(femalePath);
      }, event.messageID);
    };

    request(male).pipe(fs.createWriteStream(malePath)).on("close", () => {
      request(female).pipe(fs.createWriteStream(femalePath)).on("close", sendImages);
    });
  }).catch(err => {
    api.sendMessage("حدث خطأ أثناء جلب الصور. حاول مرة أخرى لاحقًا.", event.threadID, event.messageID);
  });
};
