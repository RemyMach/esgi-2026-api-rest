import express from "express"
import { initHandlers } from "./handlers/routes.js";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json())

initHandlers(app);

app.listen(PORT, () => {
    console.log("App is listening on port " + PORT)
})
