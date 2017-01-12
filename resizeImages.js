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
        const newFile200 = file.replace('./app/public/uploads/', './app/public/uploads_resized_200/');
        const newFile320 = file.replace('./app/public/uploads/', './app/public/uploads_resized_320/');
        const newFile640 = file.replace('./app/public/uploads/', './app/public/uploads_resized_640/');
        const newFile960 = file.replace('./app/public/uploads/', './app/public/uploads_resized_960/');
        const newFile1024 = file.replace('./app/public/uploads/', './app/public/uploads_resized_1024/');
        const newFile1280 = file.replace('./app/public/uploads/', './app/public/uploads_resized_1280/');
        const newFile1600 = file.replace('./app/public/uploads/', './app/public/uploads_resized_1600/');
        const newFile1920 = file.replace('./app/public/uploads/', './app/public/uploads_resized_1920/');
        const newFile3840 = file.replace('./app/public/uploads/', './app/public/uploads_resized_3840/');
        if (fs.existsSync(newFile200)) {
            return;
        }
        fs.copySync(path.resolve(__dirname,file), newFile200);
        fs.copySync(path.resolve(__dirname,file), newFile320);
        fs.copySync(path.resolve(__dirname,file), newFile640);
        fs.copySync(path.resolve(__dirname,file), newFile960);
        fs.copySync(path.resolve(__dirname,file), newFile1024);
        fs.copySync(path.resolve(__dirname,file), newFile1280);
        fs.copySync(path.resolve(__dirname,file), newFile1600);
        fs.copySync(path.resolve(__dirname,file), newFile1920);
        fs.copySync(path.resolve(__dirname,file), newFile3840);


        fs.stat( file, function ( error, stat ) {
            if ( error ) {
                console.error( "Error stating file.", error );
                return;
            }

            if ( stat.isFile() ) {
                sharp(file)
                    .resize(200,16000)
                    .max()
                    .toFile(newFile200, function(err, info) {
                    })
                sharp(file)
                    .resize(320,16000)
                    .max()
                    .toFile(newFile320, function(err, info) {
                    })
                sharp(file)
                    .resize(640,16000)
                    .max()
                    .toFile(newFile640, function(err, info) {
                    })
                sharp(file)
                    .resize(960,16000)
                    .max()
                    .toFile(newFile960, function(err, info) {
                    })
                sharp(file)
                    .resize(1024,16000)
                    .max()
                    .toFile(newFile1024, function(err, info) {
                    })
                sharp(file)
                    .resize(1280,16000)
                    .max()
                    .toFile(newFile1280, function(err, info) {
                    })
                sharp(file)
                    .resize(1600,16000)
                    .max()
                    .toFile(newFile1600, function(err, info) {
                    })
                sharp(file)
                    .resize(1920,16000)
                    .max()
                    .toFile(newFile1920, function(err, info) {
                    })
                sharp(file)
                    .resize(3840,16000)
                    .max()
                    .toFile(newFile3840, function(err, info) {
                    })
            }
            else if ( stat.isDirectory() ) {
                console.log( "'%s' is a directory.", file );
            }
        })
    })
})
