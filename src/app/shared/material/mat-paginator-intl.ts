import {MatPaginatorIntl as BaseMatPaginatorIntl} from '@angular/material';

export class MatPaginatorIntl extends BaseMatPaginatorIntl {

  itemsPerPageLabel = '每页显示';
  nextPageLabel = '下一页';
  previousPageLabel = '上一页';
  firstPageLabel = '首页';
  lastPageLabel = '尾页';

  getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return '0 od ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return '第' + (startIndex + 1) + ' - ' + endIndex + '条，共' + length + '条';
  };

}
