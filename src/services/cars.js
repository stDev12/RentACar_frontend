import { axiosClient } from "../api/axiosClient.js"

const getCars = async () => {
    try {
        const response = await axiosClient.get('Cars')
        return response.data
    } catch (error) {
        throw error
    }
}

const getCarById = async (id) => {
    try {
        const response = await axiosClient.get(`Cars/${id}`, id)
        return response.data
    } catch (error) {
        throw error
    }
}

export { getCars, getCarById }