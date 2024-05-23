import fs from 'fs';

interface SaveFileUseCase {

    execute: ( options:Options ) => boolean;

}

interface Options {
    fileContent : string;
    fileDestination?: string;
    fileName?   : string;
}

export class SaveFile implements SaveFileUseCase {

    constructor() {
        /* repository: StorageRepository */
    }

    execute({ 
        fileContent, 
        fileDestination = 'outputs', 
        fileName = 'table'
    }: Options ): boolean {

        try {

            fs.mkdirSync( fileDestination, { recursive: true } );
            fs.writeFileSync( `${ fileDestination }/${ fileName }.txt`, fileContent );
            
            return true;
            
        } catch (error) {
            console.error( error );
            return false;   
        }

    }

}