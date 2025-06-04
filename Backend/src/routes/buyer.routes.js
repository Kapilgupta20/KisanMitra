import {Router} from "express"
import { viewmarket } from "../controllers/marketplace.controller.js"
import { getcontract, viewContracts } from "../controllers/contract.controller.js"
import { BviewBids, raisebid } from "../controllers/bid.controller.js"
import { bagree, bmes, getChats, reject } from "../controllers/chat.controller.js"
import auth from "../middleware/auth.middleware.js"
import { addfav, deleteafav, viewuserfav } from "../controllers/fav.controller.js"
import { viewListingsByIds } from "../controllers/listings.controller.js"

const router = Router()

// /bdashboard
router.route("/marketplace").get(auth, viewmarket)                        // view marketplace
router.route("/marketplace/addfav").post(auth, addfav)                    // add a item to favourites
router.route("/marketplace/viewfav").post(auth, viewuserfav)              // view all the favourite items ids
router.route("/viewfavitems").post(auth, viewListingsByIds)               // get the favourite items with details
router.route("/marketplace/deletefav").post(auth, deleteafav)             // delete a favourite item
router.route("/contracts").post(auth, viewContracts)                      // view all the contracts of buyer
router.route("/contracts/view").post(auth, getcontract)                   // view a particular contract
router.route("/bids/create").post(auth, raisebid)                         // raise a bid
router.route("/bids/view").post(auth, BviewBids)                          // view all bids raised
router.route("/chats").post(auth, getChats)                               // view chat history
router.route("/chats/sendmes").put(auth, bmes)                            // send a message
router.route("/chats/agree").post(auth, bagree)                           // send buyer's agreement for contract
router.route("/chats/reject").put(auth, reject)                           // reject


export default router
