import { axiosClient } from "../api/axiosClient"

const getExtras = async () => {
    try {
        const response = await axiosClient.get('Extras')
        return response.data
    } catch (error) {
        throw error
    }
}

const ToggleExtraInCartItem = async (extraId, cartItemId) => {
    try {
        const response = await axiosClient.put(`Extras/${extraId}`, cartItemId)
        return response.data
    } catch (error) {
        throw error
    }
}

export { getExtras, ToggleExtraInCartItem }