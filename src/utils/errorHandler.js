export const errorHandler = (err, req, res, next) => {
	console.error('Server side error: ', err);
	res.status(500).json({ error: err.message });
}