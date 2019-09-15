import React, {useState} from 'react'
import {useInterval} from "./Hooks";

export default function Carousel({items, intervalString}) {
    let [index, setIndex] = useState(0)

    const advanceIndex = () => ++index >= items.length ? setIndex(0) : setIndex(index)
    useInterval(advanceIndex, intervalString)

    if (items.length === 0) {
        return (<></>)
    }

    return items[index]
}
