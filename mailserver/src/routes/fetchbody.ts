const express = require("express");
const router = express.Router();

router.post("/", async (req: any, res: any) => {
	const { email, password, server, serverType, port, encryption, x } = req.body;
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
				openInbox(function (err: any, box: any) {
					// if (err) throw err;

					var f = imap.seq.fetch(x, {
						bodies: "",
					});
					var data: any = [];
					f.on("message", function (msg: any, seqno: any) {
						msg.on("body", function (stream: any, info: any) {
							// use a specialized mail parsing library (https://github.com/andris9/mailparser)
							simpleParser(stream, (err: any, mail: any) => {
								data[0] = seqno;
								if (mail.subject) {
									data[1] = mail.subject;
								} else {
									data[1] = "No Subject";
								}
								data[2] = mail.from.text;
								data[3] = mail.to.text;
								if (mail.date) {
									data[4] = mail.date;
								} else {
									data[4] = "9999-11-30T07:30:55.000Z";
								}
								data[5] = mail.html;

								console.log(data[0]);
							});
						});
					});
					f.once("error", function (err: any) {
						console.log("Fetch error: " + err);
						const error = err;
						res.status(420).json(error);
					});
					f.once("end", function () {
						setTimeout(() => {
							res.status(200).json(data);
						}, 100);
						imap.end();
						console.log("Done fetching messages!");
					});
				});
			});
			imap.once("error", function (err: any) {
				console.log(err);
				imap.end();
			});
			//we log that the connection is closed once it is so.
			imap.once("end", function () {
				console.log("Connection ended");
			});
			//we start Imap connection
			imap.connect();
		} catch (error) {
			const reply = ["error"];
			res.status(500).json(reply);
		}
	} else {
		console.log("yess1");
		var Client = require("node-poplib-gowhich").Client;
		var client = new Client({
			hostname: server,
			port: port,
			tls: tlsValue,
			mailparser: true,
			username: email,
			password: password,
		});
		console.log("yess2");

		try {
			client.connect(function () {
				console.log("yess");
				var allData: any = [];
				client.connect(function () {
					client.retrieveAll(function (err: any, messages: any) {
						messages.forEach(function (message: any) {
							const data: any = [];
							data[0] = message.messageId;
							data[1] = message.subject;
							data[2] = message.headers.from;
							data[3] = message.to[0].address;
							data[4] = message.date;
							data[5] = message.html;
							client.quit();
							allData = [data, ...allData];
						});
						res.status(200).json(allData);
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

//This file recieves the posted data from the request body and checks whether the protocol(server type) is IMAP or POP3.
//Then, directs the user data to the appropriate function as there are two functions used here for the two
//protocols owing to different their npm packages employed.
//The functions initailize the server connection, read and parse each message and push the messages to the allData
//array that is then returned to the request endpoint in json format. Finally close the connection or throw error
//in such case.
