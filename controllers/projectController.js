const Project = require('../models/projectModel')
const mongoose = require('mongoose')

// get list of projects
const getProjects = async (req, res) => {
  const projects = await Project.find({}).sort({ createdAt: -1 })
  res.status(200).json(projects)
}

// create a new project
const createProject = async (req, res) => {
  const { name, description } = req.body

  try {
    const project = await Project.create({ name, description })
    res.status(200).json(project)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// get specific project
const getProject = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No project found for id ' + id })
  }

  const project = await Project.findById(id)

  if (!project) {
    return res.status(404).json({ error: 'No project found for id ' + id })
  }

  res.status(200).json(project)
}

// update a project
const updateProject = async (req, res) => {
  const { id } = req.params
  const { name, description } = req.body
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No project found for id ' + id })
  }

  const project = await Project.findOneAndUpdate({ _id: id }, { name, description }, { returnOriginal: false })

  if (!project) {
    return res.status(404).json({ error: 'No project found for id ' + id })
  }

  res.status(200).json(project)
}

// delete a project
const deleteProject = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No project found for id ' + id })
  }

  const project = await Project.findOneAndDelete({ _id: id })

  if (!project) {
    return res.status(404).json({ error: 'No project found for id ' + id })
  }

  res.status(200).json({ message: 'Project deleted.' })
}



module.exports = {
  getProjects,
  createProject,
  getProject,
  updateProject,
  deleteProject
}