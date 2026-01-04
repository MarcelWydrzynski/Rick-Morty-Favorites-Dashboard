const Error = ({ errorMessage }: { errorMessage: string }) => {
   return (
    <div className="w-full text-center text-red-400 bg-zinc-900 border border-zinc-700 rounded-lg p-3">
      {errorMessage}
    </div>
  );
}

export default Error
