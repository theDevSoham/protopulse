import express from "express";
import { config } from "dotenv";
import router from "./src/routes/index.js"
import { loggerMiddleware } from "./src/utils/logger.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import path from "path"
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

config();

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));
app.use(express.static(path.join(__dirname, "public")));


app.use(express.json());
app.use(loggerMiddleware);


app.use('/api', router);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server started on port: ${PORT}`);
})