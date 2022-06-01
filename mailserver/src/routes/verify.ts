const express = require("express");
const router = express.Router();

router.post("/", async (req: any, res: any) => {
	const { email, password, server, serverType, port, encryption } = req.body;
	var tlsValue: string;
	var autotlsValue: string;
	if (encryption === "ssl/tls") {
		tlsValue = "true";
		autotlsValue = "never";
	} else if (encryption === "starttls") {
		tlsValue = "false";
		autotlsValue = "always";
	} else {
		tlsValue = "false";
		autotlsValue = "never";
	}

	if (serverType === "imap") {
		var Imap = require("imap");
		const simpleParser = require("mailparser").simpleParser;
		var imap = new Imap({
			user: email,
			password: password,
			host: server,
			port: port,
			tls: tlsValue,
			autotls: autotlsValue,
			tlsOptions: { servername: server },
		});
		try {
			function openInbox(cb: any) {
				imap.openBox("INBOX", true, cb);
			}

			imap.once("ready", function () {
				openInbox(async function (err: any, box: any) {
					// if (err) throw err;
					if (err) {
						const reply = ["error"];
						res.status(500).json(reply);
						imap.end();
					}
					console.log(box.messages.total + " message(s) found!");
					const data = { ok: true, total: box.messages.total };
					res.status(200).json(data);
					imap.end();
				});
			});
			imap.once("error", function (err: any) {
				const reply = ["error"];
				res.status(500).json(reply);
				console.log(err);
			});
			//we log that the connection is closed once it is so.
			imap.once("end", function () {
				console.log("Connection ended");
			});
			//we start Imap connection
			await imap.connect();
		} catch (error) {
			const reply = ["error"];
			res.status(500).json(reply);
		}
	} else {
		var Client = require("node-poplib-gowhich").Client;

		try {
			var client = new Client({
				hostname: server,
				port: port,
				tls: tlsValue,
				mailparser: true,
				username: email,
				password: password,
			});
			client.connect(function () {
				var allData: any = [];
				client.connect(function () {
					client.count(function (err: any, count: any) {
						if (err) {
							const reply = ["error"];
							res.status(500).json(reply);
						}
						console.log(count);
						const data = { ok: true, total: count };
						res.status(200).json(data);
						client.quit();
					});
				});
			});
		} catch (error) {
			const reply = ["error"];
			res.status(500).json(reply);
		}
	}
});

module.exports = router;
export default router;

//This file works exactly as the fetchhead.ts file. The only difference is in the data it returns.
//Here, it is verified that the user's data is valid, connection to the server is successful and the user's inbox is
//not empty (which is returned in the total messages found for the frontend's logic). The frontend displays error to
//the user otherwise.
