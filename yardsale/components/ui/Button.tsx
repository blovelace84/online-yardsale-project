type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      className="w-full rounded-lg bg-black py-2.5 text-sm font-medium text-white
                 hover:bg-gray-800 transition
                 disabled:opacity-50 disabled:cursor-not-allowed"
    />
  );
}
