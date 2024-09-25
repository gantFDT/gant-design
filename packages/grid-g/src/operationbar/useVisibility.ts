import { useLatest, useMemoizedFn } from 'ahooks';
import { useCallback, useEffect, useRef, useState, RefObject } from 'react';
import { isEmpty } from 'lodash';
import { OperationBarProps } from './index';

export interface UseVisibilityProps extends OperationBarProps {
  operationBarRef: RefObject<HTMLDivElement>;
  /**
   * 鼠标悬浮底部区域的时间阈值
   */
  hoverTimeThreshold?: number;
  /**
   * 底部区域高度
   */
  height?: number;
}

export function useVisibility(props: UseVisibilityProps) {
  const {
    selectedRows,
    ready,
    apiRef,
    hoverTimeThreshold = 0,
    height = 50,
    operationBarRef,
    show = false,
    disabled = false,
  } = props;
  const [state, setState] = useState({
    visible: false,
    hasToBottom: false,
  });
  const { visible, hasToBottom } = state;
  const gridWrapperRef = useRef<HTMLDivElement>(null);
  const mouseOverTimerRef = useRef(null);
  const isScrollToBottomRef = useRef(false);
  const showRef = useLatest(show);
  const disabledRef = useLatest(disabled);

  const showBar = useCallback(() => {
    let visible = disabledRef.current === true ? false : true;
    setState(pre => ({
      ...pre,
      visible,
      hasToBottom: isScrollToBottomRef.current,
    }));
  }, []);

  const hideBar = useMemoizedFn(() => {
    clearTimeout(mouseOverTimerRef.current);
    let visible = false;

    if (
      (!isEmpty(selectedRows) || isScrollToBottomRef.current || showRef.current) &&
      !disabledRef.current
    ) {
      visible = true;
    }

    setState(pre => ({
      ...pre,
      visible,
      hasToBottom: isScrollToBottomRef.current,
    }));

    if (!visible) {
      if (gridWrapperRef.current) {
        gridWrapperRef.current.style.paddingBottom = '0px';
      }
    }
  });

  const onMouseMove = useCallback((e: MouseEvent) => {
    const rect = gridWrapperRef.current.getBoundingClientRect();
    const bottomThreshold = rect.bottom - height;
    const mouseY = e.clientY;
    if (mouseY >= bottomThreshold && mouseY <= rect.bottom) {
      mouseOverTimerRef.current = setTimeout(() => {
        showBar();
      }, hoverTimeThreshold);
    } else {
      hideBar();
    }
  }, []);

  const checkIsScrollToBottom = useCallback(() => {
    const targetElement = gridWrapperRef.current;
    const scrollTop = targetElement.scrollTop;
    const scrollHeight = targetElement.scrollHeight;
    const clientHeight = targetElement.clientHeight;

    if (scrollHeight === clientHeight) return false;

    const isScrollToBottom = scrollTop + clientHeight >= scrollHeight - 1;

    return isScrollToBottom;
  }, []);

  const onScroll = useCallback(() => {
    const targetElement = gridWrapperRef.current;
    const scrollHeight = targetElement.scrollHeight;
    const isScrollToBottom = checkIsScrollToBottom();
    isScrollToBottomRef.current = isScrollToBottom;

    if (isScrollToBottom) {
      targetElement.style.paddingBottom = `${height}px`;
      targetElement.scrollTo({
        top: scrollHeight,
        behavior: 'auto',
      });
      showBar();
    } else {
      hideBar();
    }
  }, []);

  const onMouseLeave = useCallback(e => {
    hideBar();
  }, []);

  const onDataSourceChange = useCallback(e => {
    const isScrollToBottom = checkIsScrollToBottom();
    isScrollToBottomRef.current = isScrollToBottom;

    hideBar();
  }, []);

  useEffect(() => {
    if (selectedRows?.length > 0 || show) {
      showBar();
    } else {
      hideBar();
    }
  }, [selectedRows, show]);

  useEffect(() => {
    if (!ready) return;
    const gridApi = apiRef.current;
    if (!gridApi) {
      console.error('gridApi is null');
      return;
    }

    const wrapper = (gridApi as any)?.gridBodyCtrl?.eBodyViewport;
    gridWrapperRef.current = wrapper;

    wrapper?.addEventListener('mousemove', onMouseMove);
    wrapper?.addEventListener('scroll', onScroll);
    gridApi?.addEventListener('rowDataUpdated', onDataSourceChange);

    return () => {
      wrapper?.removeEventListener('mousemove', onMouseMove);
      wrapper?.removeEventListener('scroll', onScroll);
      gridApi.removeEventListener('rowDataUpdated', onDataSourceChange);
    };
  }, [ready]);

  useEffect(() => {
    if (!operationBarRef.current) return;

    operationBarRef.current.addEventListener('mouseleave', onMouseLeave);

    return () => {
      operationBarRef.current.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return {
    visible,
    hasToBottom,
  };
}
