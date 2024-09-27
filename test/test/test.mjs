import { resolveSrv } from "dns";
import { promisify } from "util";
const resolveSrvPromise = promisify(resolveSrv);
const record = await resolveSrvPromise("http://localhost:5000");

console.log(record);

//# sourceMappingURL=test.js.map