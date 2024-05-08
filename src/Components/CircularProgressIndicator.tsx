import React, { useEffect, useRef } from 'react'

interface CircularProgressIndicatorPropsDef{
    width:number,
    padding?:number,
    lineWidth?:number,
    color?:string,
    roundedLineCap?:boolean,
    value:number,
    maxValue:number,
}
function CircularProgressIndicator({value,maxValue,width,padding,lineWidth,color,roundedLineCap}:CircularProgressIndicatorPropsDef){
    padding=padding||10;
    lineWidth=lineWidth||8;
    color=color||"#F43F5E";
    roundedLineCap=roundedLineCap||true;
    
    const canRef:React.RefObject<HTMLCanvasElement>=useRef<HTMLCanvasElement>(null);

    useEffect(()=>{
        render();
    },[value,color]);

    function render(){
        const ctx:CanvasRenderingContext2D|null=canRef.current!.getContext("2d");
        if(!ctx)return;
        ctx.clearRect(0,0,width,width);
        ctx.lineCap=roundedLineCap?"round":"square";
        ctx.strokeStyle=color!;
        ctx.lineWidth=lineWidth!;
        ctx.beginPath();
        ctx.arc(width*0.5,width*0.5,width*0.5-(padding!*2),0,Math.PI*2*getPercentageFraction());
        ctx.stroke();
        ctx.closePath();
    }

    function getPercentageFraction():number{return value/maxValue;}

    return(
        <canvas ref={canRef} width={width} height={width} className='-rotate-90'></canvas>
    )
}

export default CircularProgressIndicator;