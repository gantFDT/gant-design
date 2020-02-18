var codeArr = []

var maxLength = 28;
var beginIndex = 0;

while (beginIndex < maxLength) {
    codeArr.push(`
        import { Loading } from 'gantd';
        ReactDOM.render(
            <Loading index={${beginIndex}} height={150}/>,
            mountNode,
        );
    `)
    beginIndex++;
}




export default codeArr;
