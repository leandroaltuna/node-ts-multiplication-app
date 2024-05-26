import { yarg } from "./config/plugins/args.plugin";


// console.log( process.argv );
// console.log( yarg.b );


/* Funcion anonima autoinvocada */
/* // Exmaple 1:
(() => {
    console.log( 'Ejecutado' );
})(); */

/* // Example 2:
( async() => {
    await main();
    console.log( 'End of program' );
})();

async function main() {
    console.log( 'Ejecutado' );
} */

/* Usando Yarg */
/* 
( async() => {
    await main();
})();

async function main() {
    console.log( yarg ) ;
} */

// Refactorizar 
import { ServerApp } from "./presentation/server-app";

( async() => {
    await main();
})();

async function main() {

    const { b:base, l:limit, s:showTable, n:fileName, d:fileDestination } = yarg

    ServerApp.run({ base, limit, showTable, fileName, fileDestination });

}