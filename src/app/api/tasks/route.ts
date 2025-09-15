import { addNewTask, getTasksByUser } from "@/lib/tasks";
import { Task } from "@/types";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export type TasksApiGetResponse = {
  tasks?: Task[];
};

export type TasksApiPostBody = {
  task: Omit<Task, "_id">;
};

export type TasksApiPostResponse = {
  task: Task;
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("user");
    if (!userId || userId.length === 0) {
      console.error("No user id in the url");
      return new NextResponse("No user id in the url", { status: 400 });
    }
    const tasks = await getTasksByUser(new ObjectId(userId));

    return NextResponse.json<TasksApiGetResponse>({ tasks }, { status: 200 });
  } catch (error) {
    console.error("Error while fetching tasks:", error);
    return new NextResponse(
      `Error while fetching tasks: ${(error as Error).message}`,
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { task } = (await request.json()) as TasksApiPostBody;
    const res = await addNewTask(task);
    if (!res) {
      return new NextResponse("Error while creating a task.", { status: 500 });
    }
    return NextResponse.json<TasksApiPostResponse>(
      { task: res },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error while creating a task:", error);
    return new NextResponse(
      `Error while creating a task: ${(error as Error).message}`,
      { status: 500 },
    );
  }
}
