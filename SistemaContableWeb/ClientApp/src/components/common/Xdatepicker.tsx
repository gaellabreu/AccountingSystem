import React from 'react'
import { Tag } from "antd"
import DatePicker, { DatePickerProps } from 'antd/lib/date-picker'

export const Xdatepicker = (props: DatePickerProps) => {

    return <div style={{ paddingBottom: '5px', width: '100%' }}>
        <Tag
            color={'geekblue'}>{props["aria-label"]}</Tag> <br />
        <DatePicker
            {...props}
            style={{ width: '100%' }}
            size={'small'}></DatePicker>
    </div>
}