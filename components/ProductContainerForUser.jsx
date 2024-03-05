'use client'

import { useIsSignedInStore } from 'global/IsSignedIn'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {PiHeart} from 'react-icons/pi'
import {FiPlus,FiMinus} from 'react-icons/fi'

export default function ProductContainerForUser({ productInfo: { quantity, productData, productImages } }){
    const [currentQuantity, setCurrentQuantity] = useState(quantity)
    const currentUserObject = useIsSignedInStore(state => state.currentUserObject)

    const handleIncrement = async () => {
        try {
            const response = await fetch(`http://localhost:5000/functions/update-quantity/${currentUserObject}/${productData.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    quantity: currentQuantity + 1
                })
            })
    
            if (response.ok) {
                setCurrentQuantity((prevQuantity) => prevQuantity + 1)
            } else {
                console.error('Failed to update quantity')
            }
        } catch (error) {
            console.error('Error updating quantity:', error)
        }
    }
    
    const handleDecrement = async () => {
        if (currentQuantity > 0) {
            try {
                const response = await fetch(`http://localhost:5000/functions/update-quantity/${currentUserObject}/${productData.id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        quantity: currentQuantity - 1
                    })
                })
    
                if (response.ok) {
                    setCurrentQuantity((prevQuantity) => prevQuantity - 1)
                } else {
                    console.error('Failed to update quantity')
                }
            } catch (error) {
                console.error('Error updating quantity:', error)
            }
        }
    }    

    return(
        <div className='border rounded-[4px] flex flex-col transition border-grey-200 hover:border-fancy-700 hover:shadow-lg pb-2 h-fit'>
            <div className='relative'>
                <div className='center absolute top-0 right-0 h-8 w-8 xs:h-10 xs:w-10 z-[4]'>
                    <button className='bg-white icons-wrapper hover:text-red-500'>
                        <PiHeart className='icons'/>
                    </button>
                </div>
                <div className='relative rounded-t-[4px] h-40 xs:h-48'>
                    <Image
                        src={'http://localhost:5000/images/' + productImages[0]}
                        alt='image'
                        className='object-contain'
                        sizes='33vw'
                        fill
                    >
                    </Image>
                </div>
            </div>
            <div className='border-t flex flex-col px-2 h-fit'>
                <Link href={`/products/view/${productData.id}`} className='nav-link xs:text-base line-clamp-2 h-11'>
                    {productData.title}
                </Link>
                <div className='flex flex-col xs:flex-row xs:items-center h-auto'>
                    <p className='flex-row-center justify-end text-red-700 italic line-through text-xs sm:text-base h-4 sm:h-10 flex-[45%]'>20 man.</p>
                    <p className='flex-row-center justify-end text-fancy-700 text-lg font-bold h-6 sm:h-10 flex-[55%]'>{productData.sell_price} man.</p>
                </div>
                <div className='border rounded-[4px] flex-row-center justify-between gap-2 transition hover:border-fancy-700 hover:bg-grey-50 px-4 h-8 xs:h-10'>
                    <button
                        onClick={handleDecrement}
                        className='rounded-full center transition hover:bg-fancy-400 h-6 w-6 xs:h-8 xs:w-8'
                    >
                        <FiMinus className='icons' />
                    </button>
                    <p>{quantity}</p>
                    <button
                        onClick={handleIncrement}
                        className='rounded-full center transition hover:bg-fancy-400 h-6 w-6 xs:h-8 xs:w-8'
                    >
                        <FiPlus className='icons' />
                    </button>
                </div>
            </div>
        </div>
    )
}