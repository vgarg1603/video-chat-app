import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { acceptFriendRequest, declineFriendRequest, getFriendRequest, getFriends, getOutgoingFriendRequests, getRecommendedUsers, sendFriendRequest } from "../controllers/user.controller.js";

const router = express.Router();

router.use(protectRoute);

router.get("/", getRecommendedUsers);
router.get("/friends", getFriends);

router.post("/friend-request/:id", sendFriendRequest);
router.put('/friend-request/:id/accept', acceptFriendRequest);
router.put('/friend-request/:id/decline', declineFriendRequest);


router.get('/friend-requests', getFriendRequest);
router.get('/outgoing-friend-requests', getOutgoingFriendRequests);

export default router;