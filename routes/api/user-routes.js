const router = require('express').Router();
const {
  getAllUsers,
  getUsersById,
  createUsers,
  deleteUsers,
  updateUsers,
  addFriend,
  removeFriend,
} = require('../../controllers/user-controller.js');

// /api/users
router.route('/').get(getAllUsers).post(createUsers);

// /api/users/:userId
router.route('/:userId').get(getUsersById).delete(deleteUsers).put(updateUsers);


router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);



module.exports = router;
