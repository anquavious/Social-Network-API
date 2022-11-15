const router = require('express').Router();
const {
  getThoughts,
  getThoughtsById,
  createThought,
  updateThoughts,
  deleteThoughts,
  addReaction, 
  deleteReaction
} = require('../../controllers/thought-controller.js');

router.route('/').get(getThoughts).post(createThought);


router
  .route('/:Id')
  .get(getThoughtsById)
  .put(updateThoughts)
  .delete(deleteThoughts);

// /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
