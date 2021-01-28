import React from 'react'
import { Tag } from "antd"
import Select, { SelectProps } from 'antd/lib/select'

export const Xselect = (props: SelectProps<[]>) => {

    return <div style={{ paddingBottom: '5px' }}>
        <Tag
            color={'geekblue'}>{props["aria-label"]}</Tag> <br />
        <Select
            {...props}
            style={{ width: '100%' }}
            size={'small'}>
            {props.children}
        </Select>
    </div>
}