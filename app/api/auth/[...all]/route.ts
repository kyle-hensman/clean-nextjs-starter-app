import { auth } from '@/src/infrastructure/services/authentication.service';
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth);
