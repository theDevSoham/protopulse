import express from "express"
import alertsRoute from "./alerts.js"

const router = express.Router();

router.use("/alerts", alertsRoute);

export default router;