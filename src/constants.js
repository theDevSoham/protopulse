import path from "path";
import { fileURLToPath } from "url";

export default {
	otx: {
		OTX_API_URL: "https://otx.alienvault.com/api/v1",
		pulses: {
			subscribed: "pulses/subscribed",
			subscribed_pulse_ids: "pulses/subscribed_pulse_ids",
		}
	},
	json_response: {
		"source": "OTX",
		"pulse_id": "123e4567-e89b-12d3-a456-426614174000",
		"title": "Suspicious activity detected",
		"tags": ["malware", "phishing", "C2"],
		"creation_time": "2025-06-06T13:59:50.252000",
		"evidences": [
			{
				"ip_evidence": {
					"ip_address": "192.168.1.10",
					"type": "C2 Server",
					"source": "AlienVault"
				}
			},
			{
				"url_evidence": {
					"url": "http://malicious.example.com",
					"domain": "example.com",
					"category": "phishing"
				}
			},
			{
				"hash_evidence": {
					"hash": "e99a18c428cb38d5f260853678922e03",
					"hash_type": "MD5"
				}
			},
			{
				"email_evidence": {
					"email_address": "attacker@example.com",
					"is_malicious": true
				}
			}
		]
	},
	evidence_type_mapper: {
		domain: "URLEvidence",
		hostname: "URLEvidence",
	},
	__dirname: path.dirname(fileURLToPath(import.meta.url)),
}