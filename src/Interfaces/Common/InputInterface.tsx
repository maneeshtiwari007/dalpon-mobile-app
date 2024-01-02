export default interface Inputinterface {
    attrName?: string,
    title?: string,
    value?: string,
    updateMasterState?: any,
    keyboardType?: string,
    titleActiveSize?: number, // to control size of title when field is active
    titleInActiveSize?: number, // to control size of title when field is inactive
    titleActiveColor?: string, // to control color of title when field is active
    titleInactiveColor?: string, // to control color of title when field is active
    textInputStyles?: object,
    otherTextInputProps?: object,
    secureTextEntry?:boolean,
    anyError?:any,
    placeholder?:any,
    icon?:any
}