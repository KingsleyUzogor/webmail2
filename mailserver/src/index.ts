const express = require("express");
const path = require("path");
const verifyRoutes = require("./routes/verify");
const fetchHeadRoutes = require("./routes/fetchhead");
const fetchBodyRoutes = require("./routes/fetchbody");

const cors = require("cors");

const app = express();
app.use(cors({ origin: true, credentials: true }));

app.use(express.json());
app.use("/", express.static(path.join(__dirname, "../../mailclient/build")));
app.use("/verify", verifyRoutes);
app.use("/fetchhead", fetchHeadRoutes);
app.use("/fetchbody", fetchBodyRoutes);

app.listen(4000, () => {
	console.log("Now listening to port 4000");
});

app.get("/", (req: any, res: any) => {
	res.send("Hi, this is the end point for a simple Webmail. Enjoy!!!");
});

//Welcome to the api endpoint of the mailclient!
//This api has as its aim to fetch the user's inbox from the server given
//the provided credentials on the frontend.
//The first use of this api is to help verify the user credentials, check that a connection to the server
//works well and that the inbox is not empty. This is seen in the routes/verify.ts file.
//The second and final work is to actually fetch the user's inbox from the server given the chosen protocol.
//The data fetched are the message ID, subject, sender, date and body as seen in the routes/fetchhead.ts file.
