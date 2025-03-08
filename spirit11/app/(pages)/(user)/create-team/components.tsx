import { User } from "lucide-react"; // Replace with the correct path or library

interface PlayerCardProps {
  name: string;
  university: string;
  stats: {
    points: number;
    batStrikeRate: number;
    batAverage: number;
    bowlStrikeRate: number;
    economy: number;
  };
  price: number;
  selected: boolean;
}

export function PlayerCard({ name, university, stats, price, selected }: PlayerCardProps) {
  return (
    <div className={`bg-white border rounded-lg ${selected ? "border-green-500 border-2" : "border-gray-200"}`}>
      <div className="p-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-gray-500" />
            </div>
            <div>
              <h3 className="font-medium">{name}</h3>
              <p className="text-sm text-gray-500">{university}</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:space-x-6 mt-4 md:mt-0">
            <div className="grid grid-cols-5 gap-3 w-full md:w-auto">
              <div className="text-center">
                <p className="text-xs text-gray-500">Points</p>
                <p className="font-medium">{stats.points}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Bat SR</p>
                <p className="font-medium">{stats.batStrikeRate}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Bat Avg</p>
                <p className="font-medium">{stats.batAverage}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Bowl SR</p>
                <p className="font-medium">{stats.bowlStrikeRate || '-'}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Economy</p>
                <p className="font-medium">{stats.economy || '-'}</p>
              </div>
            </div>

            <div className="flex flex-col items-center mt-4 md:mt-0 md:ml-4">
              <p className="text-xs text-gray-500">Price</p>
              <p className="font-medium">${price}</p>
            </div>

            <button
              className={`mt-4 md:mt-0 md:ml-4 px-4 py-2 rounded-md ${
                selected 
                  ? "border border-red-500 text-red-500 hover:bg-red-50" 
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {selected ? "Remove" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface SelectedPlayerCardProps {
  name: string;
  university: string;
  type: string;
  price: number;
}

export function SelectedPlayerCard({ name, university, type, price }: SelectedPlayerCardProps) {
  return (
    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
          <User className="h-4 w-4 text-gray-500" />
        </div>
        <div>
          <p className="font-medium text-sm">{name}</p>
          <p className="text-xs text-gray-500">{university}</p>
        </div>
      </div>
      <div className="text-right">
        <span className="inline-block px-2 py-0.5 text-xs border border-gray-300 rounded-full mb-1">{type}</span>
        <p className="text-xs font-medium">${price}</p>
      </div>
    </div>
  );
}