const express = require('express')
const {
    getProjects,
    createProject,
    getProject,
    updateProject,
    deleteProject
} = require('../controllers/projectController')
 
 
const router = express.Router()
 
// get list of projects
router.get('/', getProjects)
 
// create a new project
router.post('/', createProject)
 
// get specific project
router.get('/:id', getProject)
 
// update a project
router.patch('/:id', updateProject)
 
// delete a project
router.delete('/:id', deleteProject)
 
 
 
module.exports = router