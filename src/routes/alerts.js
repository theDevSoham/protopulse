import express from "express";
import { createBufferFromNormalizedData, fetchOTXPulses, normalizeOTXData } from "../services/otxService.js";

const router = express.Router();

router.get("/json", async (req, res) => {

	const { page } = req.query

	let pageNumber = Number(page);

	if (!page || pageNumber <= 0 || isNaN(pageNumber)) {
		pageNumber = 1;
	}

	try {
		const data = await fetchOTXPulses(pageNumber);

		return res.status(200).json({ success: "True", data: normalizeOTXData(data) });
	} catch (error) {
		throw error;
	}
})

router.get("/proto", async (req, res) => {

	const { page } = req.query

	let pageNumber = Number(page);

	if (!page || pageNumber <= 0 || isNaN(pageNumber)) {
		pageNumber = 1;
	}

	try {
		const data = await fetchOTXPulses(pageNumber);
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

	let pageNumber = Number(page);

	if (!page || pageNumber <= 0 || isNaN(pageNumber)) {
		pageNumber = 1;
	}

	try {
		const data = await fetchOTXPulses(pageNumber);
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