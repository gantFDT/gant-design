import { compose, withPropsOnChange, withState, withProps } from 'recompose'


export const tableWrapperRef = compose(
    withState('tableWraper', 'settableWraper', null),
    withProps(({ tableWraper, settableWraper }) => ({
        wrappedComponentRef: (ref) => {
            if (!tableWraper && ref) settableWraper(ref)
        }
    }))
)

export const scrollIntoViewWithRowKey = compose(

    withPropsOnChange(
        ['scrollKey'],
        ({ tableWraper, scrollKey }) => {
            if (tableWraper && scrollKey) {
                const tr = tableWraper.querySelector(`tr[data-row-key=\'${scrollKey}\']`)
                if (tr) {
                    tr.scrollIntoView({
                        behavior: 'smooth'
                    })
                }
            }
        }
    )
)