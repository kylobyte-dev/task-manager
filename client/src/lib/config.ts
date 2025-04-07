import { z } from "zod";

const Config = z.object({
  beUrl: z.string().url(),
  authUrl: z.string().url(),
  origin: z.string().url(),
});

export const config: z.infer<typeof Config> = Config.parse({
  beUrl: import.meta.env.VITE_BE_URL,
  authUrl: import.meta.env.VITE_AUTH_URL,
  origin: location.origin,
});
