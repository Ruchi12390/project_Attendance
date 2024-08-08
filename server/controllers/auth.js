import User from '../models/user.js';
import { signupValidation, loginValidation } from '../utils/validation.js';
import bcrypt from 'bcrypt';
import { config } from '../config/config.js';
import jwt from 'jsonwebtoken';
import sendMail from '../utils/sendMail.js'; // Ensure you have this function

export const Sign = async (req, res) => {
    const { error } = signupValidation(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const userExists = await User.findOne({ email: req.body.email }).exec();
    if (userExists) return res.status(400).json({ error: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password,
        role: req.body.role, // Ensure this is included if needed
    });

    try {
        const data = await newUser.save();
        return res.status(200).json({
            message: 'SignUp Successful',
            user: {
                id: data._id,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                role: data.role,
            }
        });
    } catch (error) {
        return res.status(400).json({ error: 'Something went wrong...' });
    }
};

export const Login = async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const user = await User.findOne({ email: req.body.email }).exec();
    if (!user) return res.status(400).json({ error: "Check your email" });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'Wrong Password' });

    const token = jwt.sign({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role // Ensure this is included if needed
    }, config.JWT_SECRET, { expiresIn: '24h' });

    res.header("auth-token", token).status(200).json({ token });
};

export const ForgotPassword = async (req, res) => {
    const user = await User.findOne({ email: req.body.email }).exec();
    if (!user) return res.status(400).json({ error: "User doesn't exist" });

    const token = jwt.sign({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    }, config.JWT_SECRET, { expiresIn: '24h' });

    const mailHtmlContent = `
    <h3>Password Reset</h3>
    <p>Here is your password reset link</p>
    <p>${config.CLIENT_URL}/password/reset?token=${token}</p>
    `;

    try {
        await sendMail(config.MAIL_SENDER, user.email, "PASSWORD RESET", mailHtmlContent);
    } catch (error) {
        return res.status(500).json({ error: 'Unable to send mail' });
    }

    return res.status(200).json({ message: "Check mail for password reset link" });
};

export const ResetPassword = async (req, res) => {
    const token = req.body.token;
    try {
        jwt.verify(token, config.JWT_SECRET);
    } catch (err) {
        return res.status(500).json({ error: 'Authentication error' });
    }

    const salt = await bcrypt.genSalt(10);
    const updatedPassword = await bcrypt.hash(req.body.password, salt);

    try {
        await User.findOneAndUpdate({ email: req.body.email }, { password: updatedPassword });
    } catch (error) {
        return res.status(400).json({ error: "Update Failed" });
    }

    const mailHtmlContent = `
    <h3>Password Reset Successfully</h3>
    <p>Your password has been reset successfully.</p>
    <p>Please <a href="resumebuilder.github.io">Login</a> to continue with our services.</p>
    `;

    try {
        await sendMail(config.MAIL_SENDER, req.body.email, "PASSWORD RESET SUCCESSFUL", mailHtmlContent);
    } catch (error) {
        return res.status(500).json({ error: 'Unable to send mail' });
    }

    return res.status(200).json({ message: "Password Reset Successfully" });
};
