const fs = require("fs");
var appRoot;

function GeneratorFactory(root, fileWriterFactory, fileWriterHooks) {
    appRoot = root;

    this.buildGenerator = function(generatorSpec) {

        if( typeof generatorSpec == "string") {
            return createGeneratorFromString(generatorSpec);
        } else if (typeof generatorSpec == "object") {
            return createGeneratorFromObject(generatorSpec);
        }
    }

    function createGeneratorFromString(generatorName) {
        let Generator = requireGenerator(generatorName);
        let toReturn = {};
        var fileWriter = fileWriterFactory.makeFileWriter(generatorName);
        toReturn[generatorName] = new Generator(null, fileWriter);
    
        return toReturn;
    }
    
    function createGeneratorFromObject(generatorInfo) {
        let name = generatorInfo.name;
        let specCopy = {...generatorInfo.spec};
        let Generator = requireGenerator(name);
        var fileWriter = makeFileWriter(generatorName);
        toReturn[name] = new Generator(specCopy, fileWriter);
        return toReturn;
    }

    function makeFileWriter(generatorName) {
        return fileWriterFactory.makeFileWriter(generatorName);
    }
    
    function requireGenerator(generatorName) {
    
        if(isLocalModule(generatorName)) {
            return requireLocalFile(generatorName);
        }
    
        return requireModule(generatorName);
    
    }
    
    function isLocalModule(generatorName) {
    
        return generatorName.substring(0,1) === ".";
    }
    
    function requireLocalFile(generatorName) {
    
    
        return require(fs.realpathSync(appRoot + "/" + generatorName));
    }
    
    function requireModule(generatorName) {
    
        return require(generatorName);
    }



    function hookHooks(generator) {

        if(generate.hasHooks()) {
            resgisterHooks(generator);
        }
    }

    function registerHooks(generator) {
        generator.registerHooks(function(hook) {
            fileWriterHooks.registerHook(hook);
        })
    }
    
}




module.exports = GeneratorFactory;