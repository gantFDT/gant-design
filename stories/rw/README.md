
## EditStatus说明

EditStatus状态如下所示：

```ts
enum EditStatus {
  SAVE = 'SAVE',
  EDIT = 'EDIT',
  CANCEL = 'CANCEL',
}

```

可以看到它是一个枚举类型，总共有3个状态，分别是SAVE, EDIT,CANCEL，通过ts可以很容易得到

状态含义：

• CANCEL：有两个含义，其一是一般作为默认状态使用，另一个含义是组件处于EDIT状态，当用户取消编辑的时候，就会切换回CANCEL状态，这个时候组件不会保留用户在编辑状态下做的任何更改

• EDIT：编辑状态，在这个状态下表示用户可以进行操作数据的行为。

• SAVE：直译为保存状态，组件在这个状态下与CANCEL一致，用户不能进行任何数据的操作。而与CANCEL的区别是，当组件状态由EDIT切换为SAVE的时候，用户之前的数据更改将被保留下来

EditStatus主要引用与表单组件，与可编辑表格中。

## SwitchStatus说明

实际应用中，我们需要频繁去切换状态就不可避免的频繁去读写状态：

```js
setEdit(EditStatus.CANCEL)
// 或者
setEdit(EditStatus.SAVE)
// 再或者根据目前的状态去切换
setEdit(status => {
    if(status === EditStatus.CANCEL){
        return EditStatus.EDIT
    }
    else{
        return EditStatus.CANCEL
    }
})
```

为了简化在切换状态时候的操作，建立了一个SwitchStatus方法，用于简便的对编辑状态进行操作