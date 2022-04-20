import { compose, branch, mapProps, withProps, toClass } from 'recompose';
import renderText, { GetText } from '../compose/renderText';
import editwrapper from '../compose/editwrapper';
import { withBasic } from '../compose/withbasic';
import { forwardRef } from 'react';
export { WithEditInProps } from '../compose/withbasic';
export default <T extends any>(getText: GetText<T>, popupClassName?: string) =>
  compose(
    toClass,
    withBasic(popupClassName),
    branch(
      props => !props.computedEdit, // 读模式
      () => {
        return renderText(getText);
      },
    ),
    editwrapper,
    mapProps(
      ({
        allowEdit,
        setEdit,
        computedEdit,
        setPopupClassName,
        setDisabledBlur,
        emptyText,
        ...props
      }) => ({ ...props }),
    ),
  );
