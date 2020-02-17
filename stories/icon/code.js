const code_1 = `<Icon type="star" theme="filled"
            style={{
              color: '#333',
              fontSize: '16px',
              verticalAlign: 'text-bottom',
              marginRight: '5px',
              cursor: 'pointer'
            }}
          />`;
const code_2 = `
          const PartIcon = Icon.createFromIconfontCN('partIcon', {
            scriptUrl: '//at.alicdn.com/t/font_687278_5i22ts2wtbx.js'
          })
          <PartIcon type="icon-msnui-protect"
            style={{
              color: '#FFC000',
              fontSize: '16px',
              verticalAlign:
              'text-bottom',
              marginRight: '5px',
              cursor: 'pointer'
            }}
          />`;
const code_3 = `
          setTimeout(() => {
            Icon.updateFromIconfontCN({
              scriptUrl: '//at.alicdn.com/t/font_1252237_d3o5b6zp99f.js'
            })
          }, 5000)
          return (
            <Icon type="icon-jiaoseguanli_old" />
          )`;

export default [code_1, code_2, code_3]