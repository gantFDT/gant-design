const code_1 = `<Intro
        title="标题"
        imageRadius="5"
        image="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2105413885,2540060979&fm=26&gp=0.jpg"
        content='this is the content'
    />
`;
const code_2 = `<Intro
        title="标题"
        imageRadius="5"
        image={false}
        content='this is the content'
    />
`;
const code_3 = `<Intro
        title="标题"
        imageRadius="5"
        image="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2105413885,2540060979&fm=26&gp=0.jpg"
        imageAlign='right'
        content='this is the content'
    />
`;
export default [code_1, code_2, code_3]