import app from "./App"
import { ChallengeRoutes } from "./routes";

app.use("/", ChallengeRoutes);

console.log("Challenge was started in port: 7000 ⚡");

app.listen(7000);
