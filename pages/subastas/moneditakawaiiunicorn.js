import MainLayout from "@/components/layouts/MainLayout";
import Link from "next/link";
import Image from "next/image";
import Countdown from "@/components/common/Countdown";

export default function Home() {
  return (
    <MainLayout title="Subastas" description="página de subastas">
      <div className="content flex justify-center items-center w-full my-16">
        <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
          <div className="rounded-md shadow">
            <Link href="/subastas/moneditakawaiiunicorn" passHref>
              <div className="thumbitem  cursor-pointer mx-4 mb-4  shadow-md">
                <div className="photocontainer">
                  <Image
                    src="/images/monedita-kawaii-unicorn.png"
                    alt=""
                    width={512}
                    height={512}
                    className="object-cover"
                  />
                </div>
                <div className="textcontainer pb-4 px-2">
                  <p className="flex w-24 bg-green-500  text-white px-2 rounded-md gont-bold text-sm mt-2">
                    En subasta
                  </p>
                  <h2 className="title text-lg font-bold my-2">
                    Monedita kawaii unicorn!{" "}
                  </h2>
                  <p className="capitalize text-happy-pink-600 font-bold text-sm mb-4">
                    13/11/2022
                  </p>
                  <Countdown date="2022-11-13" />
                  <div className="rounded-md shadow">
                    <a
                      href="/subastas"
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-yellow-600 px-8 py-3 text-base font-medium text-white hover:bg-yellow-700 md:py-4 md:px-10 md:text-lg"
                    >
                      Pujar
                    </a>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
