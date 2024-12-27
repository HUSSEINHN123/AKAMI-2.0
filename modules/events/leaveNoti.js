module.exports.config = {
	name: "leave",
	eventType: ["log:unsubscribe"],
	version: "1.1.0",
	credits: "S H A D O W",
	description: "Notify bots or leavers with profile picture",
	dependencies: {
		"fs-extra": "",
		"path": "",
		"axios": ""
	}
};

module.exports.run = async function ({ api, event, Users, Threads }) {
	if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
	const { createReadStream, existsSync, mkdirSync, writeFileSync, unlinkSync } = global.nodemodule["fs-extra"];
	const { join } = global.nodemodule["path"];
	const axios = global.nodemodule["axios"];
	const { threadID } = event;

	const data = global.data.threadData.get(parseInt(threadID)) || (await Threads.getData(threadID)).data;
	const userID = event.logMessageData.leftParticipantFbId;
	const name = global.data.userName.get(userID) || await Users.getNameUser(userID);
	const type = (event.author == userID) ? "خرج بكرامته 🤧🖤" : "اترمي برا زي الكلب 🤭💞";

	// Path setup
	const avatarPath = join(__dirname, "cache", `avatar_${userID}.png`);

	try {
		// Fetch user profile picture using the new API
		const avatarData = (await axios.get(`https://api-canvass.vercel.app/profile?uid=${userID}`, { responseType: "arraybuffer" })).data;
		writeFileSync(avatarPath, Buffer.from(avatarData, "utf-8"));

		// Construct the leave message
		let msg = (typeof data.customLeave == "undefined")
			? "الاسم : {name}\nالسبب: {type}."
			: data.customLeave;

		msg = msg.replace(/\{name}/g, name).replace(/\{type}/g, type);

		// Send message with profile picture
		return api.sendMessage({
			body: msg,
			attachment: createReadStream(avatarPath)
		}, threadID, () => {
			// Delete the temporary avatar file
			unlinkSync(avatarPath);
		});
	} catch (error) {
		console.error(error);
		return api.sendMessage(`حدث خطأ أثناء محاولة إرسال رسالة المغادرة لـ ${name}.`, threadID);
	}
};
