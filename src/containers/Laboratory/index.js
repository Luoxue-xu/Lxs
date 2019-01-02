import React, { useState } from 'react'

export default () => {
    const [count, setCount] = useState(0)

    return (
        <div>
            <div>{count}</div>
            <div onClick={() => setCount(count + 1)}>Click</div>
        </div>
    )
}