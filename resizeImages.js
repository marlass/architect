const sharp = require('sharp');

const fs = require( 'fs-extra' );
const path = require( 'path' );
const glob = require('glob');

glob( './app/public/uploads/**/*.+(jpeg|jpg|png|tiff|webp|svg|gif)', function( err, files ) {
    if ( err ) {
        console.error( "Could not list the directory.", err );
        process.exit( 1 );
    } 

    files.forEach( function ( file, index ) {
        console.log(file);
        const newFile = file.replace('./app/public/uploads/', './app/public/uploads_resized/');
        console.log(newFile);
        fs.copySync(path.resolve(__dirname,file), newFile);

        fs.stat( file, function ( error, stat ) {
            if ( error ) {
                console.error( "Error stating file.", error );
                return;
            }

            if ( stat.isFile() ) {
                sharp(file)
                    .resize(200,200)
                    .toFile(newFile, function(err, info) {
                    })
            }
            else if ( stat.isDirectory() ) {
                console.log( "'%s' is a directory.", file );
            }
        })
    })
})
