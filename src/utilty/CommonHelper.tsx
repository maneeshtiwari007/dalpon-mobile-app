import AsyncStorage from "@react-native-async-storage/async-storage";
import { ConstantsVar } from "./ConstantsVar";

export const CommonHelper = {
    registerValidation: async function (params: any) {
        var emailValidation: boolean = false;
        var passwordValidation: boolean = false;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        var passwordReg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        if (reg.test(params?.email) !== false) {
            emailValidation = true;
        }
        if (passwordReg.test(params?.password) !== false) {
            passwordValidation = true;
        }
        return {
            email: emailValidation,
            password: passwordValidation,
            isValidated: (emailValidation && passwordValidation) ? true : false
        };
    },
    saveStorageData: async function(key:any,data:any){
        await AsyncStorage.setItem(key,data);
    },
    removeData: async function(key:any){
        await AsyncStorage.removeItem(key);
    },
    getData: async function(key:any){
        const jsondata = await AsyncStorage.getItem(key);
        if(jsondata){
            return JSON.parse(jsondata);
        } else {
            return jsondata;
        }
    },
    getUserData: async function(){
        const jsondata = await AsyncStorage.getItem(ConstantsVar.USER_STORAGE_KEY);
        if(jsondata){
            return JSON.parse(jsondata);
        } else {
            return jsondata;
        }
    },
    diffrenceBetween2date: async function (date1:any,date2:any){
        if(date1 && date2){
            return date2?.getTime() - date1?.getTime();
        }
    },
    convertTimeToHours:function(millisec:any){
        var seconds:any = (millisec / 1000).toFixed(0);
        var minutes:any = Math.floor(seconds / 60);
        var hours:any;
        if (minutes > 59) {
            hours = Math.floor(minutes / 60);
            hours = (hours >= 10) ? hours : "0" + hours;
            minutes = minutes - (hours * 60);
            minutes = (minutes >= 10) ? minutes : "0" + minutes;
            
        }

        seconds = Math.floor(seconds % 60);
        seconds = (seconds >= 10) ? seconds : "0" + seconds;
        minutes = (minutes < 10)?"0"+minutes:minutes;
        if (hours != "") {
            hours = (hours)?hours:"00";
            return hours + ":" + minutes + ":" + seconds;
        }
        return minutes + ":" + seconds;
    }
}