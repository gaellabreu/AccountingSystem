import { Input } from "antd";
import React, { forwardRef } from "react";
import ReactInputMask from 'react-input-mask';

export default forwardRef((props: any, ref: any) => <ReactInputMask {...props}>
    {(inputProps: any) => <Input {...inputProps} disabled={props.disabled ? props.disabled : null} />}
</ReactInputMask>)