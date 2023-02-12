import { useProjects } from "@/lib/projects/queries";
import Link from "next/link";

export default function Page() {
  const { data: projects } = useProjects();
  return (
    <div className="  grid h-screen w-screen place-items-start">
      <table className="table-zebra table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Project Name</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, idx) => (
            <tr key={project.id}>
              <td>{idx}</td>
              <td>
                <Link
                  key={idx}
                  className="text-blue-500 underline hover:text-blue-700"
                  href={`/editor/${project.id}`}
                >
                  {project.name}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
