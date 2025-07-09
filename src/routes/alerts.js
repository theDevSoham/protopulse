import express from "express";
import { createBufferFromNormalizedData, fetchOTXPulses, normalizeOTXData } from "../services/otxService.js";

const router = express.Router();

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

		const buffer = createBufferFromNormalizedData(response)

		return res
			.setHeader('Content-Type', 'application/x-protobuf')
			.status(200)
			.send(buffer);
	} catch (error) {
		throw error;
	}
})

router.get('/visualizer', async (req, res) => {
	const { page } = req.query

	if (isNaN(Number(page))) {
		res.status(404).json({ error: "Bad request. Page number should be of type number" })
	}

	try {
		const data = await fetchOTXPulses(page);
		const response = normalizeOTXData(data);

		const buffer = createBufferFromNormalizedData(response)

		return res.render('data-viewer', {
			title: "JSON + Protobuf data",
			jsonData: response,
			decodedProtobuf: buffer,
		})
	} catch (error) {
		throw error;
	}
})

export default router;