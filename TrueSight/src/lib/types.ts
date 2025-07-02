import { z } from "zod";


export const uploadVideoSchema = z.object({
    video: z.instanceof(File).optional(),
    url: z.string().optional(),
}).refine((data) => {
    // Only one of video or url should be provided (not both)
    const hasVideo = data.video instanceof File && data.video.size > 0;
    const hasUrl = data.url && data.url.trim() !== "";
    return hasVideo !== hasUrl;
}, {    message: "Either video file or URL must be provided, but not both.",
        path: ["video", "url"]
})

export type TuploadVideoSchema = z.infer<typeof uploadVideoSchema>;