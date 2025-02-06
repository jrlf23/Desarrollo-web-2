import { useEffect, useState } from "react";

// Clave de API para acceder a OMDb
export const API_KEY = "458f759f";

/**
 * Hook personalizado para obtener películas desde la API de OMDb.
 * @param {string} query - Término de búsqueda ingresado por el usuario.
 * @returns {Object} - Retorna un objeto con:
 *  - movies: Lista de películas encontradas.
 *  - isLoading: Estado de carga de la solicitud.
 *  - error: Mensaje de error en caso de fallo.
 */
export function useFetchMovies(query) 
{
    // Estado para almacenar las películas obtenidas
    const [movies, setMovies] = useState([]);

    // Estado para indicar si la solicitud está en curso
    const [isLoading, setIsLoading] = useState(false);

    // Estado para manejar errores
    const [error, setError] = useState("");

    useEffect(() => 
    {
        // Si la búsqueda tiene menos de 3 caracteres, limpiar resultados y error
        if (query.length<3)
        {
            setMovies([]);
            setError("");
            return;
        }

        /**
         * Funcion asincronica que obtiene las peliculas de la API
         */

        async function fetchMovies()
        {
            try
            {
                setIsLoading(true); //Inicia el estado de carga
                setError(null); //Reinicia errores previos

                //Peticion a la API de OMDb con la clave de acceso y la consulta
                const response = await
                fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`)

                // Verifica si la respuesta HTTP es correcta
                if (!response.ok)
                    throw new Error("Error al cargar peliculas");
                const data= await response.json();

                //Si la API responde con un error, lanza una excepcion 
                if (data.Response==="False")
                    throw new Error ("No se encontraron resultados");

                //Guarda las peliculas obtenidas en el estado
                setMovies(data.Search);
            }
            catch(err)
            {
                //Manejo de errores: guardar el mensaje de error y limpiar la lista de peliculas
                setError(err.message);
                setMovies([])
            }
            finally
            {
                setIsLoading(false); //Finaliza el estado de carga
            }
        }
        //LLamar la funcion para obtener los datos
        fetchMovies();
    },
    [query]);//Se ejecuta cada vez que cambia de consulta (query)

    // Retorna los valores necesarios para un uso en componentes
    return {movies, isLoading, error};
}
