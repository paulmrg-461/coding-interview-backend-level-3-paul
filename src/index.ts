import { initializeServer, startServer } from "./server.js";

process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});

await startServer();
