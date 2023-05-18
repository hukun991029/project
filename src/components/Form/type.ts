export interface Options {
    label: string
    prop: string
    value: undefined | null | [] | ''
    type:
        | 'auto-complete'
        | 'cascader'
        | 'checkbox '
        | 'date-picker '
        | 'input'
        | 'input-number'
        | 'mentions'
        | 'radio'
        | 'rate'
        | 'select'
        | 'slider'
        | 'switch'
        | 'time-picker'

    placeholder: string
    attrs: any
}
