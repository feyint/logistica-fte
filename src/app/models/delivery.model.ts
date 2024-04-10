export interface Delivery {
    id?: number;
    tipoProducto: string;
    cantidad: number;
    fechaRegistro: Date | string;
    fechaEntrega: Date | string;
    direccionEntrega: string;
    precioEnvio: number;
  }