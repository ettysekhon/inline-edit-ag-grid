import { useCallback, useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  CellValueChangedEvent,
  ColDef,
  ColGroupDef,
  DefaultMenuItem,
  GetContextMenuItemsParams,
  GetRowIdParams,
  GridOptions,
  GridReadyEvent,
  MenuItemDef,
} from "ag-grid-community";
import { colorSchemeDark, themeQuartz } from "ag-grid-community";
import { Mode, ModeType, Theme, ThemeType } from "@/types";

export interface DataGridProps<TData> {
  columns: (ColDef<TData> | ColGroupDef<TData>)[];
  data?: TData[];
  onRowClick?: (row: TData) => void;
  onDataChange?: (newData: TData[]) => void;
  getRowId?: (params: GetRowIdParams<TData>) => string;
  mode?: ModeType;
  gridOptionsOverride?: Partial<GridOptions<TData>>;
  theme?: ThemeType;
}

export function DataGrid<TData>({
  columns,
  data,
  onRowClick,
  onDataChange,
  getRowId,
  mode = Mode.CLIENT,
  gridOptionsOverride,
  theme = Theme.LIGHT,
}: DataGridProps<TData>) {
  const gridRef = useRef<AgGridReact<TData>>(null);

  const defaultColDef = useMemo<ColDef<TData>>(
    () => ({
      filter: true,
      minWidth: 100,
      resizable: true,
      sortable: true,
      flex: 1,
    }),
    []
  );

  const customParams = useMemo(
    () => ({
      accentColor: "hsl(var(--primary))",
      backgroundColor: "hsl(var(--background))",
      borderColor: "hsl(var(--border))",
      foregroundColor: "hsl(var(--foreground))",
    }),
    []
  );

  const gridTheme = useMemo(() => {
    let baseTheme = themeQuartz;
    if (theme === "dark") {
      baseTheme = baseTheme.withPart(colorSchemeDark);
    }
    return baseTheme.withParams(customParams);
  }, [theme, customParams]);

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
        rowData={mode === Mode.CLIENT ? data : undefined}
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
          onRowClick
            ? (event) => event.data && onRowClick(event.data)
            : undefined
        }
        rowModelType={mode === Mode.SERVER ? "serverSide" : "clientSide"}
        autoSizeStrategy={{ type: "fitCellContents" }}
        getRowId={getRowId}
        {...gridOptionsOverride}
      />
    </div>
  );
}
