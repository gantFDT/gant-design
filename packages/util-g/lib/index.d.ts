/**
 * 判断ie版本
 */
export declare function IEVersion(): -1 | 6 | 7 | 8 | 9 | 10 | 11 | "edge";
export declare function getCookie(name: string): string | null;
export declare function delCookie(name: string): void;
export declare function setCookie(name: string, value: string, time?: any, path?: string): void;
export declare function generateUuid(len?: number, radix?: number): string;
/**
 * 判断类型
 */
export declare const getType: (obj: any) => any;
/**
 * JSON深拷贝
 */
export declare const deepCopy4JSON: <T>(data: T) => T;
/**
 * JSON数据相等
 */
export declare const JSONisEqual: (a: object, b: object) => boolean;
/**
 * 判断参数是不是空的 // {xxxx:undefined} => 空的
 */
export declare const isParamsEmpty: (value: object) => boolean;
export declare const compose: <T extends (param: K) => K, K>(...args: Array<T>) => T;
export declare function getTreeNode(Data: any[], childrenKey: string, key: string, value: any): any;
export declare function getIdsFormTree(Data: any[], childrenKey?: string, field?: string): any[];
export declare function array2Tree(data: any[], parentId?: string | undefined, keyName?: string): any[];
export declare function tree2Array(dataSource: any[], childrenKey?: string): any[];
/**
 * 根据文件获取大小获取对应带单位的字符串
 * @param {number |} num 文件size
 */
export declare function getFileUnit(size: number | string): string;
export declare function getTimeInterval(startTimeStr: string, endTimeStr: string): string;
/**
 *向上递归冒泡找节点
 *
 * @param {object} target    //当前节点
 * @param {string} className //节点class
 * @returns  //找到的节点
 */
export declare function findDomParentNode(target: object, className: string): any;
/**
 *
 *前端性能分析
 * @returns 计算后的分析数据
 */
export declare const getPerformanceTiming: () => {};
export declare function hexToRgba(hex: any, opacity: number): string;
