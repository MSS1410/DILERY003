const Project = require('../models/project')
const User = require('../models/user')
const Studio = require('../models/studio')

// crear nuevo proyecto.

const createProject = async (req, res) => {
  try {
    const { name, description, studio, exhibitions } = req.body
    const userId = req.user.id
    // check existencia studio

    const checkStudio = await Studio.findById(studio)
    if (!checkStudio) {
      return res.status(404).json({ message: 'CANT FIND STUDIO' })
    }
    //genero proyecto nuevo

    const newProject = new Project({
      name,
      description,
      studio,
      exhibitions,
      artist: userId,
      postDate: new Date()
    })
    const savedProject = await newProject.save()
    // enlazare el proyecto con el usuario y el studio en cuestion
    await User.findByIdAndUpdate(userId, {
      $push: { projects: savedProject._id }
    })
    await Studio.findByIdAndUpdate(studio, {
      $push: { works: savedProject._id }
    })
    // ok json
    return res
      .status(201)
      .json({ message: 'OK LOAD PROJECT ', project: savedProject })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: ' CREATION NOT OK' })
  }
}

//obtenr todos los projects

const getAllProjects = async (req, res) => {
  try {
    const allProjects = await Project.find()
      .populate('artist', 'name email') // reemplazo el ID del artista por sus campos name email
      //Busca el documento completo de la cole User con el ObjectId almacenado en artist
      //Solo devuelve los campos name y email
      .populate('studio', 'name location')
      // busco docu cmpleto en cole Studio y saco respuesta name y ubi, es solo para no devolver datos de mas
      .populate('exhibitions', 'name location')

    return res.status(200).json(allProjects)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'NO OK FULL PROJECTS' })
  }
}

// proyecto x ID

const getProjectsById = async (req, res) => {
  try {
    const { id } = req.params
    const projectId = await Project.findById(id) // aqui buscaremos uno especifico por ID aplico igual
      // el popu y solo saco lo que me interesa
      .populate('artist', 'name email')
      .populate('studio', 'name location')
      .populate('exhibitions', 'name location')
    if (!projectId) {
      return res.status(404).json({ message: 'NO OK FIND BY ID' })
    }
    return res.status(200).json(projectId)
  } catch (error) {
    return res
      .status(500)
      .json({ message: `NO OK SHOW PROJECT:${error.message}` })
  }
}

//actualizar proyecto

const updateProject = async (req, res) => {
  try {
    const { id } = req.params
    const actProject = await Project.findByIdAndUpdate(id, req.body, {
      new: true
    })
    if (!actProject) {
      return res.status(404).json({ message: 'NO OK FIND PROJECT' })
    }
    return res
      .status(200)
      .json({ message: 'OK ACT PROJECT', project: actProject })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'NO OK ACT PROJECT' })
  }
}

// DELETEEE

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params
    const elimProject = await Project.findByIdAndDelete(id)
    if (!elimProject) {
      return res.status(404).json({ message: 'NO OK FIND PROJECT' })
    }
    //metodo $pull elimina valor especifico de un array en MongoDB
    // debo elminarlo de sus relacionados
    await User.findByIdAndUpdate(elimProject.artist, {
      $pull: { projects: elimProject._id }
      // metodo pull para asegurarme de que en mis referencias los cambios tamvbien se han realizado,
      // para eliminarlo de otras colecciones //elimProject.artist = busca al usuario asociado al proyecto y elimina el ID del proyecto de su arrat projects
    })
    await Studio.findByIdAndUpdate(elimProject.studio, {
      $pull: { works: elimProject._id }
      //busca studio asociado a id de elimPrject, y elimina Id de array works
    })
    return res
      .status(200)
      .json({ message: 'OK DELETE PROECT', project: elimProject })
    // dentro del campo project devolvere el proyecto Eliinado.
    // podria enviarlo nomral pero asi le pongo mensajito sae
  } catch (error) {
    return res.status(500).json({ message: 'NO OK DELETIN PROJECT' })
  }
}

module.exports = {
  createProject,
  getAllProjects,
  getProjectsById,
  updateProject,
  deleteProject
}
