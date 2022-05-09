import { ColumnApi, GridApi, OnReady, RowClassParams, RowClassRules, RowNode } from '@grid';
import { useRef, useCallback, useMemo } from 'react';
import _ from 'lodash';

//同级增加
const codeBrotherPlus = (path: string[], node: RowNode, rowKey: string) => {
  
  return [...path, node[rowKey]];
};
//子级增加
const codeChildrenPlus = (path: string[], node: RowNode, rowKey: string) => {
  return [...path, node[rowKey]];
};

interface IUseGridSortParams {
  onBeforeMove?: () => boolean | void;
  rowKey?: string;
  sortKey?: string;
  dragKey?: string;
  onDragEnd: (params: any) => void;
}
export const useGridSort = ({
  onBeforeMove,
  onDragEnd,
  rowKey = 'id',
  sortKey = 'path',
  dragKey = 'girdDragStatus',
}: IUseGridSortParams) => {
  const targetRef = useRef<RowNode>(null as any);

  const onRowDragMove = useCallback(event => {
    if (onBeforeMove && onBeforeMove()) return;
    const { overNode, y } = event;

    if (overNode) {
      if (!targetRef.current) {
        targetRef.current = overNode;
      }
      const rowTop = _.get(targetRef, 'current.rowTop', 0);
      const rowHeight = _.get(targetRef, 'current.rowHeight', 0);
      let local = rowTop + rowHeight / 2 > event.y ? 'top' : 'buttom';
      if (y > rowTop + rowHeight / 4 && y < rowTop + (rowHeight / 4) * 3) {
        local = 'middle';
      }
      if (overNode == targetRef.current) {
        overNode.setData({
          ...overNode.data,
          [dragKey]: local,
        });
      } else {
        targetRef.current.setData({
          ...targetRef.current.data,
          [dragKey]: null,
        });
      }
      targetRef.current = overNode;
    } else {
      targetRef.current.setData({
        ...targetRef.current.data,
        [dragKey]: null,
      });
      return;
    }
  }, []);

  const onRowDragEnd = useCallback(
    event => {
      const { node, overNode } = event;
      if (_.get(node, 'data') && _.get(overNode, 'data')) {
        const fromPath = node.data[sortKey];
        let toPath = overNode.data[sortKey];
        const parentAssert =
          node.data.path.length < overNode.data.path.length &&
          overNode.data.path.includes(node.data[rowKey]);

        if (fromPath !== toPath && !parentAssert) {
          //不能托给自己
          if (_.get(overNode, `data.${dragKey}`) === 'middle') {
            //如果是拖到了中间
            if (_.get(node, 'data.parentId') === _.get(overNode, 'data.id')) {
              //不能拖给父节点
              targetRef.current.setData({
                ...targetRef.current.data,
                [dragKey]: null,
              });
              return;
            }
            const children = _.get(overNode, 'data.children');
            if (!_.isEmpty(children)) {
              toPath = codeBrotherPlus(children[children.length - 1][sortKey], node, rowKey);
            } else {
              toPath = codeChildrenPlus(_.get(overNode, `data.${sortKey}`), node, rowKey);
            }
          }
          targetRef.current.setData({
            ...targetRef.current.data,
            [dragKey]: null,
          });
          onDragEnd({
            node,
            overNode,
            fromPath,
            toPath,
          });

        } else {
          targetRef.current.setData({
            ...targetRef.current.data,
            [dragKey]: null,
          });
          return;
        }
      }
    },
    [rowKey, onDragEnd],
  );

  const ruleClassRules: RowClassRules = useMemo(
    () => ({
      dragbottom(params: RowClassParams) {
        return (
          _.get(params, `data.${rowKey}`) == _.get(targetRef, 'current.id') &&
          _.get(params, `data.${dragKey}`) === 'buttom'
        );
      },
      dragmiddle(params: RowClassParams) {
        return (
          _.get(params, `data.${rowKey}`) == _.get(targetRef, 'current.id') &&
          _.get(params, `data.${dragKey}`) === 'middle'
        );
      },
      dragtop(params: RowClassParams) {
        return (
          _.get(params, `data.${rowKey}`) == _.get(targetRef, 'current.id') &&
          _.get(params, `data.${dragKey}`) === 'top'
        );
      },
    }),
    [rowKey],
  );

  return {
    onRowDragMove,
    onRowDragEnd,
    ruleClassRules,
  };
};
