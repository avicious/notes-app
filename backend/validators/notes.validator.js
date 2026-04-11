import Joi from "joi";

// Get All Notes
const getNotesSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20),
});

// Add Note
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

// Edit Note
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

// Delete Note
const deleteNoteSchema = Joi.object({
  noteId: Joi.string().hex().length(24).required().messages({
    "string.hex": "Invalid Note ID format",
    "string.length": "Invalid Note ID format",
  }),
});

// Search Notes
const searchNoteSchema = Joi.object({
  query: Joi.string().max(100).trim().messages({
    "string.base": '"query" should be a type of text',
    "string.max": '"query" should have a maximum length of {#limit}',
  }),

  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
});

export {
  getNotesSchema,
  noteSchema,
  editNoteSchema,
  deleteNoteSchema,
  searchNoteSchema,
};
