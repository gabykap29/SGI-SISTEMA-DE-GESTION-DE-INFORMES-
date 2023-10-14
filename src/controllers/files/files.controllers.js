const { rmSync } = require('fs');
const Files = require('../../models/Files');
const Informe = require('../../models/Informe');
const fs = require('fs');
const ctrlFiles = {};

ctrlFiles.create = async(req,res)=>{
    const {rutaImagen} = req.file;
    const {descriptions} = req.body;
    const {id}= req.params;
    try {
        
        const informe = await Informe.findByPk(id);
        if(!informe){
            return res.status(404).json({message:'Error al obtener el informe!'})
        };
        let filename = `/uploads/${req.file.filename}`
        console.log(filename)
        const newFile = await Files.create({
            filesRoute: filename,
            descriptions:descriptions
        });

        if(!newFile){
            return res.status(400).json({message:'Error al subir la imagem, verifique que la imagen tenga un formato correcto!'})
        };

        await informe.addFiles(newFile);
        return res.json(newFile);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error interno del servidor!'})
    }
};

ctrlFiles.destroy = async(req,res)=>{
    const {id} = req.params;
    try {
        
        const File = await Files.findByPk(id);
        if(!File){
            return res.status(404).json({message:'La imagen no existe!'})
        };
        const fileDeleted = await File.destroy(id);
        const deleted =  fs.unlink(File.filesRoute);
        console.log(deleted);
        if(!fileDeleted && !deleted){
            return res.status(400).json({message:'Error al eliminar la imagen o archivo! Comuniquese con su Administrador!'})
        };
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Error interno del servidor!'})
    }
};

module.exports = ctrlFiles;