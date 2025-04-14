const Project = require("../models/project");

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("createdBy", "username fullName profilePicture")
      .populate("teamMembers", "username fullName profilePicture")
      .populate("researchDocuments", "title");

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects", details: error.message });
  }
};

const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id)
      .populate("createdBy", "username fullName profilePicture bio")
      .populate("teamMembers", "username fullName profilePicture bio")
      .populate({
        path: "researchDocuments",
        populate: {
          path: "uploadedBy",
          select: "username fullName profilePicture"
        }
      })
      

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error("Error fetching project:", error.message);
    res.status(500).json({ error: "Server error while fetching project" });
  }
};

const deleteProject =  async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Server error while deleting project' });
  }
}

const updateProject =  async (req, res) => {
  const { id } = req.params;
  const { title, description, status, category } = req.body;

  try {
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
        title,
        description,
        status,
        category,
      },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project updated successfully', project: updatedProject });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Server error while updating project' });
  }
}

const addCollaborator = async (req, res) => {
  try {
    const projectId = req.params.id;
    const { collaborators } = req.body; 
    if (!Array.isArray(collaborators)) {
      return res.status(400).json({ error: "Collaborators should be an array." });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found." });
    }

    // Merge and remove duplicates
    const updatedCollaborators = Array.from(new Set([...project.teamMembers, ...collaborators]));

    project.teamMembers = updatedCollaborators;
    await project.save();

    res.status(200).json({ message: "Collaborators updated successfully", collaborators: updatedCollaborators });
  } catch (error) {
    console.error("Error updating collaborators:", error);
    res.status(500).json({ error: error.message });
  }
}

const likeProject =   async (req, res) => {
  const { username } = req.body;
  const { projectId } = req.params;
  console.log(username,projectId)
  try {
    // Find the project and add the username to the likes array
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // If the user has already liked the project, return an error
    if (project.likes.includes(username)) {
      return res.status(400).json({ message: 'You already liked this project' });
    }

    project.likes.push(username);
    await project.save();

    res.status(200).json({ message: 'Project liked successfully', likes: project.likes.length });
  } catch (error) {
    res.status(500).json({ message: 'Error liking project', error });
  }
}

const unlikeProject = async (req, res) => {
  const { username } = req.body;
  const { projectId } = req.params;

  try {
    // Find the project and remove the username from the likes array
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // If the user hasn't liked the project, return an error
    if (!project.likes.includes(username)) {
      return res.status(400).json({ message: 'You haven\'t liked this project' });
    }

    project.likes = project.likes.filter(user => user !== username);
    await project.save();

    res.status(200).json({ message: 'Project unliked successfully', likes: project.likes.length });
  } catch (error) {
    res.status(500).json({ message: 'Error unliking project', error });
  }
}

module.exports = {
    getAllProjects,
    getProjectById,
    deleteProject,
    updateProject,
    addCollaborator,
    likeProject,
    unlikeProject
}