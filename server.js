import express from "express";
import { config } from "dotenv";
import router from "./src/routes/index.js"
import { loggerMiddleware } from "./src/utils/logger.js";
import { errorHandler } from "./src/utils/errorHandler.js";

config();

const app = express();
app.use(express.json());
app.use(loggerMiddleware);


app.use('/api', router);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server started on port: ${PORT}`);
})