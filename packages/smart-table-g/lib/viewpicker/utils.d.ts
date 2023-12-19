import { DefaultView } from './index';
interface GetActiveDefaultViewProps {
    systemViews: any[];
    companyViews: any[];
    customViews: any[];
    defaultView: DefaultView;
}
/**
 * 获取当前显示的默认视图
 * @param props
 */
export declare function getActiveDefaultView(props: GetActiveDefaultViewProps): any;
export {};
