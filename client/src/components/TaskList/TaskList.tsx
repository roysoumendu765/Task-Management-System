import React, { useEffect, useState } from 'react';
import TaskModal from '../TaskModal/TaskModal';
import axios from 'axios';
import Swal from 'sweetalert2';
import './TaskList.css';

interface Task {
  taskId: string | any;
  title: string;
  priority: number;
  status: 'Pending' | 'Finished';
  startTime: any;
  endTime: any;
  totalTime: number;
}

const TaskList: React.FC = () => {
  const defaultTasks: Task[] = [];

  const [tasks, setTasks] = useState<Task[]>([]);
  const [sortOption, setSortOption] = useState<'ASC' | 'DESC' | ''>('');
  const [filterStatus, setFilterStatus] = useState<'Pending' | 'Finished' | ''>('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const useremail = localStorage.getItem("useremail");

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const username: any = localStorage.getItem('useremail');
      if (!username) {
        console.error('No username found in localStorage');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/taskmate/getalltasks/${username}`);

        if (response.status === 200) {
          setTasks(response.data.result);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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

  const handleFilter = (status: 'Pending' | 'Finished' | '') => {
    setFilterStatus(status);
  };

  const handleSelectTask = (taskId: string) => {
    setSelectedTasks((prevSelected) => {
      if (prevSelected.includes(taskId)) {
        return prevSelected.filter(id => id !== taskId);
      } else {
        return [...prevSelected, taskId];
      }
    });
  };

  const handleRemoveSort = () => {
    setSortOption('');
    setFilterStatus('');
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
        prevTasks.map((t) => (t.taskId === task.taskId ? task : t))
      );
    } else {
      setTasks((prevTasks) => [...prevTasks, task]);
    }
    setIsEditModalOpen(false);
    setIsAddModalOpen(false);
  };

  const handleOnDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete selected tasks.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post('http://localhost:5000/taskmate/deletetask', { taskIds: selectedTasks, username: useremail })
          .then((response) => {
            if (response.status === 200) {
              setTasks(tasks.filter((task) => !selectedTasks.includes(task.taskId)));
              setSelectedTasks([]);
              Swal.fire('Deleted!', 'The tasks have been deleted.', 'success');
            }
          })
          .catch((error) => {
            Swal.fire('Error!', 'Something went wrong, try again later.', 'error');
          });
      }
    });
  };

  return (
    <div className="container mx-auto p-4 min-h-full">
      <main className="mt-8">
        <section className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-2">
            <button
              className="bg-purple-500 text-white px-4 py-2 rounded"
              onClick={handleAddTask}
            >
              + Add task
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleOnDelete}
            >
              Delete selected
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-start md:justify-end space-y-2 md:space-y-0 md:space-x-4">
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
              <tr key={task.taskId} className="odd:bg-white even:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    data-taskId={task.taskId}
                    checked={selectedTasks.includes(task.taskId)}  // Check if the task is selected
                    onChange={() => handleSelectTask(task.taskId)}  // Update selection
                  />
                  {task.taskId}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">{task.title}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{task.priority}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{task.status}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{`${task.startTime.substring(0, 10)} ${task.startTime.substring(11, 16)}`}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{`${task.endTime.substring(0, 10)} ${task.endTime.substring(11, 16)}`}</td>
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

        {(isEditModalOpen) && (
          <TaskModal
            userinfo={useremail}
            type="UPDATEUSER"
            task={currentTask}
            onClose={() => setIsEditModalOpen(false)}
            onSave={handleSaveTask}
          />
        )}
        {(isAddModalOpen) && (
          <TaskModal
            userinfo={useremail}
            type="ADDUSER"
            task={currentTask}
            onClose={() => setIsAddModalOpen(false)}
            onSave={handleSaveTask}
          />
        )}
      </main>
    </div>
  );
};

export default TaskList;
