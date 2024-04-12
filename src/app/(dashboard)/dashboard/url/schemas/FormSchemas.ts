import {z} from "zod";

export const urlSchema = z.object({
    url: z.string().url(),
    group: z.string().optional(),
})

export const groupSchema = z.object({
    group: z.string().min(1)
})