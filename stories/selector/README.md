## API


|     参数     |                                             说明                                             |               类型               |  默认值  |
| :----------: | :------------------------------------------------------------------------------------------: | :------------------------------: | :------: |
|  selectorId  |                  缓存数据在本机的键,相同值得两个组件实例的最近选择数据互通                   |              string              | selector |
|  valueProp   |                                   写在option上的value字段                                    |              string              |    ''    |
|  labelProp   |                                      用作显示的文本字段                                      |                                  |          |
| getLabelText |                                      初始化获取label值                                       | function(value, cb){ cb(label) } |          |
|  renderItem  |                                     用于自定义optionItem                                     |    function(item, Option){  }    |          |
|    query     |                  请求选项数据的方法,接受一个搜索框值得参数,返回一个promise                   |        function(filter){}        |          |
| optionLabel  |                  外部label，主要用于设置一个在list中没有的数据所显示的label                  |                                  |          |
|   isFilter   |                          是否过滤模式，过滤模式下会根据输入过滤选项                          |                                  |          |
|   useCache   | 是否开启选择器内置的任务缓存,建议在外部查询条件不会改变的情况下才开启，否则一定要设置为false |                                  |          |
|  useStorage  |                                       是否开启最近选择                                       |                                  |          |
|   readOnly   |                                           只读模式                                           |                                  |          |