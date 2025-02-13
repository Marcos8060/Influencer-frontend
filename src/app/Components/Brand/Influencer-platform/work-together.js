import Link from "next/link";
import React from "react";
import { MdArrowRightAlt } from "react-icons/md";

const WorkTogether = () => {
  return (
    <section className="md:flex items-center justify-between gap-8 md:px-12 px-4 md:space-y-0 space-y-2">
      <div className="md:w-1/2 w-full">
        <h1 className="md:text-5xl text-2xl font-bold">
          Work together <br /> wherever you are
        </h1>
        <p>
          In the office, remote, or a mix of the two, with Miro, your team{" "}
          <br /> can connect, collaborate, and co-create in one space no matter
          where you are
        </p>
        <Link
          href="/brand/influencer-platform"
          className="text-primary flex items-center gap-2 underline text-sm"
        >
          Learn More
          <MdArrowRightAlt />
        </Link>
      </div>
      <div className="flex flex-wrap md:gap-4 md:w-1/2 md:space-y-0 space-y-2">
        <img
          className="rounded-3xl h-[50vh] md:w-44 w-full object-cover"
          src="https://images.pexels.com/photos/4050294/pexels-photo-4050294.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
        />
        <img
          className="rounded-3xl h-[50vh] md:w-44 w-full object-cover"
          src="https://images.pexels.com/photos/2379886/pexels-photo-2379886.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <img
          className="rounded-3xl h-[50vh] md:w-44 w-full object-cover"
          src="https://images.pexels.com/photos/4050294/pexels-photo-4050294.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
        />
      </div>
    </section>
  );
};

export default WorkTogether;
