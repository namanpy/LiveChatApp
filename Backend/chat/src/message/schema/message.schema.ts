import {  Schema, Prop, SchemaFactory, } from "@nestjs/mongoose";

@Schema( { timestamps : true } )
export class Message {

    @Prop({ required : true })
    body : string;
    
    @Prop({ required : true })
    byUser: string;

    @Prop({ required : true })
    room : string;

}

export const MessageSchema = SchemaFactory.createForClass(Message);