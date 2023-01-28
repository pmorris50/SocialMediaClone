const router = require('express').Router();

const {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
} = require('../../controllers/userController');
//api/user
router.route('/').get(getAllUsers).post(createUser);

// /api/user/userId

