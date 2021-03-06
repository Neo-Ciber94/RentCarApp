import { Line } from "./Line";

export function Title({ title }: { title: string }) {
  return (
    <div className="mb-5 mt-4">
      <h2 className="font-bold text-2xl text-red-600">{title}</h2>
      <Line />
    </div>
  );
}
