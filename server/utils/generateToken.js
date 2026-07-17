const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );
};

module.exports = generateToken;

//"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNTc2NzFiZDg3MzY5ZTllYmQ0MDhlYSIsImlhdCI6MTc4NDExMzY3NSwiZXhwIjoxNzg0NzE4NDc1fQ.BtPz2JyqCVne0v4QEouxzsrP4Ictg2XtrDauV6tMM1s"