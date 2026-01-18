import { fileUpload } from "../../src/helpers/fileUpload";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dprncvzwq",
  api_key: "369443553593912",
  api_secret: "oJ-QCCKa7dV5FLa7k0ZQ5AbSbOk",
  secure: true,
});

describe("Pruebas en fileUpload", () => {
  test("Debe de subir el archivo correctamente en cloudinary", async () => {
    const imageUrl =
      "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png";
    const resp = await fetch(imageUrl);
    //devolvemos una imagen de la url
    const blob = await resp.blob();
    // creamos el blob con la respuesta (blob = objeto binario grande)
    const file = new File([blob], "foto.jpg");
    // nuestro nuevo archivo se llamara foto.jpg
    const url = await fileUpload(file);
    // subimos foto.jpg , la respuesta seria la url de la foto subida
    expect(typeof url).toBe("string");

    //borrar la foto subida

    const segments = url.split("/"); // dividimos el url en '/'
    const imageId = segments[segments.length - 1].replace(".png", "");
    // buscamos el ultimo segmento y le borramos la extension

    const cloudinaryResponse = await cloudinary.api.delete_resources([
      "journal/" + imageId,
    ]);
    //borramos la imagen con el SDK de cloudinary
  });
  test("debe de retornar null", async () => {
    const file = new File([], "foto.jpg");
    // nuestro nuevo archivo se llamara foto.jpg , lo creamos vacio sin nada
    const url = await fileUpload(file);
    // subimos foto.jpg , la respuesta seria la url de la foto subida
    expect(url).toBe(null);
    // si devuelve null es el error que estabamos buscando
  });
});
