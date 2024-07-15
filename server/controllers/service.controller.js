const {
  getAllServices,
  findServiceById,
  addService,
  updateService,
} = require("../models/service.model");

const getServices = async (req, res) => {
  try {
    const services = await getAllServices();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const findById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new Error("Invalid service ID");
    }

    const service = await findServiceById(id);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const add = async (req, res) => {
  try {
    const { service_name, service_price, service_duration, description } =
      req.body;
    const newService = await addService(
      service_name,
      service_price,
      service_duration,
      description
    );
    res.status(201).json({ result: newService });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { service_name, service_price, service_duration, description } =
      req.body;
    const updatedService = await updateService(
      id,
      service_name,
      service_price,
      service_duration,
      description
    );
    res.json(updatedService);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getServices,
  findById,
  add,
  update,
};
