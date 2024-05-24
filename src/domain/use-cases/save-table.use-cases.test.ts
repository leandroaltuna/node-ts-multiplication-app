import fs from 'fs';
import { SaveFile } from './save-table.use-cases';


describe('SaveFilesUseCase', () => {

  /*   // se ejecuta antes de los tests.
    beforeEach(() => {
        // Elimina la carpeta "outputs"
        fs.rmSync( 'outputs', { recursive: true } );

    }); */
    
    const customOptions = {
        fileContent: 'custom content',
        fileDestination: 'custom-outputs/file-destination',
        fileName: 'custom-table-name',
    }
    const customFilePath = `${ customOptions.fileDestination }/${ customOptions.fileName }.txt`;
    
    // se ejecuta desppues de los tests.
    afterEach(() => {
        // Elimina la carpeta "outputs".
        const outputFolderExists = fs.existsSync( 'outputs' );
        if ( outputFolderExists ) fs.rmSync( 'outputs', { recursive: true } );

        // Elimina la carpeta "custom-output"
        const customOutputFolderExists = fs.existsSync( customOptions.fileDestination );
        if ( customOutputFolderExists ) fs.rmSync( customOptions.fileDestination, { recursive: true } );

    });

    test('should save files with default values', () => {

       const saveFile = new SaveFile();
       const filePath = 'outputs/table.txt';
       const options = {
            fileContent: 'test content'
       }
    //    console.log( filePath );
       const result = saveFile.execute( options );
       const fileExists = fs.existsSync( filePath );
       const fileContent = fs.readFileSync( filePath, { encoding: 'utf-8' } );

       expect( result ).toBe( true );
       expect( fileExists ).toBeTruthy();
       expect( fileContent ).toBe( options.fileContent );

    });

    test('should save files with custom values', () => {

        const saveFile = new SaveFile();

        const result = saveFile.execute( customOptions );
        const fileExists = fs.existsSync( customFilePath );
        const fileContent = fs.readFileSync( customFilePath, { encoding: 'utf-8' } );

        expect( result ).toBe( true );
        expect( fileExists ).toBeTruthy();
        expect( fileContent ).toBe( customOptions.fileContent );

    });

    test('should return false if directory could not be created', () => {

        const saveFile = new SaveFile();

        const mkdirSpy = jest.spyOn( fs, 'mkdirSync' ).mockImplementation(() => {
            throw new Error( 'This is a custom error message from testing' );
        });

        const result = saveFile.execute( customOptions );

        expect( result ).toBe( false );

        // Restaura el mock a su estado original quitando el implementation.
        mkdirSpy.mockRestore();

    });

    test('should return false if file could not be created', () => {

        const saveFile =  new SaveFile();

        const writeFileSpy = jest.spyOn( fs, 'writeFileSync' ).mockImplementation(() => {
            throw new Error( 'This is a custom writing error message from testing' );
        });

        const result = saveFile.execute( customOptions );

        expect( result ).toBe( false );

        writeFileSpy.mockRestore();

    });


})