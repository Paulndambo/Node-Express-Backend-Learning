const getAllJobs = async (req, res) => {
    res.send("get all jobs")
}

const getSingleJob = async (req, res) => {
    res.send("Get a single job");
}

const createJob = async (req, res) => {
    res.send("Create A Job")
}

const updateJob = async (req, res) => {
    res.send("Update a job");
}

const deleteJob = async (req, res) => {
    res.send("Delete a job")
}

module.exports = {
    getAllJobs,
    getSingleJob,
    createJob,
    updateJob,
    deleteJob
}