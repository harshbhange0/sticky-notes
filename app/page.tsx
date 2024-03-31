

import AppBar from "./components/appbar";
import Sidebar from "./components/sidebar";

export default function Home() {


  return (
    <>
      <AppBar />
      <section className="w-full flex flex-col sm:flex-row min-h-[calc(100vh-57px)]">
        <Sidebar className={" hidden sm:flex sm:basis-[30%]"} />
        <main></main>
      </section>
    </>
  );
}
