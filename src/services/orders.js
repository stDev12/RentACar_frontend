import { axiosClient } from "../api/axiosClient"

const getOrdersByUser = async (userId) => {
    try {
        const response = await axiosClient.get(`Orders?userId=${userId}`)
        return response.data

    } catch (error) {
        throw error
    }
}

const createOrder = async (order) => {
    try {
        const response = await axiosClient.post('Orders', order)
        return response.data
    } catch (error) {
        throw error
    }
}

const deleteOrder = async (id) => {
    try {
        const response = await axiosClient.delete(`Orders/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}

export { getOrdersByUser, createOrder, deleteOrder }