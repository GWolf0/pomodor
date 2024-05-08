import React, { useContext, useEffect, useRef } from 'react'
import PomodoroApp from '../Objects/pomodoroApp';
import { appContext } from '../Contexts/appContext';

interface AppConfigDialogPropsDef{
    onClose:()=>any,
}
function AppConfigDialog({onClose}:AppConfigDialogPropsDef){
    const {appInstance,setAppInstance}=useContext(appContext);

    const phase1DurationInputRef:React.RefObject<HTMLInputElement>=useRef<HTMLInputElement>(null);
    const phase2DurationInputRef:React.RefObject<HTMLInputElement>=useRef<HTMLInputElement>(null);
    const phase3DurationInputRef:React.RefObject<HTMLInputElement>=useRef<HTMLInputElement>(null);

    useEffect(()=>{
        phase1DurationInputRef.current!.value=appInstance!.settings.phasesDurations[0].toString();
        phase2DurationInputRef.current!.value=appInstance!.settings.phasesDurations[1].toString();
        phase3DurationInputRef.current!.value=appInstance!.settings.phasesDurations[2].toString();
    },[]);
    useEffect(()=>{
        PomodoroApp.onFontChanged(appInstance!.settings.font);
    },[appInstance!.settings.font]);

    function onFontBtn(fontIdx:number){
        setAppInstance(prev=>({...prev!,settings:{...prev!.settings,font:fontIdx}}));
    }

    function onColorBtn(colorIdx:number){
        setAppInstance(prev=>({...prev!,settings:{...prev!.settings,color:colorIdx}}));
    }

    function onApplyBtn(){
        setAppInstance(prev=>({...prev!,settings:{...prev!.settings,phasesDurations:[
            parseInt(phase1DurationInputRef.current!.value),
            parseInt(phase2DurationInputRef.current!.value),
            parseInt(phase3DurationInputRef.current!.value),
        ]}}));
        PomodoroApp.saveSettings(appInstance!.settings);
        onClose();
    }

    return (
        <div className='relative rounded-2xl bg-light' style={{width:'min(95vw,480px)'}}>
            <div className='py-2.5 md:py-5 px-5 md:px-10 border-b border-semitrans flex items-center justify-between'>
                <p className='text-dark text-2xl font-semibold'>Settings</p>
                <button className='p-2 text-semitrans text-2xl hover:opacity-70' onClick={onClose}>&times;</button>
            </div>
            <div className='px-2.5 md:px-5 pb-5'>
                <section className='border-b border-semitrans p-2.5 md:p-5'>
                    <p className='text-dark text-lg mb-2'>TIME (MINUTES)</p>
                    <div className='flex gap-1 md:gap-2'>
                        <div className='grow flex flex-col gap-1.5'>
                            <p className='text-xs text-dark'>pomodoro</p>
                            <input ref={phase1DurationInputRef} type="number" className='p-1.5 w-full rounded-lg bg-semitrans text-dark focus:outline-primary' />
                        </div>
                        <div className='grow flex flex-col gap-1.5'>
                            <p className='text-xs text-dark'>short break</p>
                            <input ref={phase2DurationInputRef} type="number" className='p-1.5 w-full rounded-lg bg-semitrans text-dark focus:outline-primary' />
                        </div>
                        <div className='grow flex flex-col gap-1.5'>
                            <p className='text-xs text-dark'>long break</p>
                            <input ref={phase3DurationInputRef} type="number" className='p-1.5 w-full rounded-lg bg-semitrans text-dark focus:outline-primary' />
                        </div>
                    </div>
                </section>

                <section className='border-b border-semitrans p-2.5 md:p-5 flex items-center justify-between'>
                    <p className='text-dark text-lg'>FONT</p>
                    <div className='flex gap-1'>
                        <button onClick={()=>onFontBtn(0)} className={`${appInstance?.settings.font===0?'bg-dark text-light':'bg-light text-dark'} w-10 h-10 rounded-full text-sm hover:opacity-70`} style={{fontFamily:PomodoroApp.FONTS[0]}}>Aa</button>
                        <button onClick={()=>onFontBtn(1)} className={`${appInstance?.settings.font===1?'bg-dark text-light':'bg-light text-dark'} w-10 h-10 rounded-full text-sm hover:opacity-70`} style={{fontFamily:PomodoroApp.FONTS[1]}}>Aa</button>
                        <button onClick={()=>onFontBtn(2)} className={`${appInstance?.settings.font===2?'bg-dark text-light':'bg-light text-dark'} w-10 h-10 rounded-full text-sm hover:opacity-70`} style={{fontFamily:PomodoroApp.FONTS[2]}}>Aa</button>
                    </div>
                </section>

                <section className='p-2.5 md:p-5 flex items-center justify-between'>
                    <p className='text-dark text-lg'>COLOR</p>
                    <div className='flex gap-1'>
                        <button onClick={()=>onColorBtn(0)} className='w-10 h-10 rounded-full text-dark bg-primary1 hover:opacity-70'>{appInstance?.settings.color===0&&<i className='bi bi-check text-xl'></i>}</button>
                        <button onClick={()=>onColorBtn(1)} className='w-10 h-10 rounded-full text-dark bg-primary2 hover:opacity-70'>{appInstance?.settings.color===1&&<i className='bi bi-check text-xl'></i>}</button>
                        <button onClick={()=>onColorBtn(2)} className='w-10 h-10 rounded-full text-dark bg-primary3 hover:opacity-70'>{appInstance?.settings.color===2&&<i className='bi bi-check text-xl'></i>}</button>
                    </div>
                </section>
            </div>

            <button onClick={onApplyBtn} className={`absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 px-8 py-2 rounded-full bg-primary${(appInstance!.settings.color+1).toString()} text-light hover:scale-105 transition-transform`}>Apply</button>
        </div>
    )
}

export default AppConfigDialog;