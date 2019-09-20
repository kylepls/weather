import React from 'react'

const LightSvg = ({ percent, planetImage, primaryColor, secondaryColor }: any) => {
    const rx = 109.6, ry = 88;

    const height = 54;
    const [ x, y ] = calcArcXY(percent, rx, ry);

    return (
        <div className="lightElement">
            <svg width="100%"
                 viewBox={`0 -10 200 ${height+10}`}
                 preserveAspectRatio="xMidYMid meet"
                 xmlns="http://www.w3.org/2000/svg">
                <ellipse fill={primaryColor} ry={ry} rx={rx} cy="90" cx="100" />
                <line stroke={secondaryColor} y2={height-1.5} x2="0" y1={height-1.5} x1="200" />
                <path d={`M0 ${height} A${rx} ${ry} 0 0 1 ${x} ${y} L100 ${height}`}
                      fill={secondaryColor} />
                <image xlinkHref={planetImage} x={x-10} y={y-10} width="20" height="20" />
            </svg>
        </div>
    )
};

function calcArcXY(percent: number, rx: number, ry: number) {
    const endBound = 0.11;
    const maxP = 1-endBound, minP = endBound;
    let p = (Math.round(percent * 100) % 100)/100;
    p = (maxP - minP) * p + minP;

    const theta = p * Math.PI + Math.PI;

    let x = rx * Math.cos(theta) + 100;
    let y = ry * Math.sin(theta) + 90;

    return [ x, y ];
}

export default LightSvg;
