import connectToDatabase from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Event from "@/database/event.model";
import { v2 as cloudinary } from 'cloudinary';

export async function POST(req : NextRequest) {
    try{
        // Configure cloudinary using CLOUDINARY_URL
        if (process.env.CLOUDINARY_URL) {
            cloudinary.config(true);
        }

        await connectToDatabase();
        const formData= await req.formData();

        // Build event object manually, excluding tags and agenda (they need special handling)
        const event: Record<string, unknown> = {};
        for (const [key, value] of formData.entries()) {
            if (key !== 'tags' && key !== 'agenda' && key !== 'image') {
                event[key] = value;
            }
        }

        const file = formData.get('image');

        if(!file){
            return NextResponse.json({message:'Image file is required'},{status:400});
        }

        const tagsString = formData.get('tags');
        const agendaString = formData.get('agenda');

        if (!tagsString || !agendaString) {
            return NextResponse.json({message: 'Tags and agenda are required'}, {status: 400});
        }

        let tags;
        let agenda;
        
        try {
            tags = JSON.parse(tagsString as string);
            agenda = JSON.parse(agendaString as string);
        } catch (e) {
            return NextResponse.json({message: 'Invalid tags or agenda format'}, {status: 400});
        }

        let imageUrl: string;

        // Check if file is an actual File object or a string (URL/base64)
        if (file instanceof File) {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const uploadResult = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({resource_type: 'image', folder: 'events'}, (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }).end(buffer);
            });
            imageUrl = (uploadResult as {secure_url: string}).secure_url;
        } else if (typeof file === 'string' && file.length > 0) {
            // If it's a string (URL or base64), upload it directly to cloudinary
            const uploadResult = await cloudinary.uploader.upload(file, {
                resource_type: 'image',
                folder: 'events'
            });
            imageUrl = uploadResult.secure_url;
        } else {
            return NextResponse.json({message: 'Invalid image format'}, {status: 400});
        }

        event.image = imageUrl;

        const createdEvent = await Event.create(
            {...event, tags : tags, agenda : agenda}
        );
        return NextResponse.json({message:'Event Created Successfully', event: createdEvent}, {status:201});
    }
    
    catch(e){
        console.log(e);
        return NextResponse.json({message:'Event Creation Failed',error: e instanceof Error ? e.message : 'Unknown error'}, {status:500});
    }
}

export async function GET(){
    try{
        await connectToDatabase();
        const events = await Event.find().sort({createdAt:-1});
        return NextResponse.json({message:'Events fetched successfully', events}, {status:200});
    }
    catch(e){
        return NextResponse.json({message:'Failed to fetch events',error: e instanceof Error ? e.message:' Unknown error'},{status:500});
    }
}
