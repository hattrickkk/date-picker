import React from 'react'

type Props = {
    isNext?: boolean
}

function Arrow({ isNext = false }: Props) {
    return isNext ? (
        <svg width='16' height='17' viewBox='0 0 16 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M4.27334 4.5L3.33334 5.44L6.38667 8.5L3.33334 11.56L4.27334 12.5L8.27334 8.5L4.27334 4.5Z'
                fill='black'
            />
            <path
                d='M8.66667 4.5L7.72667 5.44L10.78 8.5L7.72667 11.56L8.66667 12.5L12.6667 8.5L8.66667 4.5Z'
                fill='black'
            />
        </svg>
    ) : (
        <svg width='16' height='17' viewBox='0 0 16 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M11.7267 12.5L12.6667 11.56L9.61332 8.5L12.6667 5.44L11.7267 4.5L7.72666 8.5L11.7267 12.5Z'
                fill='black'
            />
            <path
                d='M7.33332 12.5L8.27332 11.56L5.21998 8.5L8.27331 5.44L7.33331 4.5L3.33332 8.5L7.33332 12.5Z'
                fill='black'
            />
        </svg>
    )
}
export default React.memo(Arrow)
