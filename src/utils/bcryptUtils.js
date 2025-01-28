import bcrypt from 'bcrypt';

export const checkPassword = async (inputPassword, hashedPassword) => {
    return await bcrypt.compare(inputPassword, hashedPassword);
};

export const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};