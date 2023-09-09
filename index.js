const net = require('node:net');
let clients = 0;

// Create a TCP server
const server = net.createServer((socket) => {
    // Client connect
    clients = clients + 1;

    console.log(`\x1b[32m ${socket.remoteAddress}:${socket.remotePort} \x1b[0m`, '|', `\x1b[90m Active: ${clients} \x1b[0m`);

    // Client Prompt
    socket.write(`\x1b[33m Welcome to TCP server! \x1b[0m\n`);

    // Listen for data from client
    socket.on('data', (data) => {
        console.log(`${socket.remoteAddress}:${socket.remotePort}> ${data}`);
    });

    // Listen for the client to disconnect
    socket.on('end', () => {
        // Client disconnect
        clients = clients - 1;
        console.log(`\x1b[31m ${socket.remoteAddress}:${socket.remotePort} \x1b[0m`, '|', `\x1b[90m Active: ${clients} \x1b[0m`);
    });

    // Handle socket errors
    socket.on('error', (err) => {
        console.error(`Socket error: ${err.message}`);
    });
});

// Listen on port (first argument) passed or default to 2000
const PORT = process.argv[2] || 2000;
server.listen({port: PORT}, () => {
  console.log(`\x1b[34m You are now listening on PORT:${PORT} ! \x1b[0m`);
});
