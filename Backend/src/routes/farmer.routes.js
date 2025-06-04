import {Router} from "express"
import { addNewListing, deleteListing, viewListings } from "../controllers/listings.controller.js"
import { getcontract, viewContracts } from "../controllers/contract.controller.js"
import { agreeBid, FviewBids, negotiateBid, rejectBid } from "../controllers/bid.controller.js"
import { fagree, fmes, getChats, reject } from "../controllers/chat.controller.js"
import auth from "../middleware/auth.middleware.js"

const router = Router()

// /fdashboard
router.route("/listings/addnew").post(auth, addNewListing)                    // add new listing into the marketplace
router.route("/listings/view").post(auth, viewListings)                       // view all the listings done by farmer
router.route("/listings/view/delete").post(auth, deleteListing)               // delete a listing
router.route("/contracts").post(auth, viewContracts)                          // view all the contracts of a farmer
router.route("/contracts/view").post(auth, getcontract)                       // view a particular contract
router.route("/listings/view/bids").post(auth, FviewBids)                     // view bids raised for particular crops
router.route("/listings/view/bids/reject").post(auth, rejectBid)              // reject a bid 
router.route("/listings/view/bids/negotiate").post(auth, negotiateBid)        // bid accepted and start negotiation
router.route("/listings/view/bids/agree").post(auth, agreeBid)                // taking buyer's agreement to contract
router.route("/chats").post(auth, getChats)                                   // view chat history
router.route("/chats/sendmes").put(auth, fmes)                                // send a message
router.route("/chats/agree").post(auth, fagree)                               // taking farmer's agreement to contract
router.route("/chats/reject").put(auth, reject)                               // reject


export default router