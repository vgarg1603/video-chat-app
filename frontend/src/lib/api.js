import { axiosInstance } from "./axios";

export const signup = async (signupData) => {
    const response = await axiosInstance.post("/auth/signup", signupData);
    return response.data;
}

export const login = async (loginData) => {
    const res  = await axiosInstance.post("/auth/login", loginData);
    return res.data;
}

export const logout = async() => {
    const res = await axiosInstance.post("/auth/logout");
    return res.data;
}

export const getAuthUser = async () => {
    try {
        const res = await axiosInstance.get('/auth/me');
    return res.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const completeOnboarding = async (onboardData) => {
    const res = await axiosInstance.post("/auth/onboarding", onboardData);
    return res.data;
}

export const getFriends = async () => {
    const res = await axiosInstance.get("/user/friends");
    return res.data
}

export const getRecommendedFriends = async () => {
    const res = await axiosInstance.get('/user');
    return res.data;
}

export const getOutgoingRequest = async() => {
    const res = await axiosInstance.get("/user/outgoing-friend-requests");
    return res.data;
}

export const sendRequest = async (userId) => {
    const res = await axiosInstance.post(`/user/friend-request/${userId}`);
    return res.data;
}

export const getFriendRequests = async () => {
    const res = await axiosInstance.get(`/user/friend-requests`);
    return res.data;
}

export const acceptRequest = async(userId) => {
    const res = await axiosInstance.put(`/user/friend-request/${userId}/accept`);
    return res.data;
}

export async function getStreamToken() {
    const res = await axiosInstance.get('/chat/token');
    return res.data;
}