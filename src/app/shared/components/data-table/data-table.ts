// service传参接口
export interface DataTableInput {
    className: string;
}

export interface DataTableOption {
    key: string;
    name: string;
    type: string;
    operate: {
        create: {
            enabled?: boolean; // 新增启用
        };
        update: {
            enabled?: boolean; // 修改启用
        };
        query: {
            enabled?: boolean; // 查询启用
            orderBy?: number;  // 排序
        };
    };
}

// app-data-table标签参数接口
export interface DataTable {
    className: string;
    options: DataTableOption[];
}
