import express from "express";
import protobuf from "protobufjs";
import path from "path";
import { fetchOTXPulses, normalizeOTXData } from "../services/otxService.js";
import { fileURLToPath } from "url";

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

let SecurityAlertList;

protobuf.load(path.resolve(__dirname, '../schema/security_alert.proto'))
	.then(root => {
		SecurityAlertList = root.lookupType("security.SecurityAlertList");
	})

router.get("/json", async (req, res) => {

	const { page } = req.query

	if (isNaN(Number(page))) {
		res.status(404).json({ error: "Bad request. Page number should be of type number" })
	}

	try {
		const data = await fetchOTXPulses(page);

		return res.status(200).json({ success: "True", data: normalizeOTXData(data) });
	} catch (error) {
		throw error;
	}
})

router.get("/proto", async (req, res) => {

	const { page } = req.query

	if (isNaN(Number(page))) {
		res.status(404).json({ error: "Bad request. Page number should be of type number" })
	}

	try {
		const data = await fetchOTXPulses(page);
		const response = normalizeOTXData(data);

		const errorMessage = SecurityAlertList.verify(response);
		if (errorMessage) {
			console.log(errorMessage)
			throw new Error(errorMessage)
		}

		const message = SecurityAlertList.create({ alerts: response });
		console.log(message)
		const buffer = SecurityAlertList.encode(message).finish();

		console.log(buffer.toString("hex"))

		return res
			.setHeader('Content-Type', 'application/x-protobuf')
			.status(200)
			.send(buffer);
	} catch (error) {
		throw error;
	}
})

export default router;