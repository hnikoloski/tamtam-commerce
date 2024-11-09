// next.config.js
module.exports = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:5000/api/:path*', // Redirect to your backend
            },
        ];
    },
};
module.exports = {
    reactStrictMode: false,
};