// middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
    // Ambil status code, default 500 (Internal Server Error)
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; 
    
    res.status(statusCode);
    
    // Kirim respons JSON
    res.json({
        message: err.message,
        // Di lingkungan produksi, kita tidak menampilkan stack trace
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = errorHandler;