import bcrypt from 'bcryptjs';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import { model, Schema } from 'mongoose';

import { models } from '../constants';
import APIError from '../errors/api-error';

const UserSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

UserSchema.statics = {
  /**
   * Authenticate user
   * @param {string} email
   * @param {string} password
   * @returns {Promise<User, APIError>}
   */
  async authenticate(email, password) {
    const user = await this.getByEmail(email);

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch)
      throw new APIError({
        message: 'Password is incorrect',
        status: httpStatus.UNAUTHORIZED,
        isPublic: true,
      });

    return { user: user.toJSON(), token: user.generateToken() };
  },

  /**
   * Get user by email
   */
  async getByEmail(email, supressError = false) {
    const user = await this.findOne({ email });

    if (!user && !supressError)
      throw new APIError({
        message: 'User not found',
        status: httpStatus.UNAUTHORIZED,
        isPublic: true,
      });

    return user;
  },
};

UserSchema.methods = {
  /**
   * Compare clear text password and hashed password
   * @param {string} password
   * @returns {Promise<boolean>}
   */
  comparePassword(password) {
    return bcrypt.compare(password, this.password);
  },

  /**
   * Generate JWT token
   * @returns {string} JWT token
   */
  generateToken() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  },

  /**
   * @returns {object} User object without password
   */
  toJSON() {
    const { password, ...user } = this.toObject();
    return user;
  },
};

const User = model(models.user, UserSchema);

export default User;
