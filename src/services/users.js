import axiosClient from "../api/axiosClient.js"

const loginApi = async (userLogin) => {
    try {
        const response = await axiosClient.post('Auth/login', userLogin)
        return response.data
    } catch (error) {
        throw error
    }
}

const createUser = async (user) => {
    try {
        const response = await axiosClient.post('Auth/signUp', user)
        return response.data
    } catch (error) {
        throw error
    }
}

const addUser = async (user) => {
    try {
        const response = await axiosClient.post('Users', user);
        return response.data
    } catch (error) {
        console.log(error.massage)
    }
}

const updateUser = async (user) => {
    try {
        const result = await axiosClient.put(`Users`, user);
        return result.data
    } catch (error) {
        throw error;
    }
}

export { loginApi, createUser, addUser, updateUser } 