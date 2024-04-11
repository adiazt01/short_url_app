import {z} from "zod";

export const urlSchema = z.object({
    url: z.string().url(),
    shortUrl: z.string().url(),
})