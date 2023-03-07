import React from "react"

interface Props {
    children:Array<JSX.Element>;
    gradientDirection:string;
}

export default function CardSlider({children, gradientDirection}:Props){
    return(
        <div style={{"--gradientDirection": gradientDirection} as React.CSSProperties} className="slider-container">
            {children}
        </div>
    )
}