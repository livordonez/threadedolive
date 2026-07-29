export default function PageLoading() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-16 sm:px-10 lg:px-12">
      <div className="h-4 w-28 rounded-full bg-olive-100" />
      <div className="h-16 max-w-3xl rounded-[2rem] bg-white/70" />
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="h-[30rem] rounded-[2rem] bg-white/70" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
          <div className="h-52 rounded-[2rem] bg-white/70" />
          <div className="h-52 rounded-[2rem] bg-white/70" />
        </div>
      </div>
    </div>
  );
}
