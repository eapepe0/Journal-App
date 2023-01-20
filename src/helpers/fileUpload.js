export const fileUpload = async (file) => {
  if (!file) throw new Error("No tenemos ningun archivo que subir"); // si no existe ningun archivo

  const cloudUrl = " https://api.cloudinary.com/v1_1/dprncvzwq/upload"; // url donde vamos a subir

  const formData = new FormData(); // creamos el formData
  formData.append("upload_preset", "react-journal"); // le agregamos el upload_preset y el valor sera react_journal
  formData.append("file", file);

  try {
    // si todo sale bien
    const resp = await fetch(cloudUrl, {
      method: "POST", // hacemos un fetch con el metodo post
      body: formData, // y en el body metemos el formData que creamos arriba
    });

    if (!resp.ok) throw new Error("No se pudo subir la imagen"); // si la respuesta no es correcta mostramos un mensaje de error

    const cloudResp = await resp.json(); //guardamos la respuesta

    return cloudResp.secure_url; // devolvemos la url generada de la imagen
  } catch (error) {
    // si hubo algun error

    throw new Error(error.message); // tiramos un error con su mensaje
  }
};

/** ASI SERIA LA RESPUESTA
|--------------------------------------------------
| {
    "asset_id": "9da04b7a325b0157a95f74316b490698",
    "public_id": "journal/xkfnhb3o3jj2khahhq0n",
    "version": 1674103552,
    "version_id": "2105dc68e8d4c89882bb0dab45302c73",
    "signature": "3096a6e0b125342d51bc80ef4357ba50fc72a2fd",
    "width": 1080,
    "height": 1350,
    "format": "jpg",
    "resource_type": "image",
    "created_at": "2023-01-19T04:45:52Z",
    "tags": [],
    "bytes": 154230,
    "type": "upload",
    "etag": "65ee7d50d4e730cc3d0dc16c901fb886",
    "placeholder": false,
    "url": "http://res.cloudinary.com/dprncvzwq/image/upload/v1674103552/journal/xkfnhb3o3jj2khahhq0n.jpg",
    "secure_url": "https://res.cloudinary.com/dprncvzwq/image/upload/v1674103552/journal/xkfnhb3o3jj2khahhq0n.jpg",
    "folder": "journal",
    "access_mode": "public",
    "original_filename": "magui_ansuz_189618247_157852862975224_1110260809486095674_n"
}
|--------------------------------------------------
*/
