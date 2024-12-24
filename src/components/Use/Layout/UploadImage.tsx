import React, { useState } from 'react';
import { CLAVE_SERVER } from '../../../const/env';

interface UploadImageProps {
  uploadUrl: string; // URL del backend para subir archivos
  inputName?: string; // Nombre del input para los archivos
  buttonText?: string; // Texto del botón de subida
}

const UploadImage: React.FC<UploadImageProps> = ({
  uploadUrl,
  inputName = 'images[]',
  buttonText = 'Subir Archivos'
}) => {
  const [name, setName] = useState<string>('');
  const [responseMessage, setResponseMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const selected = name.length > 0

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    const fileInput = (event.target as HTMLFormElement).elements.namedItem(inputName) as HTMLInputElement;

    if (fileInput?.files) {
      Array.from(fileInput.files).forEach(file => {
        formData.append(inputName, file);
      });

      try {
        setLoading(true);
        const response = await fetch("" + uploadUrl, {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: CLAVE_SERVER,
            //token: tokenUser(),
          },
        });

        const result = await response.json();
        setResponseMessage('¡Subida exitosa!');
        console.log('Respuesta del servidor:', result);
      } catch (error) {
        console.error('Error al subir los archivos:', error);
        setResponseMessage('Error al subir los archivos. Inténtalo de nuevo.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md w-full flex flex-col gap-2 justify-center items-center">
      <form id="uploadForm" onSubmit={handleUpload} className="w-full space-y-4">
        <div className='w-full flex'>
          <input
            type="file"
            name={inputName}
            accept="image/*"
            multiple
            required
            onChange={(e) => setName((e.target.files?.[0]?.name) ?? "")}
            className="hidden"
            id="fileInput"
          />
          <label
            htmlFor="fileInput"
            className="w-full text-center p-10 text-white bg-neutral-500 hover:brightness-90 rounded-md cursor-pointer"
          >
            {selected ? name : "Seleccionar Archivos"}
          </label>
        </div>

        {selected && <button
          type="submit"
          className={`px-4 py-2 text-white w-full rounded-md ${loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
            }`}
          disabled={loading}
        >
          {loading ? 'Subiendo...' : buttonText}
        </button>}
      </form>

      {responseMessage && (
        <p className="mt-4 text-sm font-medium text-green-600">
          {responseMessage}
        </p>
      )}
    </div>
  );
};

export default UploadImage;
