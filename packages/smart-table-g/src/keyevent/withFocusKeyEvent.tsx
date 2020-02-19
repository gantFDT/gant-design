import React, { useRef, useLayoutEffect, useCallback } from 'react';
import KeyCode from "./keyGroup";
const KEY_EVENT = 'keydown';

const keyReg = /^on(Alt|Ctrl|Meta|Shift){0,4}([A-Z][a-z]*)+$/;


const withFocusKeyEvent = (WrapedComponent: React.ReactNode, bindKeys: object): React.ReactNode => {
  if (!bindKeys) return WrapedComponent;
  const ref = useRef<HTMLDivElement>(null);

  const validPropName = useCallback((e, keyName) => {
    // 验证属性名
    if (keyReg.test(keyName) && KeyCode.checkKeyGroup(e, keyName)) {
      return true
    }
    return false
  }, []);

  useLayoutEffect(() => {
    const dom = ref.current;
    const callback = (ev: KeyboardEvent) => {
      Object.keys(bindKeys).filter((keyName) => validPropName(ev, keyName)).forEach(key => {
        bindKeys[key](ev);
      })
    }
    if (dom) dom.addEventListener(KEY_EVENT, callback);
    return () => {
      if (dom) dom.removeEventListener(KEY_EVENT, callback);
    };
  }, [ref, bindKeys]);

  return <div ref={ref} tabIndex={-1}>
    {WrapedComponent}
  </div>
}

export default withFocusKeyEvent;