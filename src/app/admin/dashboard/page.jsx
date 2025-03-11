'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAdminAndFetchUsers = async () => {
      if (!isLoaded) return;
      
      try {
        const response = await fetch('/api/admin/users');
        if (!response.ok) {
          throw new Error('Not authorized or server error');
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    checkAdminAndFetchUsers();
  }, [isLoaded, router]);

  const handleStatusChange = async (userId, newStatus) => {
    try {
      const response = await fetch('/api/admin/users/status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, status: newStatus }),
      });
      
      if (!response.ok) throw new Error('Failed to update status');
      
      setUsers(users.map(user => 
        user._id === userId ? { ...user, status: newStatus } : user
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      const response = await fetch('/api/admin/users/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
      
      if (!response.ok) throw new Error('Failed to delete user');
      
      setUsers(users.filter(user => user._id !== userId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img className="h-10 w-10 rounded-full" src={user.profilePicture} alt="" />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {user.firstName} {user.lastName}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={user.status}
                    onChange={(e) => handleStatusChange(user._id, e.target.value)}
                    className="text-sm rounded-full px-3 py-1"
                    style={{
                      backgroundColor: 
                        user.status === 'approved' ? '#def7ec' :
                        user.status === 'rejected' ? '#fde8e8' :
                        '#fff7ed'
                    }}
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
