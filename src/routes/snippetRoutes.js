const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
  createSnippet,
  getSnippets,
  updateSnippet,
  deleteSnippet,
  getSnippetById,
} = require('../controllers/snippetController');

router.use(protect);

router.route('/')
  .post(createSnippet)
  .get(getSnippets);

router.route('/:id')
  .get(getSnippetById)
  .put(updateSnippet)
  .delete(deleteSnippet);

module.exports = router;