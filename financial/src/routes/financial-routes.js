import { Router } from 'express';
import FinancialController from '../controllers/financialController';
import validateFinancial from '../schemas/financialSchema';
import auth from '../middleware/auth';

const financialCtrl = new FinancialController();

const router = Router();

router.get('/', auth, financialCtrl.listFinancial);
router.get('/:id', auth, financialCtrl.listByIdFinancial);
router.post('/', auth, validateFinancial, financialCtrl.createFinancial);
router.put('/:id', auth, validateFinancial, financialCtrl.updateFinancial);
router.delete('/:id', auth, financialCtrl.deleteFinancial);

export default router;
