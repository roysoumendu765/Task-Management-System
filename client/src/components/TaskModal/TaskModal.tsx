import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

interface Task {
  taskId: string;
  title: string;
  priority: number;
  status: 'Pending' | 'Finished';
  startTime: any;
  endTime: any;
  totalTime: number;
}

interface TaskModalProps {
  userinfo: string | null;
  type: 'ADDUSER' | 'UPDATEUSER';
  task: Task | null;
  onClose: () => void;
  onSave: (task: Task) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ userinfo, type, task, onClose, onSave }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [priority, setPriority] = useState(task?.priority || 1);
  const [status, setStatus] = useState<'Pending' | 'Finished'>(task?.status || 'Pending');
  const [startTime, setStartTime] = useState<string>(task?.startTime || '');
  const [endTime, setEndTime] = useState<string>(task?.endTime || '');

  const calculateTotalTime = (start: string, end: string): number => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diff = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
    return diff || 0;
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Invalid Token',
      });
      return;
    }
  
    const userdata = {
      title: title,
      priority: priority,
      status: status,
      startTime: startTime,
      endTime: endTime,
      username: userinfo,
    };
  
    try {
      let response;
      if (type === 'ADDUSER') {
        response = await axios.post(`http://localhost:5000/taskmate/addtask`, userdata);
      } else if (type === 'UPDATEUSER') {
        if (!task?.taskId) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Task ID not found for update',
          });
          return;
        }
  
        response = await axios.put(
          `http://localhost:5000/taskmate/edittask/${task.taskId}`,
          userdata
        );
      }
  
      if (response?.status === 200 || response?.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: response.data.message,
        });
  
        const newTask: Task = {
          taskId: task ? task.taskId : `T-${Math.random().toString(36).substr(2, 5)}`,
          title,
          priority,
          status,
          startTime,
          endTime,
          totalTime: calculateTotalTime(startTime, endTime),
        };
  
        onSave(newTask);
        onClose();
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `${error}`,
      });
    }
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-1/2">
        <h2 className="text-xl font-bold mb-4">{type === 'ADDUSER' ? 'Add Task' : 'Edit Task'}</h2>
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Priority</label>
          <input
            type="number"
            value={priority}
            onChange={(e) => setPriority(parseInt(e.target.value))}
            className="w-full px-3 py-2 border rounded"
            min="1"
            max="5"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as 'Pending' | 'Finished')}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="Pending">Pending</option>
            <option value="Finished">Finished</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Start Time</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">End Time</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
