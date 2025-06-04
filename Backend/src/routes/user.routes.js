import {Router} from "express"
import auth from "../middleware/auth.middleware.js"
import { iddetails, login, logout, register } from "../controllers/user.controller.js"

const router = Router()

// /user
router.route("/register").post(register)                    // register
router.route("/login").post(login)                          // login
router.route("/iddetails").post(auth, iddetails)             // get user details
router.route("/logout").post(auth, logout)                  // logout

export default router