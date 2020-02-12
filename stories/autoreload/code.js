const code_1 = `
import React, { useState } from 'react';
import { AutoReload } from 'gantd';

function Use1() {
  return <>
    <AutoReload
      refresh={() => { console.log('refresh1') }}
    />
  </>
}

ReactDOM.render(
    <Use1 />,
    mountNode,
);
`

const code_2 = `
import React, { useState } from 'react';
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

ReactDOM.render(
    <Use2 />,
    mountNode,
);
`

export default [code_1,code_2];
