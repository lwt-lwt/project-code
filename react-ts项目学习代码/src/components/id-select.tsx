import { Select } from "antd";
import React from "react";
import { Raw } from "types";

// 把Select身上的属性全部扒下来
type SelectProps = React.ComponentProps<typeof Select>

// 继承时有相同键的时候会有冲突。因此需要增加Omit   
interface IdSelectProps extends Omit<SelectProps, 'value' | 'onChange' | 'options'> {
    value: Raw | undefined | null,
    // 值往外传时都改成number类型
    onChange: (value?: number) => void,
    defaultOptionName?: string,
    options?: { name: string, id: number }[]
}

/* 
value:可以传入多种类型的值
onChange：只会回调number|undefined类型
当isNaN(Number(value))为true的时候，代表选择默认类型
当选择默认类型的时候，onChange会回调undefined
*/
export const IdSelect = (props: IdSelectProps) => {
    const { value, onChange, defaultOptionName, options } = props;
    return (
        <Select
            // 未返回数据时默认为0
            value={options?.length ? toNumber(value) : 0}
            onChange={value => onChange(toNumber(value) || undefined)}
        >
            {
                // 默认选项
                defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option> : null
            }
            {
                options?.map(option => <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>)
            }
        </Select>
    )

}
const toNumber = (value: unknown) => isNaN(Number(value)) ? 0 : Number(value);