// Require Thought Model
const {Thought, User} = require('../models');

// Set up Thoughts Controller
const thoughtsController = {

// create Thought
  // push the created thought's _id to the associated user's thoughts array field
  createThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(404)
            .json({ message: "Thought created but no user with this id!" });
        }

        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

    // Get all available Thoughts
    getThoughts(req,res) {
        Thought.find({})
        // .populate({path: 'reactions', select: '-__v'})
        // .select('-__v')
        // .sort({_id: -1})
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // Get a certain thought by ID
    getThoughtsById({params}, res) {
        Thought.findOne({ _id: params.Id })
        .populate({path: 'reactions',select: '-__v'})
        .select('-__v')
        .then(dbThoughtsData => {
            if(!dbThoughtsData) {
            res.status(404).json({message: 'No thoughts with this particular ID!'});
            return;
        }
        res.json(dbThoughtsData)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // Update a current thought by ID
    updateThoughts({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.Id}, body, {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-___v')
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({message: 'No thoughts with this particular ID!'});
                return;
            }
                res.json(dbThoughtsData);
        })
        .catch(err => res.json(err));
    },

    // Delete a current thought by ID
    deleteThoughts({params}, res) {
        Thought.findOneAndDelete({_id: params.Id})
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({message: 'No thoughts with this particular ID!'});
                return;
            }
            res.json(dbThoughtsData);
            })
            .catch(err => res.status(400).json(err));
    },

    // Add a new Reaction
    addReaction({params, body}, res) {
        console.log(params)
        Thought.findOneAndUpdate({_id: params.thoughtId}, {$addToSet: {reactions: body}}, {new: true})
        // .populate({path: 'reactions', select: '-__v'})
        // .select('-__v')
        .then(dbThoughtsData => {
            console.log(dbThoughtsData)
        if (!dbThoughtsData) {
            res.status(404).json({message: 'No thoughts with this particular ID!'});
            return;
        }
        res.json(dbThoughtsData);
        })
        .catch(err => res.status(400).json(err))

    },

    // Delete a reaction by ID
    deleteReaction({params}, res) {
        Thought.findOneAndUpdate({_id: params.thoughtId}, {$pull: {reactions: {reactionId: params.reactionId}}}, {new : true})
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({message: 'No thoughts with this particular ID!'});
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch(err => res.status(400).json(err));
    }

};

// Export module thought controller
module.exports = thoughtsController;