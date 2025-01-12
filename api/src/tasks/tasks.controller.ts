import { Request, Response } from "express";
import { AppDataSource } from "../..";
import { Task } from "./tasks.entity";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { validationResult } from "express-validator";
import { UpdateResult } from "typeorm";

class TaskController {
  public async getAll(_req: Request, res: Response): Promise<void> {
    // Declare a variable to hold all the tasks
    let allTasks: Task[];

    try {
      // Fetch all tasks using the repository
      allTasks = await AppDataSource.getRepository(Task).find({
        order: { date: "ASC" },
      });

      // Covert the tasks instance to an array of objects
      allTasks = instanceToPlain(allTasks) as Task[];

      res.json(allTasks).status(200);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    // Create a new instance of the Task
    const newTask = new Task();

    // Add the required properties to the Task Object
    newTask.title = req.body.title;
    newTask.date = req.body.date;
    newTask.description = req.body.description;
    newTask.priority = req.body.priority;
    newTask.status = req.body.status;

    // Add the new task to the database
    let createdTask: Task;
    try {
      createdTask = await AppDataSource.getRepository(Task).save(newTask);

      // Convert the task instance to an object
      createdTask = instanceToPlain(createdTask) as Task;
      res.status(201).json(createdTask);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    // Try to find if the tasks exists
    let task: Task | null;

    try {
      task = await AppDataSource.getRepository(Task).findOne({
        where: { id: req.body.id },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    // Return 404 if task is null
    if (!task) {
      res.status(404).json({
        error: "The task with the given ID does not exist",
      });
    }

    // Declare a variable to updatedTask
    let updatedTask: UpdateResult;

    // Update the task
    try {
      updatedTask = await AppDataSource.getRepository(Task).update(
        req.body.id,
        plainToInstance(Task, { status: req.body.status }),
      );

      updatedTask = instanceToPlain(updatedTask) as UpdateResult;

      res.status(200).json(updatedTask);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }

    // Convert the updatedTask instance to an object
  }
}

export const taskController = new TaskController();
