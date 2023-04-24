const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
} = require('../../controllers/userController');

// Gets all users, creates user
// /api/users
router.route('/').get(getUsers).post(createUser);

// Gets single user, deletes
// /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);


module.exports = router;