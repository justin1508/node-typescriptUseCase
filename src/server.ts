import express from "express";
import swaggerUI from "swagger-ui-express";

import swaggerFile from "../swagger.json";
import { router } from "./routes";

const app = express();

app.use(express.json());

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(router);

app.listen(3333, () => console.log("Server is running on port 3333"));