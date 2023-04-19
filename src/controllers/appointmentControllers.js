const { Appointment } = require('../models')

// @description     fetch all appointments for a given day
// @route           GET /api/appointment/:year/:month/:day
// @access          Protected
const fetchDayAppointments = async (req, res) => {
  try {
    const { year, month, day } = req.params
    const dayAppointments = await Appointment.find({ date: new Date(`${year}-${month}-${day}`) }).populate('patient')

    res.status(200).json(dayAppointments)
  } catch (error) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: error.message,
    })
  }
}

// @description     fetch all awaiting appointments greater than the given date
// @route           GET /api/appointment/:year/:month/:day/awaiting
// @access          Protected
const fetchDayAwaitingList = async (req, res) => {
  try {
    const { year, month, day } = req.params
    const awaitingAppointments = await Appointment.find({
      date: { $gt: new Date(`${year}-${month}-${day}`) },
      isWaitingList: true,
    })
      .populate('patient')
      .limit(10)

    res.status(200).json(awaitingAppointments)
  } catch (error) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: error.message,
    })
  }
}

// @description     fetch all appointments for a given month
// @route           GET /api/appointment/:year/:month
// @access          Protected
const fetchMonthAppointments = async (req, res) => {
  try {
    const { year, month } = req.params
    const startDate = new Date(`${year}-${month}-1`)
    const endDate = new Date(`${year}-${month}-31`)
    const allAppointment = await Appointment.find({
      date: {
        $gte: startDate,
        $lt: endDate,
      },
    })
    res.status(200).json(allAppointment)
  } catch (error) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: error.message,
    })
  }
}

// @description     create a new appointment
// @route           POST /api/appointment/:year/:month/:day
// @access          Protected
const createAppointment = async (req, res) => {
  try {
    const { year, month, day } = req.params
    const newAppointment = await Appointment.create({
      ...req.body,
      date: new Date(`${year}-${month}-${day}`),
    })
    res.status(200).json(newAppointment)
  } catch (error) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: error.message,
    })
  }
}

// @description     toggle "isConfirmed" appointments by Id
// @route           PUT /api/appointment/:id/confirm
// @access          Protected
const confirmAppointment = async (req, res) => {
  try {
    const { id } = req.params
    const { isConfirmed } = req.body
    const updatedAppointment = await Appointment.findByIdAndUpdate(id, { isConfirmed: !isConfirmed }, { new: true })
    res.status(200).json(updatedAppointment)
  } catch (error) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: error.message,
    })
  }
}

// @description     toggle "isLeft" appointments by Id
// @route           PUT /api/appointment/:id/leave
// @access          Protected
const leaveAppointment = async (req, res) => {
  try {
    const { id } = req.params
    const { isLeft } = req.body
    const updatedAppointment = await Appointment.findByIdAndUpdate(id, { isLeft: !isLeft }, { new: true })
    res.status(200).json(updatedAppointment)
  } catch (error) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: error.message,
    })
  }
}

// @description     update appointments status
// @route           PUT /api/appointment/:id/update
// @access          Protected
const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params
    const updatedAppointment = await Appointment.findByIdAndUpdate(id, req.body, { new: true }).populate('patient')
    res.status(200).json(updatedAppointment)
  } catch (error) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: error.message,
    })
  }
}

module.exports = {
  fetchDayAppointments,
  fetchDayAwaitingList,
  fetchMonthAppointments,
  createAppointment,
  confirmAppointment,
  leaveAppointment,
  updateAppointment,
}
