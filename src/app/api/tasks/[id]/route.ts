import { updateTask } from "@/lib/tasks";
import { Task } from "@/types";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { TasksApiPostResponse } from "../route";

export type TaskApiPutBody = {
  update: Partial<Omit<Task, "_id">>;
};

export type TaskApiPutResponse = {
  task: Task;
};

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { update } = (await request.json()) as TaskApiPutBody;
    const res = await updateTask(new ObjectId(id), update);
    if (!res) {
      return new NextResponse("There has been an error with task update", {
        status: 500,
      });
    }
    return NextResponse.json<TasksApiPostResponse>(
      { task: res },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error while updating a task:", error);
    return new NextResponse(
      `Error while updating a task: ${(error as Error).message}`,
      { status: 500 },
    );
  }
}
