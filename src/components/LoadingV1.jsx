import React from 'react'

const LoadingV1 = ({ width = "w-6", height = "h-6", margin = 0, padding = 0 }) => {
    return (
        <div className={`${width} ${height} ${margin} ${padding} rounded-full border-t-red-400 border-dotted border-l-yellow-400 border-r-blue-400 border-b-teal-400 border-3 animate-spin`}>

        </div>
    )
}

export default LoadingV1