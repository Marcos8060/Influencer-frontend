// Check if influencer is in any bucket
const isInBucket = bucketList.some((bucket) =>
  bucket.influencers.some((inf) => inf.id === influencer.influencerId)
);

// Check if influencer is in any campaign
const isInCampaign = brandCampaigns.some((campaign) =>
  campaign.collaborators.some(
    (collab) => collab.influencer === influencer.influencerId
  )
);

// Count buckets and campaigns
const bucketCount = bucketList.filter((bucket) =>
  bucket.influencers.some((inf) => inf.id === influencer.influencerId)
).length;

const campaignCount = brandCampaigns.filter((campaign) =>
  campaign.collaborators.some(
    (collab) => collab.influencer === influencer.influencerId
  )
).length; 