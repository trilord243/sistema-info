interface ButtonProps {
  name: string;
}

export const Button: React.FC<ButtonProps> = ({ name }) => {
  return (
    <button
      type="button"
      className="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      {name}
    </button>
  );
};
