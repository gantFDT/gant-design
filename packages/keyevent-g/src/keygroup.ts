import KeyCode from 'rc-util/es/KeyCode'; // keyCode 常量

const splitKey = (str: string): Array<string> | null => {
  let reg = /[A-Z][a-z]*/g;
  return str.match(reg);
};

const isSpecialKey = (key: string) => {
  return ['Alt', 'Ctrl', 'Meta', 'Shift'].includes(key);
};

export default {
  ...KeyCode,
  checkKeyGroup: function checkKeyGroup(e: KeyboardEvent, ename: string) {
    // 检查是否是合法的按键
    const keys = splitKey(ename); // 分解按键
    if (!keys) return;
    for (let index = 0; index < keys.length; index++) {
      // for方便跳出循环
      const key = keys[index];
      if (isSpecialKey(key)) {
        // 快捷键字符 Alt Ctrl Meta Shift
        if (!e[`${key.toLowerCase()}Key`]) return false;
      } else {
        // 普通字符 A-Z 0-9 ESC 等
        if (e.keyCode !== KeyCode[key.toUpperCase()]) return false;
      }
    }
    return true;
  },
};
