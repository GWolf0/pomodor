
enum PomodoroPhase{pomodoro,shortBreak,longBreak}
interface PomodoroAppSettingsDef{
    phasesDurations:number[],
    font:number,
    color:number
}
interface PomodoroAppInstanceDef{
    curPhase:PomodoroPhase,
    timerStarted:boolean,
    time:number,
    settingsDialogOn:boolean,
    settings:PomodoroAppSettingsDef
}
class PomodoroApp{
    static DEFAULT_PHASES_DURATIONS:number[]=[25,5,15];
    static DEFAULT_FONT:number=0;
    static DEFAULT_COLOR:number=0;
    static DEFAULT_SETTINGS:PomodoroAppSettingsDef={
        phasesDurations:PomodoroApp.DEFAULT_PHASES_DURATIONS,
        font:PomodoroApp.DEFAULT_FONT,
        color:PomodoroApp.DEFAULT_COLOR
    }

    static FONTS:string[]=['"Kanit"',"monospace","arial"];
    static COLORS:string[]=["#F43F5E","#3B82F6","#8B5CF6"];

    static getColor(colorIdx:number):string{return PomodoroApp.COLORS[colorIdx];}

    static getInstance():PomodoroAppInstanceDef{
        return {
            curPhase:PomodoroPhase.pomodoro,
            timerStarted:false,
            time:0,
            settingsDialogOn:false,
            settings:PomodoroApp.loadSettings()
        }
    }

    static getTimeInSecondsFromMinutes(minutes:number):number{
        return minutes*60;
    }
    static getFormattedSeconds(seconds:number):string{
        const mins:number=Math.floor(seconds/60);
        const secs:number=seconds-(mins*60);
        return `${mins.toString().padStart(2,"0")} : ${secs.toString().padStart(2,"0")}`;
    }

    static onFontChanged(fontIdx:number){
        const newFont:string=PomodoroApp.FONTS[fontIdx];
        document.body.style.fontFamily=`${newFont}, sans-serif`;
    }

    //saving things
    static saveSettings(settings:PomodoroAppSettingsDef){
        localStorage.setItem("settings",JSON.stringify(settings));
    }
    static loadSettings():PomodoroAppSettingsDef{
        const settings:string|null=localStorage.getItem("settings");
        return settings?(JSON.parse(settings) as PomodoroAppSettingsDef):PomodoroApp.DEFAULT_SETTINGS;
    }

}

export type{PomodoroAppInstanceDef,PomodoroAppSettingsDef};
export {PomodoroPhase};
export default PomodoroApp;