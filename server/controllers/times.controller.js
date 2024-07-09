const {
  getAllTimes,
  findTimeById,
  findTimeByUserId,
  addTime,
  updateTime,
  deleteTime,
} = require("../models/times.model");

const getTime = async (req, res) => {
  try {
    const times = await getAllTimes();
    res.json(times);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTimeById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new Error("Invalid time ID");
    }

    const time = await findTimeById(id);
    if (!time) {
      throw new Error("Time not found");
    }

    res.json(time);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTimeByUserId = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    if (isNaN(userId)) {
      throw new Error("Invalid user ID");
    }

    const times = await findTimeByUserId(userId);
    res.json({
      userId,
      times,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTime = async (req, res) => {
  try {
    const { appointment_date, appointment_time, user_id } = req.body;
    if (!appointment_date || !appointment_time || !user_id) {
      throw new Error("Missing required fields");
    }

    const time = await addTime({ appointment_date, appointment_time, user_id });
    res.status(201).json(time);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAppointmentTime = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new Error("Invalid time ID");
    }

    const { appointment_date, appointment_time, user_id } = req.body;
    if (!appointment_date || !appointment_time || !user_id) {
      throw new Error("Missing required fields");
    }

    await updateTime(id, { appointment_date, appointment_time, user_id });
    res.json({ message: "Time updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAppointmentTime = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new Error("Invalid time ID");
    }

    await deleteTime(id);
    res.json({ message: "Time deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTime,
  getTimeById,
  getTimeByUserId,
  createTime,
  updateAppointmentTime,
  deleteAppointmentTime,
};
