/**
 * 将十六进制颜色值转变为HSL颜色值
 * @param {string} hexColor 十六进制颜色值
 * @returns {(string | number|string[])} HSL颜色值
 */
export const hex2hsl = (hexColor: string): string | number|string[] => {
  let sColor = hexColor.toLowerCase();
  //十六进制颜色值的正则表达式
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  // 如果是16进制颜色
  if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
          let sColorNew = "#";
          for (let i=1; i<4; i+=1) {
              sColorNew += sColor.slice(i, i+1).concat(sColor.slice(i, i+1));    
          }
          sColor = sColorNew;
      }
      //处理六位的颜色值
      const sColorChange = [];
      for (let i=1; i<7; i+=2) {
          sColorChange.push(parseInt("0x"+sColor.slice(i, i+2)));    
      }

      let [r, g, b] = sColorChange;
      r /= 255, g /= 255, b /= 255;
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      let h, s, l = (max + min) / 2;

      if (max == min){ 
          h = s = 0; // achromatic
      } else {
          const d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch(max) {
              case r: h = (g - b) / d + (g < b ? 6 : 0); break;
              case g: h = (b - r) / d + 2; break;
              case b: h = (r - g) / d + 4; break;
          }
          h /= 6;
      }

      return [h, s, l];
  }
  return sColor;
};

/**
 * 生成uuid
 */
export function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

/**
 * 判断类型
 */
export const getType = (obj: any) => Object.prototype.toString.call(obj).slice(8, -1);

/**
 * JSON深拷贝
 */
export const deepCopy4JSON: <T>(data: T) => T = (obj) => JSON.parse(JSON.stringify(obj));

/**
 * JSON数据相等
 */
export const JSONisEqual = (a: object, b: object) => JSON.stringify(a) === JSON.stringify(b);