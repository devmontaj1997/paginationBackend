import expressAsyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";
import { fileUpload } from "../../utiles/Cloudenary.js";

const prisma = new PrismaClient();

// create formValidation Controllers
/**
 * @description: this formValidation get Controller
 * @route: /api/v1/formValidation
 * @access: public
 * @method: get
 */

export const getCar = expressAsyncHandler(async (req, res) => {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 9) ;

  // validation
  if (page <= 0) {
    page = 1;
  }
  if (limit < 0 || limit > 100) {
    limit = 9;
  }

  // count skip

  const skip = (page - 1) * limit;

  const allCar = await prisma.Car.findMany({
    take: limit,
    skip: skip,
  });
  const totalCar = await prisma.Car.count();
  const totalPages = Math.ceil(totalCar / limit);

  res.status(200).json({ totalCar, totalPages, currantPage:page, allCar });
});

/**
 * @description: this  is Car create Car data Controller
 * @route: /api/v1/Car_list/add_car
 * @access: public
 * @method: post
 */

export const createCarList = expressAsyncHandler(async (req, res) => {
  const {
    price,
    tittle,
    year,
    agent,
    type,
    mileage,
    status,
    manufacturer,
    transmission,
    engine,
    city,
    fuel,
  } = req.body;

  // Uploade Feature image on cloudenary
  const featureImage = req.file;
  const uploadfeatureimg = await fileUpload(featureImage.path);

  const createCar = await prisma.Car.create({
    data: {
      price: parseInt(price),
      tittle,
      type,
      year,
      agent,
      mileage,
      status,
      transmission,
      manufacturer,
      engine,
      city,
      fuel,
      featureImage: uploadfeatureimg.secure_url,
    },
  });
  const CarCount = await prisma.Car.count();
  res
    .status(200)
    .json({ createCar, CarCount, message: "SuccessFully Added Your Car" });
});

/**
 * @description: this  is deleteCar create Car data Controller
 * @route: /api/v1/Car_list/delete_Car/:id
 * @access: public
 * @method: delete
 */

export const deleteTask = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedCar = await prisma.Car.delete({
    where: { id },
  });
  const CarCount = await prisma.Car.count();

  res.status(200).json({
    deletedCar,
    CarCount,
    message: ` SuccessFully Deleted ${deletedCar.task}`,
  });
});

/**
 * @description: this  is deleteAllCar create Car data Controller
 * @route: /api/v1/Car_list/delete_Car
 * @access: public
 * @method: delete
 */

export const deleteAllTask = expressAsyncHandler(async (req, res) => {
  // checking available Car
  const availableCar = await prisma.Car.findMany();
  if (availableCar.length === 0) {
    return res.status(400).json({ message: "Car not available Here " });
  } else {
    const deletedAllTask = await prisma.Car.deleteMany({});
    const CarCount = await prisma.Car.count();
    res.status(200).json({
      deletedAllTask,
      CarCount,
      message: ` SuccessFully Delete All Tasks `,
    });
  }
});

/**
 * @description: this  is upDateTask create Car data Controller
 * @route: /api/v1/Car_list/update_Car/:id
 * @access: public
 * @method: post
 */

export const upDateTask = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { task, taskOption } = req.body;

  const updatedTask = await prisma.Car.update({
    where: { id }, // Update based on the unique id
    data: { task, taskOption }, // Specify what field(s) to update
  });
  const CarCount = await prisma.Car.count();

  res.status(200).json({
    updatedTask,
    CarCount,
    message: ` SuccessFully Updated your new task ${updatedTask.task} now status ${updatedTask.taskOption} `,
  });
});
