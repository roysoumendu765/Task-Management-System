// src/TaskList.tsx

import React, { useState } from 'react';
import TaskModal from '../TaskModal/TaskModal'; // Import the modal component

interface Task {
  id: string;
  title: string;
  priority: number;
  status: 'Pending' | 'Finished';
  startTime: string;
  endTime: string;
  totalTime: number;
}

const TaskList: React.FC = () => {
  const defaultTasks: Task[] = [
    {
      id: 'T-00001',
      title: 'Buy clothes',
      priority: 5,
      status: 'Pending',
      startTime: '26-Nov-24 11:00 AM',
      endTime: '30-Nov-24 11:00 AM',
      totalTime: 96,
    },
    {
      id: 'T-00002',
      title: 'Finish code',
      priority: 2,
      status: 'Finished',
      startTime: '25-Nov-24 09:05 AM',
      endTime: '25-Nov-24 03:15 PM',
      totalTime: 6.17,
    },
    {
      id: 'T-00003',
      title: 'Book travel tickets',
      priority: 4,
      status: 'Pending',
      startTime: '19-Nov-24 10:00 PM',
      endTime: '20-Nov-24 11:00 PM',
      totalTime: 25,
    },
    {
      id: 'T-00004',
      title: 'Order groceries',
      priority: 3,
      status: 'Finished',
      startTime: '14-Oct-24 10:30 AM',
      endTime: '16-Oct-24 10:30 PM',
      totalTime: 60,
    },
    {
      id: 'T-00005',
      title: 'Medical checkup',
      priority: 1,
      status: 'Pending',
      startTime: '19-Nov-24 01:15 PM',
      endTime: '21-Dec-24 05:00 PM',
      totalTime: 51.75,
    },
  ];

  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const [sortOption, setSortOption] = useState<'ASC' | 'DESC' | ''>('');
  const [filterStatus, setFilterStatus] = useState<'Pending' | 'Finished' | ''>('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  const handleSort = (field: keyof Task) => {
    const sortedTasks = [...tasks].sort((a, b) => {
      if (sortOption === 'ASC') {
        return a[field] > b[field] ? 1 : -1;
      } else {
        return a[field] < b[field] ? 1 : -1;
      }
    });
    setTasks(sortedTasks);
    setSortOption(sortOption === 'ASC' ? 'DESC' : 'ASC');
  };

  const handleRemoveSort = () => {
    setTasks(defaultTasks);
    setSortOption('');
    setFilterStatus('');
  };

  const handleFilter = (status: 'Pending' | 'Finished' | '') => {
    setFilterStatus(status);
  };

  const displayedTasks = filterStatus
    ? tasks.filter((task) => task.status === filterStatus)
    : tasks;

  const handleEditTask = (task: Task) => {
    setCurrentTask(task);
    setIsEditModalOpen(true);
  };

  const handleAddTask = () => {
    setCurrentTask(null);
    setIsAddModalOpen(true);
  };

  const handleSaveTask = (task: Task) => {
    if (currentTask) {
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? task : t))
      );
    } else {
      setTasks((prevTasks) => [...prevTasks, task]);
    }
    setIsEditModalOpen(false);
    setIsAddModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4 min-h-full">
      <main className="mt-8">
        <section className="flex justify-between items-center mb-4">
          <div>
            <button
              className="bg-purple-500 text-white px-4 py-2 rounded mr-2"
              onClick={handleAddTask}
            >
              + Add task
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded">
              Delete selected
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded shadow"
              onClick={() => handleSort('priority')}
            >
              Sort: Priority
            </button>
            <button
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded shadow"
              onClick={() => handleSort('startTime')}
            >
              Sort: Start Time
            </button>
            <button
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded shadow"
              onClick={() => handleSort('endTime')}
            >
              Sort: End Time
            </button>
            <button
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded shadow"
              onClick={handleRemoveSort}
            >
              Remove Sort
            </button>
            <select
              className="bg-gray-100 px-4 py-2 rounded shadow"
              value={filterStatus}
              onChange={(e) => handleFilter(e.target.value as 'Pending' | 'Finished' | '')}
            >
              <option value="">Status: All</option>
              <option value="Pending">Pending</option>
              <option value="Finished">Finished</option>
            </select>
          </div>
        </section>

        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-center">Task ID</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Title</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Priority</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Status</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Start Time</th>
              <th className="border border-gray-300 px-4 py-2 text-center">End Time</th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Total time to finish (hrs)
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">Edit</th>
            </tr>
          </thead>
          <tbody>
            {displayedTasks.map((task) => (
              <tr key={task.id} className="odd:bg-white even:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <input type="checkbox" className="mr-2" />
                  {task.id}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">{task.title}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{task.priority}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{task.status}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{task.startTime}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{task.endTime}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{task.totalTime}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    className="text-blue-500"
                    onClick={() => handleEditTask(task)}
                  >
                    ✏️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(isEditModalOpen || isAddModalOpen) && (
          <TaskModal
            task={currentTask}
            onClose={() => {
              setIsEditModalOpen(false);
              setIsAddModalOpen(false);
            }}
            onSave={handleSaveTask}
          />
        )}
      </main>
    </div>
  );
};

export default TaskList;
