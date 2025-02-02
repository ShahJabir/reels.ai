import mongoose, { model, models, Schema } from "mongoose";

export const VIDEO_DIMENSIONS = {
    width: 1080,
    height: 1920,
} as const

export interface VideoTypes {
    _id?: mongoose.Types.ObjectId;
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    controls?: boolean;
    transformation?: {
        height: number
        width: number
        quality?: number
    }
}

const videoSchema = new Schema<VideoTypes>({
    title: {type: String, required: true},
    description: {type: String, required: true},
    thumbnailUrl: {type: String, required: true},
    controls: {type: Boolean, required: true},
    transformation:{
        height: {type: Number, required: VIDEO_DIMENSIONS.height},
        width: {type: Number, required: VIDEO_DIMENSIONS.width},
        quality: {type: Number, min: 1, max: 100}
    }
},{timestamps: true})

const Video = models?.User || model<VideoTypes>("Video", videoSchema)

export default Video
