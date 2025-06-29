import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

export default function TeamDashboard() {
  const [team, setTeam] = useState(null);
  const [members, setMembers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', assignedTo: '', status: 'قيد الإنجاز' });

  useEffect(() => {
    fetch(`${API_URL}/api/team/1`)
      .then((res) => res.json())
      .then((data) => {
        setTeam(data);
        setMembers(data.members);
        setTasks(data.tasks);
      })
      .catch((err) => console.error('❌ API Error:', err));
  }, []);

  const handleAddTask = async () => {
    const res = await fetch(`${API_URL}/api/task`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newTask, teamId: 1 })
    });
    const data = await res.json();
    setTasks([...tasks, data]);
  };

  const handleStatusChange = async (taskId, newStatus) => {
    await fetch(`${API_URL}/api/task/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    setTasks(tasks.map((t) => (t._id === taskId ? { ...t, status: newStatus } : t)));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">لوحة تحكم الفريق</h1>

      <div className="mb-6 border p-4 rounded-lg">
        <input
          className="border p-2 w-full mb-2"
          placeholder="عنوان المهمة"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <select
          className="border p-2 w-full mb-2"
          value={newTask.assignedTo}
          onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
        >
          <option>اختر عضو الفريق</option>
          {members.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleAddTask}>
          إضافة مهمة
        </button>
      </div>

      {tasks.map((task) => (
        <div key={task._id} className="border p-4 rounded mb-2">
          <p className="font-bold">{task.title}</p>
          <p className="text-sm text-gray-600">المسؤول: {task.assignedTo}</p>
          <select
            className="mt-2 border p-1"
            value={task.status}
            onChange={(e) => handleStatusChange(task._id, e.target.value)}
          >
            <option value="قيد الإنجاز">قيد الإنجاز</option>
            <option value="منجز">منجز</option>
          </select>
        </div>
      ))}
    </div>
  );
}
