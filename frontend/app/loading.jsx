import Image from "next/image";

export default async function Loading() {

  return (
    <main className="loading-screen flex min-h-dvh items-center justify-center bg-white px-4 py-8 sm:px-6">
      <section
        className="loading-panel w-full max-w-sm text-center"
        aria-live="polite"
        aria-busy="true"
      >
        <Image
          src="/logo.png"
          alt="Campusforum"
          width={100}
          height={100}
          className="loading-logo mx-auto h-auto w-20 object-contain sm:w-24 md:w-32"
          priority
        />
        <h1 className="mt-4 text-xl font-semibold tracking-tight text-neutral-950 sm:text-2xl">
          Campusforum
        </h1>
        <p className="mt-2 text-sm leading-6 text-neutral-500 sm:text-base">
          Getting things ready for you...
        </p>
        <div
          className="loading-track relative mx-auto mt-8 h-1.5 w-full overflow-hidden rounded-full bg-neutral-100"
          role="progressbar"
          aria-label="Loading"
        >
          <div className="loading-slide absolute inset-y-0 left-0 w-2/5 rounded-full bg-neutral-950" />
        </div>
      </section>
    </main>
  );
}
