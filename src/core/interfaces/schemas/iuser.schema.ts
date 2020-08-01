import { RequestHandler } from "express";

interface IUserSchema {

    verifyCreateBody() : RequestHandler;

    verifyParamsId() : RequestHandler;

    verifyIdParamsAndUpdateBody() : RequestHandler;

}

export default IUserSchema;