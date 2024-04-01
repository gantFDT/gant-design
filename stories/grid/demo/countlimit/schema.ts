
import {
  ValueGetterParams,
  ValueFormatterParams,
  Columns,
} from '@grid';
import { Input, DatePicker } from '@gantd';
import { set } from 'lodash';
import Radio from './Radio'

export const formSchema ={
  type:'object',
  propertyType: {
    mode:{
      title:'查询模式',
      componentType:'Radio',
      props:{
        dataSource:[
          {
            name:'模糊',
            value:'limit',
          },
          {
            name:'精确',
            value:'default',
          },
        ]
      }
    },
    countLimit:{
      title:'countLimit',
      componentType:'InputNumber',
      required:true,
      dependencies:['mode'],
      onDependenciesChange:([mode],schema,form)=>{
        console.info({mode,form})
        let required = true
        let disabled = false
        if(mode!=='limit'){
          disabled = true
          required = false
        }
        form.setFieldsValue({countLimit:required?10000:undefined})
        set(schema,'props.disabled',disabled)
        set(schema,'required',required)
        return schema
      },
    },
    totalCount:{
      title: '数据总条数',
      componentType:'InputNumber',
      required:true,
    }
  }
}

export const uiSchema = {
  'ui:col':8
}



export const customFields = [
  {
    name:'Radio',
    component:Radio
  },
]

export const columns: Columns[] = [
  {
    fieldName: 'user.name',
    title: '英文名称',
    cellRenderer: 'gantGroupCellRenderer',
    filter: 'agTextColumnFilter',
    valueGetter: params => {
      return params.data.user.name;
    },
    editConfig: {
      component: Input,
      editable: true,
      signable: true,
      rules: [
        {
          required: true,
          message: '姓名不能为空',
        },
      ],
    },
  },
  {
    fieldName: 'cn',
    title: '中文名称',
    editConfig: {
      component: Input,
      editable: true,
      signable: true,
      rules: {
        max: 4,
        type: 'string',
        message: '中文名不能大于四个字符',
      },
    },
  },
  {
    fieldName: 'date',
    title: '出生日期',
    editConfig: {
      component: DatePicker,
      editable: true,
      signable: true,
    },
    filter: 'agDateColumnFilter',
  },
  {
    fieldName: 'nationality',
    title: '国籍',
    valueGetter: (params: ValueGetterParams) => {
      let value = params.data.nationality;
      return value;
    },
  },
];
