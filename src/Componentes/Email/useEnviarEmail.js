import emailjs from "@emailjs/browser";

const SERVICE_ID  = "service_otg35qc";
const TEMPLATE_ID = "template_d84h019";
const PUBLIC_KEY  = "WfikrjUHokUyox_C2";

export function useEnviarEmail() {

    //Espera estos parametros de resumen compra
  const enviarConfirmacion = async ({ emailUsuario, productos, total, numeroPedido }) => {

    //Estos datos se distribuyen en el template del correo
    const templateParams = {
      email_usuario:  emailUsuario,
      //Convierte los datos en texto legible
      productos:      productos.map(p => `${p.nombre} x${p.cantidad}`).join(", "),
      total:          total,
      numero_pedido:  numeroPedido,
      name:           emailUsuario,
    };

    //Llamamos a emailjs y le enviamos los datos necesarios
    //Service id, templateID, los parametro y la public key
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
  };

  //Enviamos la herramienta para poder ser usada en otro sitio
  return { enviarConfirmacion };
}