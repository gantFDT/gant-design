export default [
`
import React, { useState } from 'react';
import { Radio, Switch, ConfigProvider } from 'antd'
import { AutoReload } from 'gantd';


function Use1() {
  return <>
    <AutoReload
      refresh={() => { console.log('refresh1') }}
    />
  </>
}

ReactDOM.render(<Use1 />, mountNode)`,`
import React, { useState } from 'react';
import { Radio, Switch, ConfigProvider } from 'antd'
import { AutoReload } from 'gantd';


function Use2() {
  return <>
    <AutoReload
      refresh={() => { console.log('refresh2') }}
      auto={true}
      interval={10}
      time={'自定义显示'}
    />
  </>
}

ReactDOM.render(<Use2 />, mountNode)`,`
import React, { useState } from 'react';
import { Radio, Switch, ConfigProvider } from 'antd'
import { AutoReload } from 'gantd';


// import zhCN from 'antd/es/locale/zh_CN' 模块化引入
// import enUS from 'antd/es/locale/en_US' 模块化引入
const zhCN = {
  "locale": "zh-cn",
  "Pagination": {
    "items_per_page": "条/页",
    "jump_to": "跳至",
    "jump_to_confirm": "确定",
    "page": "页",
    "prev_page": "上一页",
    "next_page": "下一页",
    "prev_5": "向前 5 页",
    "next_5": "向后 5 页",
    "prev_3": "向前 3 页",
    "next_3": "向后 3 页"
  },
  "DatePicker": {
    "lang": {
      "placeholder": "请选择日期",
      "rangePlaceholder": [
        "开始日期",
        "结束日期"
      ],
      "today": "今天",
      "now": "此刻",
      "backToToday": "返回今天",
      "ok": "确 定",
      "timeSelect": "选择时间",
      "dateSelect": "选择日期",
      "weekSelect": "选择周",
      "clear": "清除",
      "month": "月",
      "year": "年",
      "previousMonth": "上个月 (翻页上键)",
      "nextMonth": "下个月 (翻页下键)",
      "monthSelect": "选择月份",
      "yearSelect": "选择年份",
      "decadeSelect": "选择年代",
      "yearFormat": "YYYY年",
      "dayFormat": "D日",
      "dateFormat": "YYYY年M月D日",
      "dateTimeFormat": "YYYY年M月D日 HH时mm分ss秒",
      "previousYear": "上一年 (Control键加左方向键)",
      "nextYear": "下一年 (Control键加右方向键)",
      "previousDecade": "上一年代",
      "nextDecade": "下一年代",
      "previousCentury": "上一世纪",
      "nextCentury": "下一世纪"
    },
    "timePickerLocale": {
      "placeholder": "请选择时间"
    }
  },
  "TimePicker": {
    "placeholder": "请选择时间"
  },
  "Calendar": {
    "lang": {
      "placeholder": "请选择日期",
      "rangePlaceholder": [
        "开始日期",
        "结束日期"
      ],
      "today": "今天",
      "now": "此刻",
      "backToToday": "返回今天",
      "ok": "确 定",
      "timeSelect": "选择时间",
      "dateSelect": "选择日期",
      "weekSelect": "选择周",
      "clear": "清除",
      "month": "月",
      "year": "年",
      "previousMonth": "上个月 (翻页上键)",
      "nextMonth": "下个月 (翻页下键)",
      "monthSelect": "选择月份",
      "yearSelect": "选择年份",
      "decadeSelect": "选择年代",
      "yearFormat": "YYYY年",
      "dayFormat": "D日",
      "dateFormat": "YYYY年M月D日",
      "dateTimeFormat": "YYYY年M月D日 HH时mm分ss秒",
      "previousYear": "上一年 (Control键加左方向键)",
      "nextYear": "下一年 (Control键加右方向键)",
      "previousDecade": "上一年代",
      "nextDecade": "下一年代",
      "previousCentury": "上一世纪",
      "nextCentury": "下一世纪"
    },
    "timePickerLocale": {
      "placeholder": "请选择时间"
    }
  },
  "global": {
    "placeholder": "请选择"
  },
  "Table": {
    "filterTitle": "筛选",
    "filterConfirm": "确定",
    "filterReset": "重置",
    "selectAll": "全选当页",
    "selectInvert": "反选当页",
    "sortTitle": "排序",
    "expand": "展开行",
    "collapse": "关闭行"
  },
  "Modal": {
    "okText": "确定",
    "cancelText": "取消",
    "justOkText": "知道了"
  },
  "Popconfirm": {
    "cancelText": "取消",
    "okText": "确定"
  },
  "Transfer": {
    "searchPlaceholder": "请输入搜索内容",
    "itemUnit": "项",
    "itemsUnit": "项"
  },
  "Upload": {
    "uploading": "文件上传中",
    "removeFile": "删除文件",
    "uploadError": "上传错误",
    "previewFile": "预览文件",
    "downloadFile": "下载文件"
  },
  "Empty": {
    "description": "暂无数据"
  },
  "Icon": {
    "icon": "图标"
  },
  "Text": {
    "edit": "编辑",
    "copy": "复制",
    "copied": "复制成功",
    "expand": "展开"
  },
  "PageHeader": {
    "back": "返回"
  }
}
const enUS = {
  "locale": "en",
  "Pagination": {
    "items_per_page": "/ page",
    "jump_to": "Go to",
    "jump_to_confirm": "confirm",
    "page": "",
    "prev_page": "Previous Page",
    "next_page": "Next Page",
    "prev_5": "Previous 5 Pages",
    "next_5": "Next 5 Pages",
    "prev_3": "Previous 3 Pages",
    "next_3": "Next 3 Pages"
  },
  "DatePicker": {
    "lang": {
      "placeholder": "Select date",
      "rangePlaceholder": [
        "Start date",
        "End date"
      ],
      "today": "Today",
      "now": "Now",
      "backToToday": "Back to today",
      "ok": "Ok",
      "clear": "Clear",
      "month": "Month",
      "year": "Year",
      "timeSelect": "select time",
      "dateSelect": "select date",
      "weekSelect": "Choose a week",
      "monthSelect": "Choose a month",
      "yearSelect": "Choose a year",
      "decadeSelect": "Choose a decade",
      "yearFormat": "YYYY",
      "dateFormat": "M/D/YYYY",
      "dayFormat": "D",
      "dateTimeFormat": "M/D/YYYY HH:mm:ss",
      "monthBeforeYear": true,
      "previousMonth": "Previous month (PageUp)",
      "nextMonth": "Next month (PageDown)",
      "previousYear": "Last year (Control + left)",
      "nextYear": "Next year (Control + right)",
      "previousDecade": "Last decade",
      "nextDecade": "Next decade",
      "previousCentury": "Last century",
      "nextCentury": "Next century"
    },
    "timePickerLocale": {
      "placeholder": "Select time"
    }
  },
  "TimePicker": {
    "placeholder": "Select time"
  },
  "Calendar": {
    "lang": {
      "placeholder": "Select date",
      "rangePlaceholder": [
        "Start date",
        "End date"
      ],
      "today": "Today",
      "now": "Now",
      "backToToday": "Back to today",
      "ok": "Ok",
      "clear": "Clear",
      "month": "Month",
      "year": "Year",
      "timeSelect": "select time",
      "dateSelect": "select date",
      "weekSelect": "Choose a week",
      "monthSelect": "Choose a month",
      "yearSelect": "Choose a year",
      "decadeSelect": "Choose a decade",
      "yearFormat": "YYYY",
      "dateFormat": "M/D/YYYY",
      "dayFormat": "D",
      "dateTimeFormat": "M/D/YYYY HH:mm:ss",
      "monthBeforeYear": true,
      "previousMonth": "Previous month (PageUp)",
      "nextMonth": "Next month (PageDown)",
      "previousYear": "Last year (Control + left)",
      "nextYear": "Next year (Control + right)",
      "previousDecade": "Last decade",
      "nextDecade": "Next decade",
      "previousCentury": "Last century",
      "nextCentury": "Next century"
    },
    "timePickerLocale": {
      "placeholder": "Select time"
    }
  },
  "global": {
    "placeholder": "Please select"
  },
  "Table": {
    "filterTitle": "Filter menu",
    "filterConfirm": "OK",
    "filterReset": "Reset",
    "selectAll": "Select current page",
    "selectInvert": "Invert current page",
    "sortTitle": "Sort",
    "expand": "Expand row",
    "collapse": "Collapse row"
  },
  "Modal": {
    "okText": "OK",
    "cancelText": "Cancel",
    "justOkText": "OK"
  },
  "Popconfirm": {
    "okText": "OK",
    "cancelText": "Cancel"
  },
  "Transfer": {
    "titles": [
      "",
      ""
    ],
    "searchPlaceholder": "Search here",
    "itemUnit": "item",
    "itemsUnit": "items"
  },
  "Upload": {
    "uploading": "Uploading...",
    "removeFile": "Remove file",
    "uploadError": "Upload error",
    "previewFile": "Preview file",
    "downloadFile": "Download file"
  },
  "Empty": {
    "description": "No Data"
  },
  "Icon": {
    "icon": "icon"
  },
  "Text": {
    "edit": "Edit",
    "copy": "Copy",
    "copied": "Copied",
    "expand": "Expand"
  },
  "PageHeader": {
    "back": "Back"
  }
}

function Use3() {
  const initalLocale = {
    tips: '自定义-tips',
    close: '自定义-close',
    open: '自定义-open',
    set: '自定义-set',
    unit: '自定义-unit'
  }

  const [i18n, setI18n] = useState(zhCN)
  const [customLocale, setCustomLocale] = useState(false)

  return <>
    <ConfigProvider locale={i18n}>
      <div style={{ marginBottom: 10 }}>
        <Radio.Group size='small' onChange={(e) => setI18n(e.target.value)} value={i18n}>
          <Radio.Button value={enUS}>英文</Radio.Button>
          <Radio.Button value={zhCN}>中文</Radio.Button>
        </Radio.Group>
        <span style={{ marginLeft: 10 }}>自定义local：</span><Switch checked={customLocale} onChange={(checked) => { setCustomLocale(checked) }} />
      </div>
      <AutoReload
        locale={customLocale ? initalLocale : null}
        refresh={() => { console.log('refresh1') }}
      />
    </ConfigProvider>
  </>
}

ReactDOM.render(<zhCN />, mountNode)`,]