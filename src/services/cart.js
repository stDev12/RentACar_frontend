import { axiosClient } from "../api/axiosClient.js"

const getCartByUser = async (userId) => {
    try {
        const response = await axiosClient.get(`Cart?userId=${userId}`)
        return response.data
    } catch (error) {
        throw error
    }
}

const addItemToCart = async (item) => {
    try {
        const response = await axiosClient.post('Cart', item)
        return response.data
    } catch (error) {
        throw error
    }
}

const updateQuantity = async (item) => {
    try {
        const response = await axiosClient.put('Cart', item)
        return response.data
    } catch (error) {
        throw error
    }
}

const removeItemFromCart = async (id) => {
    try {
        const response = await axiosClient.delete(`Cart/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}

export { getCartByUser, addItemToCart, updateQuantity, removeItemFromCart }