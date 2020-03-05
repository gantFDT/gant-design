const BasicUse = `function BasicUse() {
    return (
      <>
        <Icon value='api' /> /api/get
      </>
    )
  }
ReactDOM.render(
    <BasicUse />,
    mountNode,
);`;

const IconSelector = `function IconSelector() {
    const [value, setvalue] = useState('loading')
        return (
            <Icon allowEdit value={value} onChange={setvalue} onSave={(id, value, cb) => { cb() }} />
        )
    }
ReactDOM.render(
    <IconSelector />,
    mountNode,
);`

export default [BasicUse, IconSelector]