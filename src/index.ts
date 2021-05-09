import { createServer } from "http";
import app from './app';

app.set("port", 5069)
const server = createServer(app);

server.listen(app.get("port"), () => console.log(`listening on port ${app.get("port")}`));

