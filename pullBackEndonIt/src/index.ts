import express from "express";
import { collections, connectToDatabase } from "./services/database.service";
import { cardsRouter } from "./routes/cards.routes";
import bodyParser from "body-parser";

const app = express();
const port = 8080; 

connectToDatabase()
    .then(() => {
        // send all calls to /api to our cardsRouter
        app.use("/api", cardsRouter);

        // start the Express server
        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });
