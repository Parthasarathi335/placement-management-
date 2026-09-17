type Props = { percentage: number };
export default function ProgressBar({ percentage }: Props) {
  return (
    <div className="w-full bg-gray-200 rounded h-4 overflow-hidden">
      <div className="bg-blue-600 h-4" style={{ width: `${percentage}%` }} />
    </div>
  );
}