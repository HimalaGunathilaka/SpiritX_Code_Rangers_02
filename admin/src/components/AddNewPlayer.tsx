import { useState } from 'react';

interface AddNewPlayerProps {
  onClose: () => void;
}

export default function AddNewPlayer({ onClose }: AddNewPlayerProps) {
  const [newPlayer, setNewPlayer] = useState({
    name: '',
    university: '',
    category: 'Batsman',
    totalruns: 0,
    ballsfaced: 0,
    inningsplayed: 0,
    wickets: 0,
    overbowled: 0,
    runsconceded: 0,
    available: true,
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewPlayer((prev) => ({
      ...prev,
      [name]: name === 'available' ? value === 'true' : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch('/api/players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPlayer),
      });
      console.log('Response:', response);
      if (!response.ok) {
        setErrorMessage('Failed to add player');
        setTimeout(() => {
            setErrorMessage('');
        }
        , 5000);
        throw new Error('Failed to add player');
      }
      setSuccessMessage('Player added successfully!');
      setTimeout(() => {
        setSuccessMessage('');
        onClose();
      }, 3000); // Close the modal after 3 seconds
    } catch (error) {
      console.error(error);
      // alert('Failed to add player');
    } finally {
        setSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg">
    
    <h2 className="text-2xl font-bold text-green-900 mb-6">Add New Player</h2>
    
    {errorMessage && (
        <div className="fixed top-12 right-12 mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg shadow-lg transition-transform transform translate-x-0 ease-in-out duration-300">
            <img src="/x.svg" alt="cross" className="h-5 w-5 inline-block mr-2" />
            {errorMessage}
        </div>
    )}
    
    {successMessage && (
    <div className="fixed top-12 right-12 mb-4 p-4 text-sm text-green-700 bg-green-100 rounded-lg shadow-lg transition-transform transform translate-x-0 ease-in-out duration-300">
      <img src="/check.svg" alt="checkmark" className="h-5 w-5 inline-block mr-2" />
      {successMessage}
    </div>
    )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={newPlayer.name}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm text-gray-900 h-8 p-2 border border-gray-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">University</label>
          <input
            type="text"
            name="university"
            value={newPlayer.university}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm text-gray-900 h-8 p-2 border border-gray-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={newPlayer.category}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm text-gray-900 h-10 p-2 border border-gray-300"
            required
          >
            <option value="Batsman">Batsman</option>
            <option value="Bowler">Bowler</option>
            <option value="All-Rounder">All-Rounder</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Total Runs</label>
          <input
            type="number"
            name="totalruns"
            value={newPlayer.totalruns}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm text-gray-900 h-8 p-2 border border-gray-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Balls Faced</label>
          <input
            type="number"
            name="ballsfaced"
            value={newPlayer.ballsfaced}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm text-gray-900 h-8 p-2 border border-gray-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Innings Played</label>
          <input
            type="number"
            name="inningsplayed"
            value={newPlayer.inningsplayed}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm text-gray-900 h-8 p-2 border border-gray-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Wickets</label>
          <input
            type="number"
            name="wickets"
            value={newPlayer.wickets}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm text-gray-900 h-8 p-2 border border-gray-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Overs Bowled</label>
          <input
            type="number"
            name="overbowled"
            value={newPlayer.overbowled}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm text-gray-900 h-8 p-2 border border-gray-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Runs Conceded</label>
          <input
            type="number"
            name="runsconceded"
            value={newPlayer.runsconceded}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm text-gray-900 h-8 p-2 border border-gray-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Available</label>
          <select
            name="available"
            value={newPlayer.available ? 'true' : 'false'}
            onChange={(e) =>
              setNewPlayer((prev) => ({
                ...prev,
                available: e.target.value === 'true',
              }))
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm text-gray-900 h-10 p-2 border border-gray-300"
            required
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="mr-4 inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-300"
            disabled={submitting}
          >
            Add Player
          </button>
        </div>
      </form>
    </div>
  );
}