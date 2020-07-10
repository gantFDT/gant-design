// const handleCellMouseDown = useCallback(
//     (cellEvent: CellClickedEvent) => {
//       const { node, event } = cellEvent;
//       const mouseEvent: any = event;
//       if (node.isSelected() || mouseEvent.buttons !== 2) return;
//       if (mouseEvent.shiftKey) {
//         const rowIndexs = [node.rowIndex];
//         const selectedNodes = apiRef.current?.getSelectedNodes();
//         selectedNodes.map(itemNode => rowIndexs.push(itemNode.rowIndex));
//         const maxIndex = max(rowIndexs);
//         const minIndex = min(rowIndexs);
//         for (let index = minIndex; index <= maxIndex; index++) {
//           const nowNode = apiRef.current?.getDisplayedRowAtIndex(index);
//           nowNode.setSelected(true);
//         }
//         const filterNodes = selectedNodes.filter(
//           node => node.rowIndex < minIndex || node.rowIndex > maxIndex,
//         );
//         filterNodes.map(filterNode => filterNode.setSelected(false));
//       } else {
//         node.setSelected(true, true);
//       }
//       onCellMouseDown && onCellMouseDown(cellEvent);
//     },
//     [onCellMouseDown],
//   );