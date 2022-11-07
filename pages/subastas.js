import MainLayout from "@/components/layouts/MainLayout";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <MainLayout title="DemoPage" description="this is a demo page">
      <div className="content flex justify-center items-center w-full my-16">
        <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
          <div className="rounded-md shadow">
            <Link href="" passHref>
              <div className="thumbitem  cursor-pointer mx-4 mb-4  shadow-md">
                <div className="photocontainer">
                  <Image
                    src="/images/kawaii-coin.png"
                    alt=""
                    width={800}
                    height={600}
                    className="object-cover"
                  />
                </div>
                <div className="textcontainer pb-4 px-2">
                  <h2 className="title text-lg font-bold my-2">
                    Monedita kawaii Miaw!{" "}
                  </h2>
                  <p className="capitalize text-happy-pink-600 font-bold text-sm mb-4">
                    12/12/2021
                  </p>
                  <button className="bg-gray-200 px-2 rounded-md cursor-pointer">
                    Ver subasta
                  </button>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
