import React, { useState, useEffect } from "react";
import ButtonComponent from "../../SharedComponents/ButtonComponent";
import { createCampaign } from "@/redux/services/campaign";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useAuth } from "@/assets/hooks/use-auth";
import {
  previousStep,
  resetCampaignData,
} from "@/redux/features/stepper/campaign-stepper";
import CustomizedBackButton from "../../SharedComponents/CustomizedBackComponent";
import { setCurrentStep } from "@/redux/features/stepper/campaign-stepper";
import { IoMdCheckmark } from "react-icons/io";
import { FiExternalLink } from "react-icons/fi";
import { BsStars, BsCalendarDate } from "react-icons/bs";
import {
  MdOutlineSlowMotionVideo,
  MdOutlineFormatShapes,
} from "react-icons/md";
import { RiVideoUploadLine } from "react-icons/ri";
import Link from "next/link";
import { Modal, Checkbox, Tag } from "antd";
import { useRouter } from "next/navigation";
import { HiOutlineDocumentText, HiOutlineUserGroup, HiOutlineVideoCamera, HiOutlineCalendar, HiOutlineCheckCircle, HiOutlineExclamationCircle, HiOutlineArrowLeft } from "react-icons/hi";

const CampaignPreview = () => {
  const { campaignData } = useSelector((store) => store.campaign);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const auth = useAuth();
  const [termsOpen, setTermsOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isDraftMode, setIsDraftMode] = useState(false); // Track if saving as draft
  const router = useRouter();

  // --------- CURRENT DATE -----------//
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  // --------- CURRENT DATE -----------//

  // Refactored: addCampaign now takes isDraft argument
  const addCampaign = async (isDraft) => {
    let response;
    try {
      setLoading(true);
      const payload = { ...campaignData, isDraft };
      response = await createCampaign(auth, payload);
      if (response.status === 200) {
        toast.success(isDraft ? "Campaign saved as draft!" : "Campaign launched successfully!");
        setSuccess(true);
      } else {
        toast.error(
          response.response?.data.errorMessage?.[0] ||
            "Failed to create campaign."
        );
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.errorMessage?.[0] ||
        "Something went wrong while creating the campaign.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(setCurrentStep(3));
  }, [dispatch]);

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null;
    const options = {
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const getVideoStyleIcon = (style) => {
    switch (style.toLowerCase()) {
      case "how to":
        return "🎓";
      case "up to the creator":
        return "🎨";
      default:
        return "🎥";
    }
  };

  const handleViewCampaigns = async (e) => {
    e.preventDefault();
    await router.push("/brand/view-campaigns");
    dispatch(setCurrentStep(0));
    dispatch(resetCampaignData());
  };

  // Helper to update isDraft in Redux and then call addCampaign
  const handleCampaignAction = async (draft) => {
    // Update Redux state
    await dispatch({
      type: 'campaign/updateFormData',
      payload: { isDraft: draft },
    });
    // Wait for Redux to update, then call addCampaign
    setTimeout(() => {
      addCampaign(draft);
    }, 0);
  };

  return (
    <div className="relative min-h-[80vh] bg-gradient-to-br from-background via-white to-secondary/10 px-2 py-8 md:py-12 flex flex-col items-center justify-center">
      {success ? (
        <div className="flex items-center justify-center min-h-[60vh] w-full">
          <section className="relative bg-white/90 rounded-2xl shadow-2xl p-10 max-w-lg w-full text-center border border-primary/10 overflow-hidden">
            {/* Confetti SVG */}
            <div className="absolute inset-0 pointer-events-none z-0">
              <svg
                className="w-full h-full"
                viewBox="0 0 400 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="50" cy="30" r="6" fill="#fbbf24" fillOpacity=".7" />
                <circle
                  cx="350"
                  cy="60"
                  r="5"
                  fill="#34d399"
                  fillOpacity=".7"
                />
                <circle
                  cx="200"
                  cy="20"
                  r="4"
                  fill="#60a5fa"
                  fillOpacity=".7"
                />
                <circle
                  cx="100"
                  cy="120"
                  r="7"
                  fill="#f472b6"
                  fillOpacity=".7"
                />
                <circle
                  cx="300"
                  cy="150"
                  r="6"
                  fill="#f87171"
                  fillOpacity=".7"
                />
                <circle
                  cx="370"
                  cy="110"
                  r="4"
                  fill="#a78bfa"
                  fillOpacity=".7"
                />
                <circle
                  cx="30"
                  cy="170"
                  r="5"
                  fill="#34d399"
                  fillOpacity=".7"
                />
                <circle
                  cx="180"
                  cy="180"
                  r="6"
                  fill="#fbbf24"
                  fillOpacity=".7"
                />
              </svg>
            </div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg mb-6 animate-bounce">
                <svg
                  className="h-12 w-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-extrabold text-primary mb-2">
                Campaign Created Successfully!
              </h2>
              <p className="text-gray-600 mb-8">
                Your campaign is now live and ready for creators to discover.
                What would you like to do next?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <button
                  onClick={() => {
                    setSuccess(false);
                    dispatch(resetCampaignData());
                    dispatch(setCurrentStep(0));
                  }}
                  className="flex-1 px-2 text-sm py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold shadow hover:from-primary-dark hover:to-secondary-dark transition-all duration-200"
                >
                  Create Another Campaign
                </button>
                <Link
                  href="/brand/view-campaigns"
                  onClick={handleViewCampaigns}
                  className="flex-1 px-2 text-sm py-3 rounded-lg border-2 border-primary text-primary font-semibold bg-white shadow hover:bg-primary/10 transition-all duration-200 flex items-center justify-center"
                >
                  View My Campaigns
                </Link>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <>
          <div className="w-full max-w-4xl mx-auto">
            {/* Header Card */}
            <div className="relative rounded-3xl shadow-xl bg-white/90 border border-primary/10 overflow-hidden mb-8">
              {/* Cover Image as Hero Banner */}
              <div className="relative h-48 md:h-64 w-full overflow-hidden">
                <img
                  src={campaignData.coverImage?.url || "/placeholder-beauty.jpg"}
                  alt="Campaign Cover"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <Tag color={campaignData.isDraft ? 'orange' : 'green'} className="text-xs font-semibold px-3 py-1 rounded-full shadow">
                    {campaignData.isDraft ? 'Draft' : 'Live'}
                  </Tag>
                </div>
              </div>
              {/* Title & Description */}
              <div className="px-8 py-6">
                <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2 flex items-center gap-2">
                  <HiOutlineDocumentText className="inline-block text-secondary text-2xl" />
                  {campaignData.title || <span className="text-gray-400">Untitled Campaign</span>}
                </h1>
                <p className="text-lg text-gray-600 mb-2 font-light">
                  {campaignData.description || <span className="text-gray-400">No description provided.</span>}
                </p>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Timeline Card */}
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-6 shadow border border-input">
                <div className="flex items-center gap-2 mb-2">
                  <HiOutlineCalendar className="text-primary text-xl" />
                  <span className="font-semibold text-color">Timeline</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-gray-500">Start: <span className="font-medium text-color">{formatDate(campaignData.startDate) || 'N/A'}</span></span>
                  <span className="text-sm text-gray-500">End: <span className="font-medium text-color">{formatDate(campaignData.endDate) || 'N/A'}</span></span>
                </div>
              </div>
              {/* Video Requirements Card */}
              <div className="bg-gradient-to-br from-secondary/10 to-primary/10 rounded-2xl p-6 shadow border border-input">
                <div className="flex items-center gap-2 mb-2">
                  <HiOutlineVideoCamera className="text-secondary text-xl" />
                  <span className="font-semibold text-color">Video Requirements</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-gray-500">Videos per Creator: <span className="font-medium text-color">{campaignData.campaignPreferences.videosPerCreator || 'N/A'}</span></span>
                  <span className="text-sm text-gray-500">Duration: <span className="font-medium text-color">{campaignData.campaignPreferences.videoDuration ? `${campaignData.campaignPreferences.videoDuration}s` : 'N/A'}</span></span>
                  <span className="text-sm text-gray-500">Format: <span className="font-medium text-color capitalize">{campaignData.campaignPreferences.videoFormat || 'N/A'}</span></span>
                </div>
              </div>
              {/* Social Channels Card */}
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-6 shadow border border-input">
                <div className="flex items-center gap-2 mb-2">
                  <HiOutlineUserGroup className="text-primary text-xl" />
                  <span className="font-semibold text-color">Social Channels</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {campaignData.campaignPreferences.socialChannels.length > 0 ? (
                    campaignData.campaignPreferences.socialChannels.map((ch, i) => (
                      <Tag key={i} color="blue" className="rounded-full px-3 py-1 text-xs font-medium">
                        {ch}
                      </Tag>
                    ))
                  ) : (
                    <span className="text-gray-400">No channels selected.</span>
                  )}
                </div>
              </div>
              {/* Video Styles Card */}
              <div className="bg-gradient-to-br from-secondary/10 to-primary/10 rounded-2xl p-6 shadow border border-input">
                <div className="flex items-center gap-2 mb-2">
                  <HiOutlineCheckCircle className="text-secondary text-xl" />
                  <span className="font-semibold text-color">Video Styles</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {campaignData.campaignPreferences.videoStyle.length > 0 ? (
                    campaignData.campaignPreferences.videoStyle.map((style, i) => (
                      <Tag key={i} color="green" className="rounded-full px-3 py-1 text-xs font-medium">
                        {getVideoStyleIcon(style)} {style}
                      </Tag>
                    ))
                  ) : (
                    <span className="text-gray-400">No styles selected.</span>
                  )}
                </div>
              </div>
            </div>

            {/* Creative Brief & Example Video */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Creative Brief Card */}
              <div className="bg-white rounded-2xl p-6 shadow border border-input flex flex-col gap-2">
                <div className="flex items-center gap-2 mb-2">
                  <HiOutlineDocumentText className="text-primary text-xl" />
                  <span className="font-semibold text-color">Creative Brief</span>
                </div>
                <span className="text-sm text-gray-500 font-semibold">{campaignData.briefTitle || <span className="text-gray-400">No brief title.</span>}</span>
                <p className="text-gray-600 font-light whitespace-pre-line text-sm">{campaignData.briefDescription || <span className="text-gray-400">No brief description provided.</span>}</p>
              </div>
              {/* Example Video Card */}
              <div className="bg-white rounded-2xl p-6 shadow border border-input flex flex-col gap-2">
                <div className="flex items-center gap-2 mb-2">
                  <HiOutlineVideoCamera className="text-secondary text-xl" />
                  <span className="font-semibold text-color">Example Video</span>
                </div>
                {campaignData.exampleVideoUrl ? (
                  <a href={campaignData.exampleVideoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-link hover:underline">
                    <HiOutlineExclamationCircle className="text-primary" />
                    <span className="truncate max-w-xs">{campaignData.exampleVideoUrl}</span>
                  </a>
                ) : (
                  <span className="text-gray-400">No example video provided.</span>
                )}
              </div>
            </div>
          </div>

          {/* Sticky Footer for Actions */}
          <div className="fixed bottom-0 left-0 w-full bg-white/95 border-t border-input shadow-lg z-50 flex flex-col md:flex-row items-center justify-center gap-4 py-4 px-4 md:px-0">
            {/* Back Button (now in footer) */}
            <ButtonComponent
              onClick={() => {
                dispatch(previousStep());
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              label={<span className="flex items-center gap-2"><HiOutlineArrowLeft className="text-lg" />Back</span>}
              className="max-w-xs w-full md:w-auto px-8 py-3 text-base font-semibold rounded-full border border-primary text-primary bg-white hover:bg-primary/10 transition-all duration-300"
            />
            <ButtonComponent
              onClick={() => {
                setIsDraftMode(true);
                setTermsOpen(true);
              }}
              label={loading ? "Saving..." : "Save as Draft"}
              className="max-w-xs w-full md:w-auto px-8 py-3 text-base font-semibold rounded-full bg-gradient-to-r from-yellow to-input text-gray shadow hover:bg-yellow/90 transition-all duration-300"
              disabled={loading}
            />
            <ButtonComponent
              onClick={() => {
                setIsDraftMode(false);
                setTermsOpen(true);
              }}
              label={loading ? "Launching..." : "Launch Campaign"}
              className="max-w-xs w-full md:w-auto px-8 py-3 text-base font-semibold rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:from-primary-dark hover:to-secondary-dark transition-all duration-300"
              disabled={loading}
            />
          </div>

          {/* Terms Modal (unchanged except for button color logic) */}
          <Modal
            open={termsOpen}
            onCancel={() => {
              setTermsOpen(false);
              setAgreed(false);
            }}
            footer={null}
            centered
            width={700}
            styles={{
              body: { maxHeight: "70vh", overflowY: "auto", padding: 32 },
            }}
          >
            <h2 className="text-xl font-bold mb-4 text-primary">
              Brand Campaign Submission Terms
            </h2>
            <div className="text-gray-700 text-sm mb-6 space-y-4">
              <div>
                <h3 className="font-bold text-base mb-1">
                  Grace Belgravia Influencer Platform
                </h3>
                <div>Brand Campaign Submission Terms</div>
                <div className="text-xs text-gray-500">
                  Effective Date: {formattedDate}
                </div>
                <div className="text-xs text-gray-500">
                  Governing Law: England and Wales
                </div>
                <div className="text-xs text-gray-500">
                  Company: LOXA HOLDINGS LTD
                </div>
                <div className="text-xs text-gray-500">
                  Registered Address: 71-75 Shelton Street, Covent Garden,
                  London, WC2H 9JQ
                </div>
                <div className="text-xs text-gray-500">
                  Correspondence Address: Office 7, Siddeley House, 50 Canbury
                  Park Rd, Kingston upon Thames, KT2 6LX
                </div>
                <div className="text-xs text-gray-500">
                  Website:{" "}
                  <a
                    href="https://gracebelgravia.com/"
                    className="underline text-primary"
                    target="_blank"
                  >
                    gracebelgravia.com
                  </a>
                </div>
                <div className="text-xs text-gray-500">
                  Email:{" "}
                  <a
                    href="mailto:info@gracebelgravia.com"
                    className="underline text-primary"
                  >
                    info@gracebelgravia.com
                  </a>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-1">1. Agreement to Terms</h4>
                <p>
                  By submitting a campaign brief or invitation through the
                  Grace Belgravia platform, you (the "Brand") agree to be
                  bound by the following Campaign Submission Terms in addition
                  to the platform's general Terms and Conditions. If you do
                  not agree to these terms, do not submit a campaign.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">
                  2. Authority and Representations
                </h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    The Brand confirms that it has full legal authority to
                    submit the campaign and bind its organisation to these
                    Terms.
                  </li>
                  <li>
                    The individual submitting the campaign affirms that they
                    are duly authorised to act on behalf of the Brand and
                    enter binding commercial agreements.
                  </li>
                  <li>
                    The Brand represents that it holds all necessary rights to
                    any materials, trademarks, images, logos, or creative
                    assets included in the campaign brief.
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-1">3. Campaign Content</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    All campaign briefs must clearly define the intended
                    deliverables, usage rights, payment or gifting terms,
                    deadlines, and any specific brand or content guidelines.
                  </li>
                  <li>
                    Campaigns must not contain:
                    <ul className="list-disc pl-5 mt-1">
                      <li>
                        Unlawful, defamatory, discriminatory, or misleading
                        content;
                      </li>
                      <li>
                        Instructions requiring influencers to violate
                        advertising laws or platform policies;
                      </li>
                      <li>Infringing or unlicensed copyrighted materials.</li>
                    </ul>
                  </li>
                  <li>
                    The Brand is solely responsible for the accuracy,
                    legality, and completeness of campaign content and
                    communications.
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-1">
                  4. Usage and Ownership Rights
                </h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    Unless otherwise agreed in writing, all influencer content
                    submitted for a paid or gifted campaign shall be treated
                    as "work for hire" and shall become the Brand's exclusive
                    property upon submission.
                  </li>
                  <li>
                    The Brand shall have the right to use, reproduce, edit,
                    display, distribute, and publish the content for
                    commercial and non-commercial purposes across all media,
                    including but not limited to digital, print, PR, email,
                    and paid media.
                  </li>
                  <li>
                    The Brand agrees to use the content in a lawful, ethical,
                    and non-defamatory manner.
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-1">
                  5. Compliance and Conduct
                </h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    The Brand agrees to comply with all applicable laws,
                    regulations, and platform rules, including the ASA
                    (Advertising Standards Authority) guidelines.
                  </li>
                  <li>
                    The Brand agrees to treat all influencers with
                    professionalism, fairness, and respect throughout the
                    duration of any campaign.
                  </li>
                  <li>
                    The Brand must not request off-platform engagement or
                    payments designed to bypass platform fees or rules.
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-1">
                  6. Cancellations and Disputes
                </h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    If the Brand wishes to cancel a live campaign or accepted
                    collaboration, written notice must be given, and any
                    reasonable incurred costs by the influencer must be
                    reimbursed.
                  </li>
                  <li>
                    In the event of a dispute regarding content or
                    performance, both parties agree to attempt resolution in
                    good faith.
                  </li>
                  <li>
                    The platform may offer informal mediation but shall not be
                    liable for resolving disputes between Brands and
                    Influencers.
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-1">
                  7. Indemnity and Liability
                </h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    The Brand agrees to indemnify LOXA HOLDINGS LTD and all
                    platform users against any third-party claims arising from
                    copyright infringement, unauthorised use of assets, or
                    campaign-related legal claims.
                  </li>
                  <li>
                    LOXA HOLDINGS LTD shall not be liable for any indirect,
                    incidental, or consequential damages arising from the
                    Brand's use of the platform or campaign outcomes.
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-1">
                  8. Governing Law and Jurisdiction
                </h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    These Terms shall be governed by the laws of England and
                    Wales.
                  </li>
                  <li>
                    Any disputes shall be subject to the exclusive
                    jurisdiction of the courts of England and Wales.
                  </li>
                </ul>
              </div>
              <div className="text-xs text-gray-500 pt-2">
                For questions or clarifications about these terms, please
                contact{" "}
                <a
                  href="mailto:info@gracebelgravia.com"
                  className="underline text-primary"
                >
                  info@gracebelgravia.com
                </a>
                .
              </div>
            </div>
            <Checkbox
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mb-6 text-base"
            >
              I have read and agree to the Brand Campaign Submission Terms
            </Checkbox>
            <div className="flex justify-end gap-4">
              <ButtonComponent
                onClick={() => {
                  setTermsOpen(false);
                  setAgreed(false);
                }}
                label="Cancel"
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium"
              />
              <ButtonComponent
                onClick={async () => {
                  await addCampaign(isDraftMode);
                  setTermsOpen(false);
                  setAgreed(false);
                }}
                label={loading ? (isDraftMode ? "Saving..." : "Publishing...") : (isDraftMode ? "Save as Draft" : "Publish")}
                className={
                  isDraftMode
                    ? "px-8 py-2 bg-yellow text-gray-700 rounded-lg font-semibold shadow"
                    : "px-8 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold shadow"
                }
                disabled={!agreed || loading}
              />
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};

export default CampaignPreview;
