import Joi from 'joi';

export const createUser = {
    body: Joi.object().keys({
        name: Joi.string().allow(null, ''),
        email: Joi.string().email().allow(null, ''),
        img_url: Joi.string().uri().allow(null, ''),
        active: Joi.boolean(),
        is_experienced: Joi.boolean(),
        college_name: Joi.string().allow(null, ''),
        cgpa: Joi.string().allow(null, ''),
        company_name: Joi.string().allow(null, ''),
        years_of_experience: Joi.number().integer().allow(null),
        resume_link: Joi.string().uri().allow(null, ''),
        segment: Joi.string().allow(null, ''),
        companies: Joi.array().items(Joi.string()),
        clerkId: Joi.string().allow(null, ''),
        promo_code: Joi.string().allow(null, ''),
    }).min(0),
};

export const getUser = {
    params: Joi.object().keys({
        id: Joi.string().uuid().required(),
    }),
};

export const updateUser = {
    params: Joi.object().keys({
        id: Joi.string().uuid().required(),
    }),
    body: Joi.object().keys({
        name: Joi.string(),
        email: Joi.string().email(),
        img_url: Joi.string().uri().allow(null, ''),
        active: Joi.boolean(),
        is_experienced: Joi.boolean(),
        college_name: Joi.string().allow(null, ''),
        cgpa: Joi.string().allow(null, ''),
        company_name: Joi.string().allow(null, ''),
        years_of_experience: Joi.number().allow(null),
        experience_level: Joi.string().valid(
            'INTERNSHIP',
            'FRESHER_OR_LESS_THAN_1_YEAR',
            'ONE_TO_THREE_YEARS'
        ).allow(null, ''),
        resume_link: Joi.string().uri().allow(null, ''),
        segment: Joi.string().allow(null, ''),
        companies: Joi.array().items(Joi.string().uuid()),
        promo_code: Joi.string().allow(null, ''),
    }).min(1),
};

export const updateProfile = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        is_experienced: Joi.boolean().required(),
        college_name: Joi.string().when('is_experienced', {
            is: false,
            then: Joi.required(),
            otherwise: Joi.optional().allow(null, '')
        }),
        cgpa: Joi.string().when('is_experienced', {
            is: false,
            then: Joi.required(),
            otherwise: Joi.optional().allow(null, '')
        }),
        company_name: Joi.string().when('is_experienced', {
            is: true,
            then: Joi.required(),
            otherwise: Joi.optional().allow(null, '')
        }),
        years_of_experience: Joi.number().when('is_experienced', {
            is: true,
            then: Joi.required(),
            otherwise: Joi.optional().allow(null, '')
        }),
        experience_level: Joi.string().valid(
            'INTERNSHIP',
            'FRESHER_OR_LESS_THAN_1_YEAR',
            'ONE_TO_THREE_YEARS'
        ).required(),
        resume_link: Joi.string().uri().optional().allow(null, ''),
        followedCompanies: Joi.array().items(Joi.string().uuid()).optional()
    })
};

export const deleteUser = {
    params: Joi.object().keys({
        id: Joi.string().uuid().required(),
    }),
};
