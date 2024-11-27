import { resolveSrv } from "dns";
import { promisify } from "util";

const resolveSrvPromise = promisify(resolveSrv);

const record = await resolveSrvPromise("localhost");

