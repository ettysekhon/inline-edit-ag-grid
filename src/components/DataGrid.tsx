import type {
  CellValueChangedEvent,
  ColDef,
  ColGroupDef,
  DefaultMenuItem,
  GetContextMenuItemsParams,
  GridOptions,
  GridReadyEvent,
  MenuItemDef,
} from "ag-grid-community";
import { colorSchemeDark, themeQuartz } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useMemo, useRef } from "react";

export interface DataGridProps<TData> {
  columns: (ColDef<TData> | ColGroupDef<TData>)[];
  data?: TData[];
  onRowClick?: (row: TData) => void;
  onDataChange?: (newData: TData[]) => void;
  mode?: "client" | "server";
  gridOptionsOverride?: Partial<GridOptions<TData>>;
  theme?: "light" | "dark";
}

export function DataGrid<TData>({
  columns,
  data,
  onRowClick,
  onDataChange,
  mode = "client",
  gridOptionsOverride,
  theme = "light",
}: DataGridProps<TData>) {
  const gridRef = useRef<AgGridReact<TData>>(null);

  const defaultColDef = useMemo<ColDef<TData>>(
    () => ({
      filter: true,
      minWidth: 100,
      resizable: true,
      sortable: true,
    }),
    []
  );

  const gridTheme = useMemo(() => {
    return theme === "dark"
      ? themeQuartz.withPart(colorSchemeDark)
      : themeQuartz;
  }, [theme]);

  const getContextMenuItems = useCallback(
    (
      params: GetContextMenuItemsParams<TData>
    ): (DefaultMenuItem | MenuItemDef<TData>)[] => {
      const items: (DefaultMenuItem | MenuItemDef<TData>)[] = [
        "copy",
        "copyWithHeaders",
        "paste",
      ];
      if (params.node && onDataChange) {
        items.push({
          action: () => {
            if (params.node?.data) {
              params.api.applyTransaction({ remove: [params.node.data] });
              const newData: TData[] = [];
              params.api.forEachNode((node) => {
                if (node.data) newData.push(node.data);
              });
              onDataChange(newData);
            }
          },
          icon: '<span class="ag-icon ag-icon-cross"></span>',
          name: "Delete Row",
        });
      }
      return items;
    },
    [onDataChange]
  );

  const handleCellValueChanged = useCallback(
    (event: CellValueChangedEvent<TData>) => {
      if (onDataChange) {
        const newData: TData[] = [];
        event.api.forEachNode((node) => {
          if (node.data) newData.push(node.data);
        });
        onDataChange(newData);
      }
    },
    [onDataChange]
  );

  return (
    <div className="w-full h-full">
      <AgGridReact<TData>
        ref={gridRef}
        theme={gridTheme}
        rowData={mode === "client" ? data : undefined}
        columnDefs={columns}
        defaultColDef={defaultColDef}
        animateRows={true}
        enableCellTextSelection={true}
        getContextMenuItems={getContextMenuItems}
        onGridReady={(params: GridReadyEvent) => {
          params.api.sizeColumnsToFit({ defaultMinWidth: 100 });
        }}
        onCellValueChanged={handleCellValueChanged}
        onRowClicked={
          onRowClick ? (event) => event.data && onRowClick(event.data) : undefined
        }
        rowModelType={mode === "server" ? "serverSide" : "clientSide"}
        autoSizeStrategy={{
          type: 'fitCellContents',
        }}
        {...gridOptionsOverride}
      />
    </div>
  );
}
