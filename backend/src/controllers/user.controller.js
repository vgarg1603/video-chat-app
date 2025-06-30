import FriendRequest from "../models/FriendRequest.js";
import User from "../models/User.js";

export async function getRecommendedUsers(req, res) {
    try {
        const currentUserId = req.user._id;
        const currentUser = req.user;

        // First, try to find users whose native language matches current user's learning language
        const languageMatchUsers = await User.find({
            $and: [
                { _id: { $ne: currentUserId } },
                { _id: { $nin: currentUser.friends } },
                { isOnboarded: true },
                { nativeLanguage: currentUser.learningLanguage }
            ]
        }).limit(10);

        // If we don't have 10 language matches, get additional random users
        let recommendedUsers = languageMatchUsers;

        if (languageMatchUsers.length < 10) {
            const remainingCount = 10 - languageMatchUsers.length;
            const additionalUsers = await User.find({
                $and: [
                    { _id: { $ne: currentUserId } },
                    { _id: { $nin: currentUser.friends } },
                    { _id: { $nin: languageMatchUsers.map(user => user._id) } },
                    { isOnboarded: true }
                ]
            }).limit(remainingCount);

            recommendedUsers = [...languageMatchUsers, ...additionalUsers];
        }

        res.status(200).json({ recommendedUsers });
    } catch (error) {
        console.log("Error in getRecommendedUsers controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getFriends(req, res) {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).select("friends").populate('friends', "fullName profilePic nativeLanguage learningLanguage");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ friends: user.friends });
    } catch (error) {
        console.log("Error in getFriends controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function sendFriendRequest(req, res) {
    try {
        const senderId = req.user._id;
        const receiverId = req.params.id;

        if (senderId === receiverId) {
            return res.status(400).json({ message: "You cannot send a friend request to yourself" });
        }

        const sender = await User.findById(senderId);
        const receiver = await User.findById(receiverId);

        if (!receiver) {
            return res.status(404).json({ message: "Receiver not found" });
        }

        // Check if the friend request already exists
        const existingRequest = await FriendRequest.findOne({
            $or: [
                { sender: senderId, receiver: receiverId },
                { sender: receiverId, receiver: senderId }
            ]
        });

        if (existingRequest) {
            return res.status(400).json({ message: "Friend request already exists" });
        }

        // Create a new friend request
        const newRequest = new FriendRequest({
            sender: senderId,
            receiver: receiverId
        });

        await newRequest.save();

        res.status(201).json({ message: "Friend request sent successfully", request: newRequest });
    } catch (error) {
        console.log("Error in sendFriendRequest controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function acceptFriendRequest(req, res) {
    try {
        const userId = req.user._id;
        const requestId = req.params.id;

        const request = await FriendRequest.findById(requestId);

        if (!request) {
            return res.status(404).json({ message: "Friend request not found" });
        }

        if (request.receiver.toString() !== userId.toString()) {
            return res.status(403).json({ message: "You are not authorized to accept this friend request" });
        }

        request.status = "accepted";
        await request.save();

        // Add each user to the other's friends list
        await User.findByIdAndUpdate(request.sender, {
            $addToSet: { friends: request.receiver }
        });

        await User.findByIdAndUpdate(request.receiver, {
            $addToSet: { friends: request.sender }
        });

        res.status(200).json({ message: "Friend request accepted", request });
    } catch (error) {
        console.log("Error in acceptFriendRequest controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getFriendRequest(req, res) {
    try {
        const incomingRequests = await FriendRequest.find({
            receiver: req.user._id,
            status: "pending"
        }).populate("sender", "fullName profilePic nativeLanguage learningLanguage");

        const outgoingRequestsAccepted = await FriendRequest.find({
            sender: req.user._id,
            status: "accepted"
        }).populate("receiver", "fullName profilePic nativeLanguage learningLanguage");

        res.status(200).json({ incomingRequests, outgoingRequestsAccepted });
    } catch (error) {
        console.log("Error in getFriendRequest controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getOutgoingFriendRequests(req, res) {
    try {
        const outgoingRequestsPending = await FriendRequest.find({
            sender: req.user._id,
            status: "pending"
        }).populate("receiver", "fullName profilePic nativeLanguage learningLanguage");

        res.status(200).json({ outgoingRequestsPending });

    } catch (error) {
        console.log("Error in getOutgoingFriendRequests controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function declineFriendRequest(req, res) {
    try {
        const userId = req.user._id;
        const requestId = req.params.id;

        const request = await FriendRequest.findById(requestId);

        if (!request) {
            return res.status(404).json({ message: "Friend request not found" });
        }

        if (request.receiver.toString() !== userId.toString()) {
            return res.status(403).json({ message: "You are not authorized to decline this friend request" });
        }

        request.status = "declined";
        await request.save();

        

        res.status(200).json({ message: "Friend request declined", request });
    } catch (error) {
        console.log("Error in declineFriendRequest controller", error);
        res.status(500).json({ message: "Internal Server Error" });

    }
}