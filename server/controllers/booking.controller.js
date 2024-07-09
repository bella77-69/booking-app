// const {   getAllBookings,
//     getAllAvailableSlots,
//     findBookingById,
//     getBookingsForUser,
//     addBooking,
//     updateBooking,
//     deleteBooking } = require('../models/booking.model');


// const getBooking = async (req, res) => {
//     try {
//         const bookings = await getAllBookings();
//         res.json(bookings);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// const getBookingSlot = async (req, res) => {
//     try {
//         const slots = await getAllAvailableSlots();
//         res.json(slots);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }


// const getBookingById = async (req, res) => {
//     try {
//         const id = parseInt(req.params.id, 10);
//         if (isNaN(id)) {
//             throw new Error('Invalid booking ID');
//         }

//         const booking = await findBookingById(id);
//         if (!booking) {
//             throw new Error('Booking not found');
//         }

//         res.json(booking);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// const getBookingsByUserId = async (req, res) => {
//     try {
//         const userId = parseInt(req.params.userId, 10);
//         if (isNaN(userId)) {
//             throw new Error('Invalid user ID');
//         }

//         const bookings = await getBookingsForUser(userId);
//         res.json({
//             userId,
//             bookings,
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// const createBooking = async (req, res) => {
//     try {
//         const { slot_id, user_id} = req.body;
//         const newBooking = await addBooking({ slot_id, user_id});
//         res.status(201).json(newBooking);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// const updateBookingController = async (req, res) => {
//     try {
//         const id = parseInt(req.params.id, 10);
//         if (isNaN(id)) {
//             throw new Error('Invalid booking ID');
//         }

//         const incomingBooking = req.body;
//         await updateBooking(id, incomingBooking);
//         res.json({ success: true });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// const deleteBookingController = async (req, res) => {
//     try {
//         const id = parseInt(req.params.id, 10);
//         if (isNaN(id)) {
//             throw new Error('Invalid booking ID');
//         }

//         await deleteBooking(id);
//         res.json({ success: true });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// module.exports = {
//     getBooking,
//     getBookingSlot,
//     getBookingById,
//     getBookingsByUserId,
//     createBooking,
//     updateBookingController,
//     deleteBookingController,
// };
const { 
    getAllBookings,
    getAllAvailableSlots,
    findBookingById,
    getBookingsForUser,
    addBooking,
    updateBooking,
    deleteBooking 
} = require('../models/booking.model');

const getBooking = async (req, res) => {
    try {
        const bookings = await getAllBookings();
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getBookingSlot = async (req, res) => {
    try {
        const slots = await getAllAvailableSlots();
        res.json(slots);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getBookingById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid booking ID' });
        }

        const booking = await findBookingById(id);
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        res.json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getBookingsByUserId = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId, 10);
        if (isNaN(userId)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }

        const bookings = await getBookingsForUser(userId);
        res.json({
            userId,
            bookings,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createBooking = async (req, res) => {
    try {
        const { slot_id, user_id } = req.body;
        if (!slot_id || !user_id) {
            return res.status(400).json({ error: 'Slot ID and User ID are required' });
        }

        const newBooking = await addBooking({ slot_id, user_id });
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateBookingController = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid booking ID' });
        }

        const incomingBooking = req.body;
        await updateBooking(id, incomingBooking);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteBookingController = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid booking ID' });
        }

        await deleteBooking(id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getBooking,
    getBookingSlot,
    getBookingById,
    getBookingsByUserId,
    createBooking,
    updateBookingController,
    deleteBookingController,
};



// const jwt = require('jsonwebtoken');
// const { verifyUser, findUserById, createUser, getAllUsers, registerUser, findUserByUsername } = require('../models/user.model');

// const parseToken = (authHeader, res) => {
//   if (!authHeader) {
//     res.status(403).send('Authorization header does not exist');
//     return '';
//   }
//   return authHeader.split(' ')[1];
// };

// const registerUserController = async (req, res) => {
//   try {
//     const { username, password, email, phone } = req.body;
    
//     // Validate input
//     if (!username || !password || !email) {
//       return res.status(400).json({ error: 'Username, password, and email are required.' });
//     }

//     // Hash the password
//     const saltRounds = 10;
//     const password_hash = await bcrypt.hash(password, saltRounds);

//     // Register the user
//     const user = await registerUser(username, password_hash, email, phone);

//     res.status(201).json({ message: 'User registered successfully', user });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };


// const loginUserController = async (req, res) => {
//   try {
//     const { username, email } = req.body;

//     // Validate input
//     if (!username || !email) {
//       return res.status(400).json({ error: 'Username and email are required.' });
//     }

//     // Find the user
//     const user = await findUserByUsername(username);
//     if (!user) {
//       return res.status(400).json({ error: 'Invalid username or password.' });
//     }

//     // Compare the password
//     const isPasswordValid = await bcrypt.compare(password, user.password_hash);
//     if (!isPasswordValid) {
//       return res.status(400).json({ error: 'Invalid username or password.' });
//     }

//     res.status(200).json({ message: 'Login successful', user: { user_id: user.user_id, username: user.username, email: user.email } });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// const validateUserController = async (req, res) => {
//   try {
//     const { user_id } = req.body;

//     // Validate input
//     if (!user_id) {
//       return res.status(400).json({ error: 'User ID is required.' });
//     }

//     // Validate the user
//     const user = await findUserById(user_id);
//     if (!user) {
//       return res.status(400).json({ error: 'User not found.' });
//     }

//     res.status(200).json({ message: 'User validation successful', user: { user_id: user.user_id, username: user.username, email: user.email } });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };


// const getUsers = async (req, res) => {
//   try {
//     const users = await getAllUsers();
//     res.status(200).json({ result: users });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// const getUserById = async (req, res) => {
//   try {
//     const { user_id } = req.params;
//     const user = await findUserById(user_id);
//     res.status(200).json({ result: user });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// module.exports = {
//   // loginUser,
//   // validateUser,
//   registerUser,
//   getUsers,
//   getUserById,
//   registerUserController,
//   loginUserController,
//   validateUserController,
// };