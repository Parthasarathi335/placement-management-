import { ReactNode } from 'react';

type Props = {
  title: string;
  value: string | number;
  icon?: ReactNode;
  badgeColor?: string;
};

export default function DashboardCard({ title, value, icon, badgeColor }: Props) {
  return (
    <div className="bg-white rounded shadow p-4 flex items-center">
      {icon && <div className="mr-3 text-gray-600">{icon}</div>}
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl font-semibold">
          {value}{' '}
          {badgeColor && (
            <span className={`ml-2 px-2 py-0.5 rounded text-xs bg-${badgeColor}-100 text-${badgeColor}-800`}>
              {title}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}