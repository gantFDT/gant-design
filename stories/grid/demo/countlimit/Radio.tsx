import React from 'react'
import {Radio} from 'antd'

export default function CustomRadio(props:any){
  const {value,dataSource,onChange,...restProps} = props

  return (
    <Radio.Group value={value} onChange={onChange}>
    {dataSource.map(item=>{
      const {name,value} = item
      return <Radio.Button value={value}>{name}</Radio.Button>
    })}
    </Radio.Group>
  )
}
