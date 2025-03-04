Habit Tracker App

Basados en el libro de productividad creado por llamado Habitos Atomicos, hemos tomado la iniciativa de crear una aplicacion para que las personas puedan llevar un control de sus habitas y
asi poder cumplir sus objetivos y arreglar un poco la procrastinacion.

Dentro de este repositorio se encuentra el codigo fuente que se creo para desarrollar la aplicacion.

Para poder correr los archivos debe asegurarse de lo siguiente:

1. Tener instalado un IDE. Visual Studio Code podria ser una opcion.
2. Asegurarse de tener NodeJS y Express instalado y de igual manera incluir sus dependencias.
3. Asegurarse de tener instalado postman.
4. El archivo database.js se utiliza para conectar la aplicacion Express hacia la base de datos MongoDB donde los habitos seran guardados.
6. La aplicacion empezara a correr al correr el comando 'npm start'.
7. La aplicacion sera accesible en el localhost:3001/habits
8. Para agregar un habito debera enviar los datos en formato JSON, como en el ejemplo de abajo:
     {
         "title":"Habito de Ejercicio"
         "description":"realizar minimo 30 minutos de ejercicio al dia"
     }
     {
         "title":"Habito de practicar Hobbie"
         "description":"Practicar guitarra minimo 30 minutos al dia"
     }


Con esto sera suficiente para que sus habitos queden registrados en la base de datos.

Para cualquier duda, feedback, o reporte de bugs del software puede enviar un correo a 24004208@galileo.edu.
