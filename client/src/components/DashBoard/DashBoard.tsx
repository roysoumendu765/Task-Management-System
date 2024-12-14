import React from 'react';
import './DashBoard.css';

interface SummaryProps {
  totalTasks: number;
  tasksCompleted: number;
  tasksPending: number;
  avgTimePerTask: number;
}

interface TaskDetail {
  priority: number;
  pendingTasks: number;
  timeLapsed: number;
  timeToFinish: number;
}

interface PendingTaskProps {
  pendingTasks: number;
  totalTimeLapsed: number;
  totalTimeToFinish: number;
}

const Dashboard: React.FC = () => {
  const summaryData: SummaryProps = {
    totalTasks: 25,
    tasksCompleted: 40,
    tasksPending: 60,
    avgTimePerTask: 3.5,
  };

  const taskDetails: TaskDetail[] = [
    { priority: 1, pendingTasks: 3, timeLapsed: 12, timeToFinish: 8 },
    { priority: 2, pendingTasks: 5, timeLapsed: 6, timeToFinish: 3 },
    { priority: 3, pendingTasks: 1, timeLapsed: 8, timeToFinish: 7 },
    { priority: 4, pendingTasks: 0, timeLapsed: 0, timeToFinish: 0 },
    { priority: 5, pendingTasks: 6, timeLapsed: 30, timeToFinish: 6 },
  ];

  const pendingTaskData: PendingTaskProps = {
    pendingTasks: 15,
    totalTimeLapsed: 56,
    totalTimeToFinish: 24,
  };

  return (
    <div className="container mx-auto p-4 min-h-full">
      <main className="mt-8">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-gray-100 p-4 rounded shadow">
              <h3 className="text-xl font-bold text-blue-500">{summaryData.totalTasks}</h3>
              <p className="text-gray-600">Total tasks</p>
            </div>
            <div className="bg-gray-100 p-4 rounded shadow">
              <h3 className="text-xl font-bold text-blue-500">{summaryData.tasksCompleted}%</h3>
              <p className="text-gray-600">Tasks completed</p>
            </div>
            <div className="bg-gray-100 p-4 rounded shadow">
              <h3 className="text-xl font-bold text-blue-500">{summaryData.tasksPending}%</h3>
              <p className="text-gray-600">Tasks pending</p>
            </div>
            <div className="bg-gray-100 p-4 rounded shadow">
              <h3 className="text-xl font-bold text-blue-500">{summaryData.avgTimePerTask} hrs</h3>
              <p className="text-gray-600">Average time per completed task</p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-4">Pending task summary</h3>
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-100 p-4 rounded shadow">
              <h4 className="text-lg font-bold text-blue-500">{pendingTaskData.pendingTasks}</h4>
              <p className="text-gray-600">Pending tasks</p>
            </div>
            <div className="bg-gray-100 p-4 rounded shadow">
              <h4 className="text-lg font-bold text-blue-500">{pendingTaskData.totalTimeLapsed} hrs</h4>
              <p className="text-gray-600">Total time lapsed</p>
            </div>
            <div className="bg-gray-100 p-4 rounded shadow">
              <h4 className="text-lg font-bold text-blue-500">{pendingTaskData.totalTimeToFinish} hrs</h4>
              <p className="text-gray-600">Total time to finish</p>
              <p className="text-sm text-gray-500">estimated based on end time</p>
            </div>
          </div>

          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-center">Task priority</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Pending tasks</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Time lapsed (hrs)</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Time to finish (hrs)</th>
              </tr>
            </thead>
            <tbody>
              {taskDetails.map((task) => (
                <tr key={task.priority} className="odd:bg-white even:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-center">{task.priority}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{task.pendingTasks}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{task.timeLapsed}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{task.timeToFinish}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;