export interface Transaccion {
  fecha: string;
  descripcion: string;
  monto: number;
}

export interface Movimiento {
  fecha: string;
  descripcion: string;
  tipo: string;
  monto: string; // String para formato moneda
  saldoAcumulado: string;
}

export interface BodyTable {
  render_valores: RenderElement[];
  statusOnClick: boolean;
  onClick: () => void;
  status?: boolean;
  title?: string;
  string_search?: string;
  isSelected?: boolean;
  bg?: string;
}

export interface Client {
  id: string; // UUID
  first_name: string;
  last_name: string;
  address: string;
  phone: string;
  state?: boolean;
  created_at?: string; // Date in string format
  updated_at?: string; // Date in string format
}

export interface TableUseDistribution {
  header_text: string;
  value: string;
}

export interface PropsSelect {
  key_value: any;
  title: string;
  error?: string;
  status_error?: boolean;
  onChange: (aux: any) => void;
  value: string;
  disabled?: boolean;
  options: { value: string; label: string }[];
}

export interface PropsInputText {
  title: string;
  status_error?: boolean;
  error?: string;
  onChange: (aux: any) => void;
  value: any;
  key_value: string;
  disabled?: boolean;
}

export interface PropsInputRadio extends PropsInputText {
  checked: boolean;
  name: string;
}

export interface ResponseUseForm<T> {
  loadingForm: boolean;
  valores: T;
  errores: FormErrors<T>;
  onChangeValores: ({ key, value }: { key: keyof T; value: any }) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<any>;
}

export interface RenderElement {
  text: string | JSX.Element;
  type?: "1" | "2"; //1 base, 2 btn
  onClick?: (aux: any) => any;
  color?: string;
}

export interface OptionSearchandle {
  label: string;
  value: string;
  values_search?: string[];
  status?: boolean;
}
