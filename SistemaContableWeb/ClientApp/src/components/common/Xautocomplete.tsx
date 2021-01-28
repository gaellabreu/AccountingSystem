import React from 'react'
import { AutoComplete, Tag } from "antd"
import { AutoCompleteProps } from 'antd/lib/auto-complete'

export const Xautocomplete = (props: AutoCompleteProps) => {

    return <div style={{ paddingBottom: '5px', width: '100%' }}>
        <Tag
            color={'geekblue'}>{props["aria-label"]}</Tag> <br />
        <AutoComplete
            {...props}
            style={{ width: '100%' }}
            size={'small'} />
    </div>
}