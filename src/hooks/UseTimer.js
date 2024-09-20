import { useEffect, useState } from "react"

const UseTimer = (rate, func) => {
    const [time, setTime] = useState(rate)
    useEffect(() => {
        const timer = setInterval(() => {
            if (time > 0)
                setTime(prevTime => prevTime - 1)
            else {
                func()
            }
        }, 1000);
        return () => {
            clearInterval(timer)
        }
    }, [time])
    return (
        { setTime }
    )
}
export default UseTimer