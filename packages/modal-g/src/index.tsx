import { omit, pick, throttle } from 'lodash';
import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import ModalContext from './Context';
import { ContextContentProps, ModalProps } from './interface';
import ResizableModal from './ResizableModal';
import ResizableProvider from './ResizableProvider';
import { Modal } from 'antd';
import { getGlobalConfig } from './utils';

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

const ModalComponent = (modelProps: ModalProps) => {
  const globalConfig = getGlobalConfig();
  const props = { ...globalConfig, ...modelProps };
  const {
    id = uuid,
    throttle = 0,
    children,
    maxZIndex = 999,
    isModalDialog = true,
    onSizeChange,
    type = 'resize',
    ...restProps
  } = props;
  const { itemState = {}, width: restWidth } = restProps;
  const { width: itemWidth, height: itemHeight } = itemState;

  //兼容type为autoHeight的情况中的指定高度
  //宽度
  let modelWidth: number | string;
  if (typeof itemWidth === 'number') {
    modelWidth = itemWidth;
  }
  if (typeof itemWidth === 'string' && itemWidth.indexOf('%')) {
    modelWidth = (window.innerWidth * parseInt(itemWidth)) / 100;
  }
  if (restWidth) {
    modelWidth = restWidth;
  }

  //高度
  let modelHeight: number;
  if (typeof itemHeight === 'number') {
    modelHeight = itemHeight;
  }
  if (typeof itemHeight === 'string' && itemHeight.indexOf('%')) {
    modelHeight = (window.innerHeight * parseInt(itemHeight)) / 100;
  }

  const contentHeight = useMemo(() => {
    if (type === 'autoHeight') {
      return 'auto';
    }
    if (itemHeight && modelHeight) {
      return modelHeight - 0;
    }
  }, [type, itemHeight, modelHeight]);

  return (
    <>
      {type === 'resize' ? (
        <ResizableProvider maxZIndex={maxZIndex} {...pick(restProps, providerPropKeys)}>
          <ResizableModal
            id={id}
            isModalDialog={isModalDialog}
            {...omit(restProps, providerPropKeys)}
          >
            <ContextContent
              id={id}
              children={children}
              throttleTime={throttle}
              onSizeChange={onSizeChange}
            />
          </ResizableModal>
        </ResizableProvider>
      ) : (
        <Modal width={modelWidth} {...restProps}>
          <div
            style={{
              height: contentHeight,
            }}
          >
            {children}
          </div>
        </Modal>
      )}
    </>
  );
};

ModalComponent.ResizableModal = ResizableModal;
ModalComponent.ResizableProvider = ResizableProvider;
ModalComponent.ModalContext = ModalContext;

export default ModalComponent;
export { ResizableModal, ResizableProvider, ModalContext };
export { setGlobalConfig } from './utils';
