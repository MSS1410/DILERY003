const Exhibition = require('../models/exhibition')
const User = require('../models/user')
const Studio = require('../models/studio')

// new expo
const createExpo = async (req, res) => {
  try {
    console.log('Request body recibido:', req.body)

    const { name, description, organizers, exhibitors, location } = req.body

    // check name
    const chekExpo = await Exhibition.findOne({ name })
    if (chekExpo) {
      return res.status(400).json({ message: 'USE OTHER NAME' })
    }
    // crea expo

    const newExpo = new Exhibition({
      name,
      description,
      organizers,
      exhibitors,
      location
    })
    const savedExpo = await newExpo.save()
    return res.status(201).json({
      message: 'Expo Ready',
      exhibition: savedExpo
    })
  } catch (error) {
    console.error('ERROR en createExpo:', error.message)
    return res.status(500).json({ message: 'ERROR NEW EXPO' })
  }
}

// all expo

const getAllExhibitions = async (req, res) => {
  try {
    const expos = await Exhibition.find()
      .populate('organizers', 'name email')
      .populate('exhibitors', 'name email')

    return res.status(200).json(expos)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'ERR FULL EXPOS' })
  }
}

// Id

const getExpoId = async (req, res) => {
  try {
    const { id } = req.params
    const expoId = await Exhibition.findById(id)
      .populate('organizers', 'name email')
      .populate('exhibitors', 'name email')

    if (!expoId) {
      return res.status(404).json({ message: 'CANNOT FIND EXPO' })
    }
    return res.status(200).json(expoId)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'CANNOT GET BY ID' })
  }
}
// sctualizar
// const updateExhibition = async (req, res) => {
//   try {
//     console.log('ID recibido:', req.params.id)
//     console.log('Body recibido:', req.body)

//     // Respuesta fija para pruebas
//     return res.status(200).json({
//       message: 'Simulación OK ACT EXPO',
//       exhibition: {
//         _id: req.params.id,
//         name: req.body.name,
//         location: req.body.location
//       }
//     })
//   } catch (error) {
//     console.error('Error en updateExhibition:', error.message)
//     return res.status(500).json({ message: 'ERR ON ACT EXPO' })
//   }
// }

const updateExhibition = async (req, res) => {
  try {
    console.log('ID recibido:', req.params.id)
    console.log('Body recibido:', req.body)
    const { id } = req.params
    const updateExhibition = await Exhibition.findByIdAndUpdate(id, req.body, {
      new: true
    })
      .populate('organizers', 'name email')
      .populate('exhibitors', 'name email')

    if (!updateExhibition) {
      console.log('Exposición no encontrada')
      return res.status(404).json({ message: 'CANNOT FIND EXPO' })
    }
    console.log('Exposición actualizada:', updateExhibition)
    return res.status(200).json({
      message: 'OK ACT EXPO',
      exhibition: updateExhibition
    })
  } catch (error) {
    console.error('Error en actuExp', error.message)
    return res.status(500).json({ message: 'ERR ON ACT EXPO' })
  }
}

// elmiminienieniene

const deleteExhibition = async (req, res) => {
  try {
    const { id } = req.params
    const elimExpo = await Exhibition.findByIdAndDelete(id)
    if (!elimExpo) {
      return res.status(404).json({ message: 'NO FOUND EXPO' })
    }

    await User.updateMany(
      { exhibitions: elimExpo._id },
      { $pull: { exhibitions: elimExpo._id } }
    )

    await Studio.updateMany(
      { exhibitions: elimExpo._id },
      { $pull: { exhibitions: elimExpo._id } }
    )
    return res
      .status(200)
      .json({ message: 'OK DELETE EXPO', exhibition: elimExpo })
  } catch (error) {
    console.error('ERROR en deleteExhibition:', error.message)
    return res.status(500).json({ message: 'NO POSSIBLE DELETE EXPO' })
  }
}

module.exports = {
  createExpo,
  getAllExhibitions,
  getExpoId,
  updateExhibition,
  deleteExhibition
}
