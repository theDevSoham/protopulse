import winston from "winston"

const logger = winston.createLogger({
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: "app.log" }),
	],
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.simple(),
	)
});

export const loggerMiddleware = (req, res, next) => {
	logger.info(`${req.method} ${req.url}`);
	next();
}