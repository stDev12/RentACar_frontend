import { AddShoppingCart, Remove } from '@mui/icons-material'
import { IconButton, Table, TableBody, TableCell, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ToggleExtraInCartItem, getExtras } from '../services/extras'
import { updateExtras } from '../states/cart-slice'

const Extras = ({ cartItem }) => {
    const dispatch = useDispatch()
    const [cartId, setCartId] = useState()
    const [allExtras, setAllExtras] = useState([])
    const [extraToggles, setExtraToggles] = useState({});

    const getAllExtras = async () => {
        try {
            const extrasList = await getExtras()
            setAllExtras(extrasList)
        } catch (error) {
            alert("error ", error.message)
        }
    }

    const handleUpdateExtra = async (id) => {
        try {
            const updatedExtra = await ToggleExtraInCartItem(id, cartId)
            dispatch(updateExtras({ extra: updatedExtra, cartItemId: cartId }))
            setExtraToggles((prevToggles) => ({
                ...prevToggles,
                [id]: !prevToggles[id]
            }))
        } catch (error) {
            alert("error ", error.message)
        }
    }

    useEffect(() => {
        getAllExtras()
    }, [])

    useEffect(() => {
        setCartId(cartItem?.cartItemId)
        return () => {
            setCartId(null)
        }

    }, [cartItem])

    useEffect(() => {
        const newExtraToggles = {}
        allExtras?.forEach((extra) => {
            newExtraToggles[extra?.extraId] = cartItem?.extras?.some((e) => e.extraId === extra.extraId)
        })
        setExtraToggles(newExtraToggles)
    }, [allExtras, cartItem])

    return (

        <>
            <Table>
                <TableBody sx={{ bgcolor: '#EEEEEE' }} >
                    {allExtras.map(extra =>
                        <TableRow key={extra?.extraId}>
                            <TableCell>
                                {extraToggles[extra?.extraId] ?
                                    <>
                                        <IconButton onClick={() => handleUpdateExtra(extra?.extraId)}>
                                            <Remove />
                                        </IconButton>
                                        <IconButton disabled ><AddShoppingCart /></IconButton>
                                    </>
                                    : <>
                                        <IconButton disabled ><Remove /></IconButton>
                                        <IconButton onClick={() => handleUpdateExtra(extra?.extraId)}>
                                            <AddShoppingCart color='secondary' />
                                        </IconButton>
                                    </>}
                            </TableCell>
                            <TableCell>₪ {extra?.price}</TableCell>
                            <TableCell>{extra?.extraName}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table >
        </>
    )
}

export default Extras
