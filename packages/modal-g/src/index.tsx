import { omit, pick, throttle } from 'lodash';
import React, { useCallback, useContext, useEffect } from 'react';
import ModalContext from './Context';
import { ContextContentProps, ModalProps } from './interface';
import ResizableModal from './ResizableModal';
import ResizableProvider from './ResizableProvider';

const uuid = 'modal-g-uuid';
const providerPropKeys = ['initalState', 'maxZIndex', 'minWidth', 'minHeight'];


const ContextContent: React.FC<ContextContentProps> = ({
  id,
  onSizeChange,
  throttleTime,
  children,
}) => {
  const {
    state: { modals },
  } = useContext(ModalContext);
  const { width, height } = modals[id];

  useEffect(() => {
    sizeChange(width, height);
  }, [width, height]);

  const sizeChange = useCallback(
    throttle((width, height) => {
      onSizeChange && onSizeChange(width, height);
    }, throttleTime),
    [],
  );

  return <>{children}</>;
};

class Modal extends React.Component<ModalProps, {}> {
  static ResizableModal: typeof ResizableModal;
  static ResizableProvider: typeof ResizableProvider;
  static ModalContext: typeof ModalContext;

  static defaultProps = {
    id: uuid,
    throttle: 0,
    maxZIndex: 999,
    isModalDialog: true,
  };

  render() {
    const { id, throttle, children, onSizeChange, ...restProps } = this.props;

    return (
      <ResizableProvider {...pick(restProps, providerPropKeys)}>
        <ResizableModal id={id} {...omit(restProps, providerPropKeys)}>
          <ContextContent
            id={id}
            children={children}
            throttleTime={throttle}
            onSizeChange={onSizeChange}
          />
        </ResizableModal>
      </ResizableProvider>
    );
  }
}

Modal.ResizableModal = ResizableModal;
Modal.ResizableProvider = ResizableProvider;
Modal.ModalContext = ModalContext;

export default Modal;
export { ResizableModal, ResizableProvider, ModalContext };
