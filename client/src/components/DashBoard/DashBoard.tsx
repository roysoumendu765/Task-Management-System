import React, { useEffect, useState } from 'react';
import './DashBoard.css';
import axios from 'axios';

const Dashboard: React.FC = () => {
  const [dashboardData, setDashBoardData] = useState<any>([]);
  const [taskDetails, setTaskDetails] = useState<any>([]);
  
  useEffect(() => {
    console.log("Calling")
    const fetchData = async (): Promise<void> => {
      const username : any = localStorage.getItem('useremail');
      if (!username) {
        console.error('No username found in localStorage');
        return;
      }

      try {
        const response = await axios.get(`https://task-management-app-backend-8814.onrender.com/taskmate/getdashdata/${username}`);

        if (response.status === 200) {
          console.log(response.data);
          setDashBoardData(response.data.dashboardData);
          setTaskDetails(response.data.dashboardTable);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  

  return (
    <div className="container mx-auto p-4 min-h-full">
      <main className="mt-8">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-gray-100 p-4 rounded shadow">
              <h3 className="text-xl font-bold text-blue-500">{dashboardData.totTasks ? dashboardData.totTasks : 0}</h3>
              <p className="text-gray-600">Total tasks</p>
            </div>
            <div className="bg-gray-100 p-4 rounded shadow">
              <h3 className="text-xl font-bold text-blue-500">{dashboardData.completedPercent ? dashboardData.completedPercent : 0}%</h3>
              <p className="text-gray-600">Tasks completed</p>
            </div>
            <div className="bg-gray-100 p-4 rounded shadow">
              <h3 className="text-xl font-bold text-blue-500">{dashboardData.pendingPercent ? dashboardData.pendingPercent : 0}%</h3>
              <p className="text-gray-600">Tasks pending</p>
            </div>
            <div className="bg-gray-100 p-4 rounded shadow">
              <h3 className="text-xl font-bold text-blue-500">{dashboardData.AverageTime ? dashboardData.AverageTime : 0} hrs</h3>
              <p className="text-gray-600">Average time per completed task</p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-4">Pending task summary</h3>
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-100 p-4 rounded shadow">
              <h4 className="text-lg font-bold text-blue-500">{dashboardData.pendingTasks ? dashboardData.pendingTasks : 0}</h4>
              <p className="text-gray-600">Pending tasks</p>
            </div>
            <div className="bg-gray-100 p-4 rounded shadow">
              <h4 className="text-lg font-bold text-blue-500">{dashboardData.TimeLapsed ? dashboardData.TimeLapsed : 0} hrs</h4>
              <p className="text-gray-600">Total time lapsed</p>
            </div>
            <div className="bg-gray-100 p-4 rounded shadow">
              <h4 className="text-lg font-bold text-blue-500">{dashboardData.TimeLeft ? dashboardData.TimeLeft : 0} hrs</h4>
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
              {taskDetails.map((task: any) => (
                <tr key={task.priority} className="odd:bg-white even:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-center">{task.priority}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{task.count}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{task.timeElapsedSum > 0 ? task.timeElapsedSum : 0}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{task.timeLeftSum > 0 ? task.timeLeftSum : 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {taskDetails.length === 0 && <p className='text-red-500 my-2 text-center w-full flex flex-row justify-center items-center'>No Records Found!</p>}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;