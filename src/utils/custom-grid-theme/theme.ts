import kakaGrid from '@mctech/kaka-grid'
import isNumber from 'lodash.isnumber'
function isBoxSelection(selection) {
  return selection && (
    selection._start.row !== selection._end.row
    || selection._start.col !== selection._end.col)
}
function inBoxSelection(row, col, selection) {
  return isBoxSelection(selection)
    && row >= selection._start.row
    && col >= selection._start.col
    && row <= selection._end.row
    && col <= selection._end.col
}

export default {
  highlightBorderColor({ row, col, grid }) {
    if (row === 0 || inBoxSelection(row, col, grid?.selection))
      return '#24A7E3'
    else return 'transparent'
  },
  button: {
    bgColor: '#2196F3',
  },

  defaultBgColor({ row, grid }) {
    if (row === 0 && !grid.hiddenHeader) {
      return '#fff'
    }
    else {
      if (grid.hiddenHeader) {
        if (grid.currentSelectId === (grid.getRowRecord(row)?.id || row)) {
          if (!isNumber(grid?.selection?.select?.row))
            return '#fff'

          return '#E6F6FF'
        }
      }
      else {
        if (row !== 0 && row === grid?.selection?.select.row)
          return '#E6F6FF'
      }
    }
    if (!(grid.dataSource instanceof kakaGrid.data.TreeDataSource)) {
      return '#fff'
    }
    else {
      let level
      const recordIndex = grid.getRecordIndexByRow(row)
      if (recordIndex >= 0) {
        const treeInfo = grid.dataSource.getTreeInfo(recordIndex)
        level = treeInfo.level
      }
      if (level === 1)
        return '#FBFBFB'

      else if (level > 1)
        return '#f1f2f4'
    }
  },
}
