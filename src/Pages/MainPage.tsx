import { useContext, useEffect} from 'react'
import AppConfigDialog from '../Components/AppConfigDialog';
import CircularProgressIndicator from '../Components/CircularProgressIndicator';
import PomodoroApp, { PomodoroPhase } from '../Objects/pomodoroApp';
import { appContext } from '../Contexts/appContext';

interface MainPagePropsDef{}
let timeInSeconds:number=0;
function MainPage({}:MainPagePropsDef){
    const {appInstance,setAppInstance}=useContext(appContext);

    useEffect(()=>{
        if(appInstance!.timerStarted){
            setTimeout(()=>{
                setAppInstance(prev=>({...prev!,time:Math.max(0,prev!.time-1)}));
            },1000);
        }
    },[appInstance!.timerStarted,appInstance!.time]);
    useEffect(()=>{
        onStopTimer();
    },[appInstance!.settings.phasesDurations]);

    function onToggleTimer(){
        if(appInstance?.timerStarted)onPauseTimer();
        else onStartTimer();
    }
    function onStartTimer(){
        timeInSeconds=PomodoroApp.getTimeInSecondsFromMinutes(appInstance!.settings.phasesDurations[appInstance!.curPhase]);
        setAppInstance(prev=>({...prev!,timerStarted:true,time:prev!.time===0?timeInSeconds:prev!.time}));
    }
    function onPauseTimer(){
        setAppInstance(prev=>({...prev!,timerStarted:false}));
    }
    function onStopTimer(){
        setAppInstance(prev=>({...prev!,timerStarted:false,time:0}));
    }

    function onStopBtn(){
        onStopTimer();
    }
    function onSettingsBtn(){
        setAppInstance(prev=>({...prev!,settingsDialogOn:true}));
    }
    function onCloseSettingsModal(){
        setAppInstance(prev=>({...prev!,settingsDialogOn:false}));
    }

    function onPhaseBtn(phase:PomodoroPhase){
        setAppInstance(prev=>({...prev!,curPhase:phase,timerStarted:false,time:0}));
    }

    return (
        <div className='w-screen h-screen bg-dark'>
            <div className='mx-auto h-full flex flex-col px-2 md:px-4' style={{width:'min(100%,1280px)'}}>
                <header className='h-24 flex items-center justify-center'>
                    <p className='text-2xl font-bold text-lighter text-center'>pomodoro</p>
                </header>
                <section className='h-24 flex items-center justify-center'>
                    <div className='rounded-full overflow-hidden flex p-2 gap-2 bg-darker'>
                        <button onClick={()=>onPhaseBtn(PomodoroPhase.pomodoro)} className={`rounded-full py-2 px-4 text-light text-sm font-semibold ${appInstance?.curPhase===PomodoroPhase.pomodoro?'bg-primary'+(appInstance!.settings.color+1).toString()+' text-dark':'bg-inherit'} hover:opacity-70`}>pomodoro</button>
                        <button onClick={()=>onPhaseBtn(PomodoroPhase.shortBreak)} className={`rounded-full py-2 px-4 text-light text-sm font-semibold ${appInstance?.curPhase===PomodoroPhase.shortBreak?'bg-primary'+(appInstance!.settings.color+1).toString()+' text-dark':'bg-inherit'} hover:opacity-70`}>short break</button>
                        <button onClick={()=>onPhaseBtn(PomodoroPhase.longBreak)} className={`rounded-full py-2 px-4 text-light text-sm font-semibold ${appInstance?.curPhase===PomodoroPhase.longBreak?'bg-primary'+(appInstance!.settings.color+1).toString()+' text-dark':'bg-inherit'} hover:opacity-70`}>long break</button>
                    </div>
                </section>
                <section className='grow flex items-center justify-center'>
                    <div className='aspect-square rounded-full bg-gradient-to-br from-darker to-dark shadow-2xl' style={{width:'320px',padding:'10px'}}>
                        <div className='relative aspect-square rounded-full bg-darkest p-4' style={{width:'100%'}}>
                            <div className='absolute left-0 top-0 w-full h-full pointer-events-none'>
                                <CircularProgressIndicator width={300} value={appInstance!.time} maxValue={timeInSeconds} color={PomodoroApp.getColor(appInstance!.settings.color)} />
                            </div>
                            <div onClick={onToggleTimer} className='w-full h-full flex flex-col items-center justify-center gap-6 cursor-pointer hover:scale-105 hover:opacity-70 transition-transform'>
                                <p className='text-center text-lighter font-extrabold text-6xl'>{PomodoroApp.getFormattedSeconds(appInstance!.time)}</p>
                                <p className='text-center text-lighter tracking-widest text-xl'>{appInstance!.timerStarted?'P A U S E':appInstance!.time>0?'R E S U M E':'S T A R T'}</p>
                            </div>
                        </div>
                    </div>
                </section>
                <footer className='h-24 flex items-center justify-center gap-4 md:gap-6'>
                    <button title='settings' className='p-2 text-light text-2xl hover:opacity-70' onClick={onSettingsBtn}><i className="bi bi-gear-fill"></i></button>
                    <button title='stop' className={`p-2 ${appInstance?.timerStarted?'text-red-500':'text-light'} text-2xl hover:opacity-70`} onClick={onStopBtn}><i className="bi bi-stop-fill"></i></button>
                </footer>
            </div>

            {appInstance?.settingsDialogOn&&
            <div className='fixed top-0 left-0 w-screen h-screen bg-semitrans flex items-center justify-center'>
                <AppConfigDialog onClose={onCloseSettingsModal} />
            </div>
            }
        </div>
    )
}

export default MainPage;