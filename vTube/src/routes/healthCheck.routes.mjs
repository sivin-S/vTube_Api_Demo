import { Router } from "express";
import {healthCheck} from '../controllers/healthCheck.controllers.mjs'


const router = Router();

// router.get('/',healthCheck) // common way 

router.route('/').get(healthCheck) // for chaining like 
                //  .post(healthCheck)
                //  .patch(healthCheck)
                //  .put(healthCheck)
                //  .delete(healthCheck)


export default router
