import Joi from "joi";

const getNotesSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20),
});

const noteSchema = Joi.object({
  title: Joi.string().trim().min(1).max(100).required().messages({
    "string.empty": '"title" cannot be empty',
    "any.required": '"title" is required',
  }),
  content: Joi.string().trim().required().messages({
    "string.empty": '"content" cannot be empty',
    "any.required": '"content" is required',
  }),
  tags: Joi.array().items(Joi.string().trim()).optional().default([]),
});

const editNoteSchema = Joi.object({
  title: Joi.string().trim().min(1).max(100).optional(),
  content: Joi.string().trim().min(1).optional(),
  tags: Joi.array().items(Joi.string().trim()).optional(),
  isPinned: Joi.boolean().optional(),
})
  .min(1)
  .messages({
    "object.min":
      "You must provide at least one field to update (title, content, tags, or isPinned)",
  });

export { getNotesSchema, noteSchema, editNoteSchema };
