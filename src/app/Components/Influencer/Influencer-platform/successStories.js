import React from "react";

const SuccessStories = () => {
  return (
    <div className="md:px-12 px-4 my-4">
      <h1 className="text-3xl text-center font-bold mb-16">
        Read the Latest Success Stories
      </h1>
      <div className="space-y-8">
        <section className="flex gap-4 items-center">
          <div className="w-1/2 text-center space-y-4">
            <h1 className="font-bold">Marvin McKinney</h1>
            <q className="font-light text-sm">
              Then we discovered Influencer Platform, and we thought this would
              be a perfect match for us to generate that buzz we wanted with as
              little effort as possible
            </q>
            <div className="flex items-center justify-center">
              <img className="w-64" src="/images/1.png" alt="" />
            </div>
          </div>
          <div className="w-1/2 text-center space-y-4">
            <h1 className="font-bold">Guy Hawkins</h1>
            <q className="font-light text-sm">
              Before I joined, I struggled to find even 2-3 influencers per
              month. I've only been on Influencer platform for a few weeks, and
              we've already collaborated with over 20 influencers and the
              results are great! Our sales are up and there is a real buzz being
              generated around our brand
            </q>
            <div className="flex items-center justify-center">
              <img className="w-64" src="/images/2.png" alt="" />
            </div>
          </div>
        </section>
        <section className="flex gap-4 items-center">
          <div className="w-1/2 text-center space-y-4">
            <h1 className="font-bold">Robert Fox</h1>
            <q className="font-light text-sm">
              Amazing app that has slashed our costs and time for working with
              influencers to generate UGC
            </q>
            <div className="flex items-center justify-center">
              <img className="w-64" src="/images/3.png" alt="" />
            </div>
          </div>
          <div className="w-1/2 text-center space-y-4">
            <h1 className="font-bold">Jane Doe</h1>
            <q className="font-light text-sm">
              The process is smooth and since using Influencer Platform, we have
              seen an increase in engagement on our social media outlets
            </q>
            <div className="flex items-center justify-center">
              <img className="w-64" src="/images/4.png" alt="" />
            </div>
          </div>
        </section>
        <section className="flex gap-4 items-center">
          <div className="w-1/2 text-center space-y-4">
            <h1 className="font-bold">Amil Amina</h1>
            <q className="font-light text-sm">
            The value I received for the $ spent is amazing 
            compared with the PR agency I worked before
            </q>
          </div>
          <div className="w-1/2 text-center space-y-4">
            <div className="flex items-center justify-center">
              <img className="w-64" src="/images/5.png" alt="" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SuccessStories;
