import express from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  authUser,
  registerUser,
        getUserProfile,
        logoutUser,
        getUserStats
      } from '../controllers/userController.js';
      import { protect } from '../middleware/authMiddleware.js';
      
      const router = express.Router();
      
      router.post('/login', authUser);
      router.post('/register', registerUser);
      router.post('/logout', logoutUser);
      router.route('/profile').get(protect, getUserProfile);
      router.route('/profile/stats').get(protect, getUserStats);

router.route('/')
  .get(getUsers)
  .post(createUser);

router.route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

export default router;
