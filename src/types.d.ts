export interface ControleCaja {
  id: string;
  cambio: any;
  total: number;
  total_efectivo: number;
  total_otros: number;
  total_al_cierre_efectivo: number;
  total_al_cierre_total: number;
  fecha_inicio: string;
  fecha_cierre: string;
  num: number;
  state_open: boolean;
  state?: boolean;
  created_at?: string;
  updated_at?: string;
  id_empresa?: string;
  id_user?: string;
  fecha_inicio_render?: string;
  fecha_cierre_render?: string;
  saldo_inicial?: number;
}

export interface NotificationApp {
  id: string;
  title: string;
  message: string;
  created_at: string;
  recipients?: {
    id_user: string;
    status: string;
  }[];
  type: string;
  rol: string;
  id_empresa?: string;
  status: string;
  seen: boolean;
}

export interface ResumenCaja {
  saldo_inicial: number;
  total_efectivos: number;
  total_otros: number;
  total: number;
}

export interface Caja {
  id: string;
  fecha_inicio: string;
  hora_inicio: string;
  cambio: string;
  total: string;
  cantidad_pedidos: string;
  first_pedido_num: string;
  last_pedido_num: string;
  fecha_cierre: string;
  hora_cierre: string;
  num: next_numero;
  state?: boolean;
  id_user: string;
  created_at?: string;
  updated_at?: string;
  state_open?: boolean;
  cierre: string;
}

export interface AmbPre {
  id?: string;
  nombre: string;
  id_type: string;
  state?: bool;
  id_empresa?: string;
}

export interface Producto {
  id: string;
  id_cat: string;
  tiempo_de_preparacion: number;
  codigo: string;
  type: string;
  nombre: string;
  precio_de_compra: string;
  precio_de_venta: string;
  descripcion: string;
  id_type_amd_pre: string;
  id_empresa?: string;
  id_proveedor?: string;
  use_receta?: string;
  created_at?: string;
  updated_at?: string;
  state?: string;
  url_img?: string;
  icono_color?: string;
  icono?: string;
  view_web: boolean;
  type_stock: string;
  unidad?: string;
  use_stock: boolean;
  cantidad: number;
  vender_sin_stock: boolean;
  cantidad_minima_stock?: number;
  use_cantidad_minima_stock?: boolean;
  proveedor_render?: string;
  categoria_render?: string;
  unidad_render?: string;
  use_img_act?: boolean;
}

export interface MedioDePago {
  id: string;
  nombre: string;
  description?: string;
}

export interface Delivery {
  id: string;
  nombre: string;
  description?: string;
}

export interface VentaTable {
  bg: string;
  id: string;
  cliente: string;
  total: string;
  fecha: string;
  num: number;
  estado: string;
  state: boolean;
  status_act?: string;
}

export interface PagoTable {
  id_venta: string;
  bg: string;
  id: string;
  state: boolean;
  cliente: string;
  total: string;
  fecha: string;
  num: string;
  medio: string;
}

export interface MovimientoCCTable {
  id: string;
  bg: string;
  cliente: string;
  total: string;
  fecha: string;
  tipo: string;
  referencia: string;
  descripcion: string;
}

export interface Cliente {
  full_cliente?: string;
  id: string;
  nombre: string;
  apellido: string;
  direccion: string;
  ciudad: string;
  telefono: string;
  email: string;
  dni: string;
  state?: string;
  id_empresa?: string;
  created_at?: string;
  updated_at?: string;
  estado_cc?: string | null;
  saldo?: number | null;
  saldo_render?: number | null;
  use_cc?: boolean;
  id_cc?: string;
}

export interface Venta {
  id: string;
  type: string;
  valor: number;
  valor_final: number;
  descuento_total: number;
  agregado_total: string;
  type_descuento: string;
  type_agregado: string;
  coin: string;
  numero: number;
  id_cliente: string;
  description: string;
  status_act: string;
  state?: boolean;
  id_act_mesa?: string;
  id_empresa?: string;
  id_caja: string;
  id_user?: string;
  id_empleado?: string;
  fecha_de_emision?: string;
  created_at?: string;
  updated_at?: string;
  valor_final_ganacias?: number;
  status_pagada?: boolean;
  costo_de_envio: number;
  direccion_de_envio: string;
  telefono: string;
  status_act_delivery: string;
  id_cc?: string;

  //render
  status_act_render?: string;
  valor_final_render?: string;
  full_cliente?: string;
  nombre_empleado?: string;
  pagos?: Pago[];
  productos?: ProductoVenta[];
}

export interface Pagos {
  id: string;
  coin: string;
  id_cliente: string;
  medio: string;
  type: string;
  description: string;
  valor: number;
  valor_final: number;
  id_caja: string;
  id_user?: string;
  state?: boolean;
  created_at?: string;
  updated_at?: string;
  id_empresa?: string;
  id_venta?: string;
  fecha_de_emision?: string;
  num: number;
}

export interface DesAgre {
  descuento?: string;
  agregado?: string;
  type_descuento?: string;
  type_agregado?: string;
}

export interface ProductoVenta {
  id: string;
  id_venta: string;
  id_producto: string;
  price_unidad: number;
  price_final_unidad: number;
  price_final: number;
  cantidad: number;
  description: string;
  comentario: string;
  status_act: string;
  descuento?: number;
  agregado?: number;
  type_descuento?: string;
  type_agregado?: string;
  status_pagado?: boolean;
  otros_agregados?: number;
  state?: boolean;
  ganacias_estimadas?: number;
  cantidad_pagada?: number;
  id_type_amd_pre: string;
  created_at?: string;
  use_stock: boolean;
}

export interface MovimientosCC {
  id_movimiento: string;
  id_cc: string;
  tipo_movimiento: string;
  monto: string;
  descripcion: string;
  referencia: string;
  id_empresa?: string;
  created_at?: string;
}

export interface Pago {
  id: string;
  coin: string;
  id_cliente: string;
  medio: string;
  type: string;
  description: string;
  valor: number;
  valor_final: number;
  id_caja: string;
  id_user?: string;
  id_cc?: string;
  state?: boolean;
  created_at?: string;
  updated_at?: string;
  id_empresa?: string;
  id_venta?: string;
  status_use?: boolean;
}

export interface Mesa {
  id: string;
  numero: string;
  pos_x: number;
  pos_y: number;
  id_habitacion: string;
  state?: booleean;
}

export interface Habitacion {
  id: string;
  zoom: string;
  id_caja: string;
  nombre: string;
  id_empresa: string;
  state?: boolean;
}

export interface FormMesa {
  pos_x: number;
  pos_y: number;
  id_habitacion: string;
}

export interface ActMesa {
  id: string;
  id_empresa?: string;
  id_mesa: string;
  id_cliente?: string;
  status_act: string;
  description: string;
  cantidad_de_clientes: string;
  state?: string;
  fecha_de_emision: string;
  created_at?: string;
  updated_at?: string;
  nombre_cliente?: string;
  apellido_cliente?: string;
  full_cliente?: string;
  fecha_de_emision_render?: string;
}

export interface Gasto {
  id: string;
  monto: number;
  fecha: string;
  descripcion: string;
  id_medio_de_pago: string;
  id_caja?: string;
  id_proveedor?: string;
  id_categoria?: string;
  type_comprobante?: string;
  num_comprobante: number | null;
  use_arqueo?: boolean;
  state?: boolean;
  id_empresa?: string;
  id_user?: string;
  proveedor?: string;
  categoria?: string;
  medio?: string;
  fecha_render?: string;
}

export interface Ingrediente {
  id: string;
  nombre: string;
  unidad: stirng; //L, KG, UNIDAD
  costo: number;
  id_proveedor?: string;
  id_categoria?: string;
  merma?: number;
  id_empresa?: string;
  description?: string;
  state?: boolean;
}

export interface Proveedor {
  id: string;
  nombre: string;
  num_tributario: number | null;
  email: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  descripcion: string;
  state?: boolean;
  id_empresa?: string;
}

export interface CatGastos {
  id: string;
  nombre: string;
  state?: boolean;
  id_empresa?: string;
}

export interface CatIngredientes {
  id: string;
  nombre: string;
  state?: boolean;
  id_empresa?: string;
}

export interface CatProductos {
  id: string;
  nombre: string;
  state?: boolean;
  id_empresa?: string;
}

export interface IngredienteReceta {
  id_ingrediente: string;
  ingrediente?: string;
  id_receta: string;
  cantidad: number;
  des_cantidad: string;
}

export interface ProcedimientoReceta {
  id: string;
  id_receta: string;
  orden: number;
  description: string;
}

export interface Receta {
  id: string;
  id_producto: string;
  producto?: string;
  rendimiento_cantidad: string;
  rendimiento_unidad: string;
  num_porciones: string;
  tamanio_porciones: string;
  comentario_detalle: string;
  ingredientes: IngredienteReceta[];
  tiempo_de_preparacion: string;
  tiempo_de_coccion: string;
  procedimientos: ProcedimientoReceta[];
  presentacion: string;
  notas_adicionales: string;
  equipamiento_necesario: string;
  id_categoria?: string;
  state?: boolean;
  created_at?: string;
  updated_at?: string;
}
