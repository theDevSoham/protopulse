import axios from "axios";
import constants from "../constants.js";
import { config } from "dotenv";

config();

const OTX_API_URL = constants.otx.OTX_API_URL;
const subscrbed_pulses = constants.otx.pulses.subscribed;
const API_KEY = process.env.OTX_API_KEY;

export async function fetchOTXPulses(page = 1) {
	const url = `${OTX_API_URL}/${subscrbed_pulses}?page=${page}`
	const headers = { 'X-OTX-API-KEY': API_KEY };

	try {
		const { data } = await axios.get(url, {
			headers,
		});

		return data;
	} catch (error) {
		throw error
	}
}

export function normalizeOTXData(data) {
	return data.results?.map(item => {

		const evidences = item.indicators?.map(indicator => {

			const indicator_field = String(indicator.indicator)

			switch (indicator.type) {
				case "domain":

					return {
						url_evidence: {
							url: indicator.indicator,
							domain: indicator.indicator,
							category: indicator.type,
						}
					}

				case "hostname":
					return {
						url_evidence: {
							url: indicator.indicator,
							domain: indicator_field.split('.').slice(-2).join('.'),
							category: indicator.type,
						}
					}

				default:
					return {
						hash_evidence: {
							hash: indicator.indicator,
							hash_type: indicator.type,
						}
					}
			}
		})

		return {
			source: item.author_name,
			pulse_id: item.id,
			title: item.name,
			tags: item.tags,
			creation_time: item.created,
			evidences,
		}
	})
}