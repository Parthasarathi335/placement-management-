export default function RegisterChoice() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center">Register as</h2>
      <a
        href="/auth/register/student"
        className="block w-full text-center py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Student
      </a>
      <a
        href="/auth/register/company"
        className="block w-full text-center py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Company
      </a>
      <a
        href="/auth/register/admin"
        className="block w-full text-center py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        Admin
      </a>
    </div>
  );
}