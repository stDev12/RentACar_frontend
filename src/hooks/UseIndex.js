import { useState } from "react"

const UseIndex = (arr, func) => {
    const [index, setIndex] = useState(0)
    const [items, setItems] = useState([arr[index], ...arr.slice(index + 1, index + 10)])
    const switchItem = () => {
        setIndex(prevIndex => {
            const newIndex = prevIndex >= arr.length - 1 ? 0 : prevIndex + 1
            const newItems = [
                arr[newIndex],
                ...arr.slice(newIndex + 1, newIndex + 10),
            ];
            setItems(newItems);
            return newIndex
        })
        func()
    }
    return (
        [items, switchItem]
    )
}
export default UseIndex
