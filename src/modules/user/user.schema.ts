import {celebrate, Joi } from 'celebrate';
import { RequestHandler } from 'express';

class UserSchema {

    public verifyCreateBody() : RequestHandler {
        return celebrate({
            body: Joi.object().keys({

                name: Joi.string()
                         .required(),

                email: Joi.string()
                          .email()
                          .required(),

                password: Joi.string()
                             .min(8)
                             .regex(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/)
                             .required()
                             .error(new Error("Password invalid: must contain at least 8 characters, at least one uppercase letter (A-Z), one lowercase letter (a-z) and one number (1-9).")),
            })
        }, {
            abortEarly: false
        });
    }

    public verifyParamsId() : RequestHandler {
        return celebrate({
            params: Joi.object().keys({
                id: Joi.number().min(1)
            })
        });
    }

    public verifyIdParamsAndUpdateBody() : RequestHandler {
        return celebrate({
            params: Joi.object().keys({
                id: Joi.number().min(1)
            }),
            body: Joi.object().keys({

                name: Joi.string(),

                email: Joi.string()
                          .email(),

                password: Joi.string()
                             .min(8)
                             .regex(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/)
                             .error(new Error("Password invalid: must contain at least 8 characters, at least one uppercase letter (A-Z), one lowercase letter (a-z) and one number (1-9).")),
            })
        }, {
            abortEarly: false
        });
    }
}

export default UserSchema;