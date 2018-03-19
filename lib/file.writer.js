const fs = require('fs');

function FileWriter(generatorName, fileWriterHooks) {

    this.writeFile = function(path, fileContents) {
        if(!fileExists()) {
            var transformentContent = filewrtierHooks.runGeneratorHooks(generatorName, path, file);
        }
    }


}


module.exports = FileWriter;