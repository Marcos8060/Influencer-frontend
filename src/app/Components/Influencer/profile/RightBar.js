"use client";
import React, { useEffect, useState } from "react";
import EditBioModal from "./edit-bio";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllInfluencerOnboarding,
  fetchAllInfluencerPreferences,
} from "@/redux/features/influencer/profile";
import { useAuth } from "@/assets/hooks/use-auth";
import EditPreferencesModal from "./edit-preferences";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import EditOnboardingModal from "./edit-onboarding";

const RightBar = () => {
  const { influencerPreferences, influencerOnboarding } = useSelector(
    (store) => store.influencerProfile
  );
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const auth = useAuth();

  useEffect(() => {
    if (auth && Object.keys(influencerPreferences).length === 0) {
      setLoading(true);
      dispatch(fetchAllInfluencerPreferences(auth))
        .then(() => {})
        .catch(() => {
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [auth, influencerPreferences]);

  useEffect(() => {
    if (auth && Object.keys(influencerOnboarding).length === 0) {
      setLoading(true);
      dispatch(fetchAllInfluencerOnboarding(auth))
        .then(() => {})
        .catch(() => {
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [auth, influencerOnboarding]);
  return (
    <section className="space-y-4">
      <div className="bg-white shadow-sm rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-secondary">Your Bio</h2>
          <EditBioModal {...{ influencerOnboarding }} />
        </div>
        <p className="text-xs text-color">
          {influencerOnboarding.bio}
        </p>
      </div>
      {loading ? (
        <Skeleton
          baseColor="#E6E7EB"
          highlightColor="#f0f0f0"
          count={3}
          height={100}
        />
      ) : (
        <section className="space-y-4">
          <div className="bg-white shadow-sm rounded-lg p-4 space-y-3 w-full">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-color">Preferences</h2>
              <EditPreferencesModal {...{ influencerPreferences }} />
            </div>
            <section className="flex items-center gap-4 border-b border-input py-2">
              <div>
                <p className="text-sm text-color">Preferred Brands:</p>
              </div>
              <div className="flex items-center gap-1">
                {influencerPreferences?.preferredBrands?.map((brand, index) => (
                  <small
                    className="bg-secondary text-white py-1 px-3 text-[10px] rounded-3xl"
                    key={index}
                  >
                    {brand}
                  </small>
                ))}
              </div>
            </section>
            <section className="flex items-center gap-4 border-b border-input py-2">
              <div>
                <p className="text-sm text-color">Preferred Content:</p>
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-1">
                {influencerPreferences?.preferredCollaborationContentFormat?.map(
                  (brand, index) => (
                    <p
                      className="bg-secondary text-white py-1 px-3 text-[10px] rounded-3xl"
                      key={index}
                    >
                      {brand}
                    </p>
                  )
                )}
              </div>
            </section>
            <section className="flex items-center gap-4">
              <div>
                <p className="text-sm text-color">Preferred Companies:</p>
              </div>
              <div className="flex items-center gap-1">
                {influencerPreferences?.preferredCompaniesType?.map(
                  (brand, index) => (
                    <small
                      className="bg-secondary text-white py-1 px-3 text-[10px] rounded-3xl"
                      key={index}
                    >
                      {brand}
                    </small>
                  )
                )}
              </div>
            </section>
          </div>
          <div className="bg-white shadow-sm rounded-lg p-4 space-y-3 w-full">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-color">Onboarding Information</h2>
              <EditOnboardingModal {...{ influencerOnboarding }} />
            </div>
            {/* START OF FIRST ROW */}
            <section className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div>
                  <p className="text-sm text-muted">Ethnic Background:</p>
                </div>
                <div className="flex items-center gap-2">
                  {influencerOnboarding?.ethnicBackground?.map(
                    (brand, index) => (
                      <small className="text-color" key={index}>
                        {brand}
                      </small>
                    )
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div>
                  <p className="text-sm text-muted">Country:</p>
                </div>
                <div>
                  <small className="text-color">
                    {influencerOnboarding.country}
                  </small>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div>
                  <p className="text-sm text-muted">City:</p>
                </div>
                <div>
                  <small className="text-color">
                    {influencerOnboarding.city}
                  </small>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div>
                  <p className="text-sm text-muted">Zip Code:</p>
                </div>
                <div>
                  <small className="text-color">
                    {influencerOnboarding.zipCode}
                  </small>
                </div>
              </div>
            </section>
            {/* END OF FIRST ROW */}
            {/* START OF SECOND ROW */}
            <section className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div>
                  <p className="text-sm text-muted">Categories:</p>
                </div>
                <div className="flex items-center gap-2">
                  {influencerOnboarding?.contentCategories?.map(
                    (brand, index) => (
                      <small
                        className="bg-secondary text-white py-1 px-3 text-[10px] rounded-3xl"
                        key={index}
                      >
                        {brand}
                      </small>
                    )
                  )}
                </div>
              </div>
            </section>
            {/* END OF SECOND ROW */}
          </div>
        </section>
      )}
    </section>
  );
};

export default RightBar;
