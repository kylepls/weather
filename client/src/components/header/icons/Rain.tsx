import React from 'react'

// https://en.wikipedia.org/wiki/Rain#Intensity
const levels: number[][] = [
    [0, 2], // light
    [0.098, 1], // moderate
    [0.39, 0.5], // heavy
    [2, 0.25], // violent
]

function getSpeed(amount: number) {
    return levels.reduce((prev, curr) => {
        return (Math.abs(curr[0] - amount) < Math.abs(prev[0] - amount) ? curr : prev)
    })[1]
}

export default function Rain({amount}: any) {
    const publicUrl = process.env.PUBLIC_URL
    const speed = getSpeed(amount)
    const style = amount !== 0 ? `animation-duration: ${speed}s` : '';

    return (
        <object type="image/svg+xml" data={`${publicUrl}/header-icons/rain.svg`}>
            <param name="s" value={style} />
        </object>
    )
}
