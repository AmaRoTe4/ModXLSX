export interface Roles {
  use_impresiones: {
    use: boolean;
    cierre_de_caja: boolean;
    comanda_cocina: boolean;
    comanda_general: boolean;
    rebico_de_pago: boolean;
    tickets_de_venta: boolean;
  };
  use_notificaciones: boolean;
  use_venta: {
    mostrador: {
      use: boolean;
      iniciar: boolean;
      editar: boolean;
      agregar_pagos: boolean;
      agregar_pagos_cc: boolean;
      agregar_productos: boolean;
      modificar_producto: boolean;
      remover_productos: boolean;
      pasar_estado_productos: boolean;
      cerrar: boolean;
    };
    mesas: {
      use: boolean;
      iniciar: boolean;
      editar: boolean;
      agregar_pagos: boolean;
      agregar_pagos_cc: boolean;
      agregar_productos: boolean;
      modificar_producto: boolean;
      remover_productos: boolean;
      pasar_estado_productos: boolean;
      cerrar: boolean;
    };
    delivery: {
      use: boolean;
      iniciar: boolean;
      editar: boolean;
      agregar_pagos: boolean;
      agregar_pagos_cc: boolean;
      agregar_productos: boolean;
      modificar_producto: boolean;
      remover_productos: boolean;
      pasar_estado_productos: boolean;
      cerrar: boolean;
      pasar_desde: {
        etapa_1: boolean;
        etapa_2: boolean;
        etapa_3: boolean;
        etapa_4: boolean;
      };
    };
  };
  use_cocina: {
    use: boolean;
    view: boolean;
    pasar_producto_por_los_estados: boolean;
    imprimir: boolean;
  };
  use_caja: {
    use: boolean;
    iniciar_cerrar: boolean;
    historicos: boolean;
    view_acciones_a_los_registros: {
      pagos: boolean;
      ventas: boolean;
      ventas_en_curso: boolean;
    };
    resumen_de_caja: boolean;
    cambio: boolean;
  };
  use_gastos: {
    use: boolean;
    resumen: boolean;
    emitir: {
      mercaderia: boolean;
    };
    categorias: boolean;
  };
  use_productos: {
    use: boolean;
    productos: {
      view: boolean;
      create: boolean;
      update: boolean;
      delete: boolean;
      masivo: boolean;
    };
    categorias_productos: {
      view: boolean;
      create: boolean;
      update: boolean;
      delete: boolean;
    };
    ingredientes: {
      view: boolean;
      create: boolean;
      update: boolean;
      delete: boolean;
    };
    categorias_ingredientes: {
      view: boolean;
      create: boolean;
      update: boolean;
      delete: boolean;
    };
    recetas: {
      view: boolean;
      create: boolean;
      update: boolean;
      delete: boolean;
    };
  };
  use_clientes: {
    use: boolean;
    view: boolean;
    masivo: boolean;
    editar: boolean;
    crear_cte: boolean;
    emitir: {
      pago: boolean;
      deuda: boolean;
    };
  };
  use_proveedores: {
    use: boolean;
    view: boolean;
    emitir_pago: boolean;
    emitir_deuda: boolean;
    crear: boolean;
    ediar: boolean;
    dar_de_baja: boolean;
  };
  use_estadisticas: {
    use: boolean;
    view: boolean;
    export: boolean;
  };
  use_config: {
    sesion: {
      view: boolean;
      edit: boolean;
    };
    tienda_online: {
      view: boolean;
      edit: boolean;
    };
    impresiones: {
      view: boolean;
      edit: boolean;
    };
    usuarios_y_roles: {
      view: boolean;
      edit: boolean;
    };
    configuraciones: {
      view: boolean;
      edit: boolean;
    };
    valores_de_empresa: {
      view: boolean;
      edit: boolean;
    };
  };
}
