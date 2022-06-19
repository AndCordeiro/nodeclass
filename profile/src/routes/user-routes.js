import { Router } from 'express';
import UserController from '../controllers/userController';
import validateUser, {
  validateUpdateUserPassword,
} from '../schemas/userSchema';

const userCtrl = new UserController();

const router = Router();

router.post('/', validateUser, userCtrl.createUser);
router.put(
  '/changepassword/:id',
  validateUpdateUserPassword,
  userCtrl.updateUserPassword
);
router.delete('/:id', userCtrl.deleteUser);

router.post('/login', userCtrl.authenticated);

export default router;
