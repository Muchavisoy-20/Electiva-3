const Snippet = require('../models/Snippet');
const asyncHandler = require('../middleware/asyncHandler');

// Crear
exports.createSnippet = asyncHandler(async (req, res) => {
  const snippet = await Snippet.create({
    ...req.body,
    user: req.user._id
  });

  res.status(201).json(snippet);
});

// Listar solo del usuario
exports.getSnippets = asyncHandler(async (req, res) => {
  const snippets = await Snippet.find({ user: req.user._id });
  res.json(snippets);
});

exports.getSnippetById = asyncHandler(async (req, res) => {
  const snippet = await Snippet.findOne({
    _id: req.params.id,
    user: req.user._id
  });

  if (!snippet) {
    res.status(404);
    throw new Error('Snippet no encontrado');
  }

  res.json(snippet);
});

// Editar
exports.updateSnippet = asyncHandler(async (req, res) => {
  const snippet = await Snippet.findOne({
    _id: req.params.id,
    user: req.user._id
  });

  if (!snippet) {
    res.status(404);
    throw new Error('Snippet no encontrado');
  }

  Object.assign(snippet, req.body);
  await snippet.save();

  res.json(snippet);
});

// Eliminar
exports.deleteSnippet = asyncHandler(async (req, res) => {
  const snippet = await Snippet.findOne({
    _id: req.params.id,
    user: req.user._id
  });

  if (!snippet) {
    res.status(404);
    throw new Error('Snippet no encontrado');
  }

  await snippet.deleteOne();

  res.json({ message: 'Snippet eliminado' });
});