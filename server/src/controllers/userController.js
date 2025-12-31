import httpStatus from 'http-status';
import prisma from '../prismaClient.js';

const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

export const getCurrentUser = catchAsync(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    include: { devices: true, followedCompanies: true }
  });

  if (!user) {
    const error = new Error('User record not found in database');
    error.statusCode = httpStatus.NOT_FOUND;
    throw error;
  }

  res.status(httpStatus.OK).json(user);
});

export const getAllUsers = catchAsync(async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(httpStatus.OK).json(users);
});

export const getUserById = catchAsync(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.params.id },
  });
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = httpStatus.NOT_FOUND;
    throw error;
  }
  res.status(httpStatus.OK).json(user);
});

export const updateUser = catchAsync(async (req, res) => {
  const updateBody = req.body;

  const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = httpStatus.NOT_FOUND;
    throw error;
  }

  if (updateBody.email && (await prisma.user.findUnique({ where: { email: updateBody.email } }))) {
    if (updateBody.email !== user.email) {
      const error = new Error('Email already taken');
      error.statusCode = httpStatus.BAD_REQUEST;
      throw error;
    }
  }

  let data = { ...updateBody };
  if (updateBody.companies) {
    delete data.companies;
    data.followedCompanies = {
      set: updateBody.companies.map((companyId) => ({ id: companyId }))
    };
  }

  if (updateBody.followedCompanies) {
    delete data.followedCompanies;
    data.followedCompanies = {
      set: updateBody.followedCompanies.map((companyId) => ({ id: companyId }))
    };
  }

  data.onboarding_completed = true;
  data.onboarding_completed_at = new Date();

  const updatedUser = await prisma.user.update({
    where: { id: req.user.id },
    data: data,
    include: { followedCompanies: true }
  });
  res.status(httpStatus.OK).json(updatedUser);
});

export const updateUserById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateBody = req.body;

  if (id !== req.user.id) {
    const error = new Error('Unauthorized to update another user');
    error.statusCode = httpStatus.FORBIDDEN;
    throw error;
  }

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = httpStatus.NOT_FOUND;
    throw error;
  }

  if (updateBody.email && (await prisma.user.findUnique({ where: { email: updateBody.email } }))) {
    if (updateBody.email !== user.email) {
      const error = new Error('Email already taken');
      error.statusCode = httpStatus.BAD_REQUEST;
      throw error;
    }
  }

  let data = { ...updateBody };
  if (updateBody.companies) {
    delete data.companies;
    data.followedCompanies = {
      set: updateBody.companies.map((companyId) => ({ id: companyId }))
    };
  }

  if (updateBody.followedCompanies) {
    delete data.followedCompanies;
    data.followedCompanies = {
      set: updateBody.followedCompanies.map((companyId) => ({ id: companyId }))
    };
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: data,
    include: { followedCompanies: true }
  });
  res.status(httpStatus.OK).json(updatedUser);
});

export const deleteUser = catchAsync(async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = httpStatus.NOT_FOUND;
    throw error;
  }

  await prisma.user.delete({
    where: { id: req.user.id },
  });
  res.status(httpStatus.NO_CONTENT).send();
});

export const deleteUserById = catchAsync(async (req, res) => {
  const { id } = req.params;

  if (id !== req.user.id) {
    const error = new Error('Unauthorized to delete another user');
    error.statusCode = httpStatus.FORBIDDEN;
    throw error;
  }

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = httpStatus.NOT_FOUND;
    throw error;
  }

  await prisma.user.delete({
    where: { id },
  });
  res.status(httpStatus.NO_CONTENT).send();
});
