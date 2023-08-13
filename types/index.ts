export type Option = {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
};

export interface DataTableSearchableColumn<TData> {
  id: keyof TData;
  title: string;
}
