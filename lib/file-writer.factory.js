function FileWriterFactory(FileWriter, FileWriterHooks) {

    this.makeFileWriter = function(generatorName) {
        return new FileWriter(generatorName, FileWriterHooks);
    }

}

module.exports = FileWriterFactory;