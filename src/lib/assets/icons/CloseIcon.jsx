import React from 'react'

const CloseIcon = ({width, height, color}) => {
  return (
    <svg width={width ? width : "36px"} height={height ? height : "36px"} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill={color ? color : "#000000"} d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"/></svg>
  )
}

export default CloseIcon
