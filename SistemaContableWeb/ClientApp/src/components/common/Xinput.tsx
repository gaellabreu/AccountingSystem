import React from 'react'
import { Tag } from "antd"
import Input, { InputProps } from "antd/lib/input"

export const Xinput = (props: InputProps) => {

    return <div style={{ paddingBottom: '5px', width: '100%' }}>
        <Tag
            color={'geekblue'}>{props["aria-label"]}</Tag>
        <Input
            {...props}
            size={'small'}></Input>
    </div>
}