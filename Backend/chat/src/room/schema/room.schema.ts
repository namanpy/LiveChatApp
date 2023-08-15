import { MongooseModule , Schema, Prop, SchemaFactory, } from "@nestjs/mongoose";

@Schema()
export class Room {

    @Prop({ required : true })
    roomname : string;
    @Prop({ required : true })
    description : string;
    @Prop({ required : true })
    owner : string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);