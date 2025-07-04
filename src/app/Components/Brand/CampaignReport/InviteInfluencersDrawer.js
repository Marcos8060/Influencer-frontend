import React, { useEffect, useState } from "react";
import { Drawer, Input, Button, List, Avatar, Checkbox, Tag, Space, Spin, message, Select } from "antd";
import { SearchOutlined, InstagramOutlined, TikTokOutlined, CheckCircleTwoTone, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { country_names } from "@/app/Components/country-names";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSearchResults } from "@/redux/features/influencer/filter";

// Placeholder API for sending invites (replace with your real API call)
async function sendInvite(auth, campaignId, influencerIds) {
  // Simulate API call
  // Replace with your real API logic
  return { success: true };
}

function getCountryFlag(countryName) {
  const country = country_names.find(c => c.name === countryName);
  if (country && country.code) {
    return (
      <span className="mr-1">
        <img
          src={`https://flagcdn.com/24x18/${country.code.toLowerCase()}.png`}
          alt={country.name}
          style={{ width: 20, height: 14, borderRadius: 2, objectFit: "cover", display: "inline-block" }}
        />
      </span>
    );
  }
  return null;
}

const platformBadges = (influencer) => (
  <Space>
    {influencer.isInstagramConnected && <InstagramOutlined style={{ color: "#E1306C" }} />}
    {influencer.isTiktokConnected && <TikTokOutlined style={{ color: "#000" }} />}
  </Space>
);

// Influencer filter constants
const categories = [
  "Adult & 18+",
  "Apparel & Fashion",
  "Arts & Culture",
  "Beauty & Skincare",
  "Business & Finance",
  "Crypto & Web3",
  "Dating & Relationships",
  "Education & Learning",
  "E-commerce & Startups",
  "Entertainment & Pop Culture",
  "Fitness & Sports",
  "Food & Drink",
  "Gaming & Esports",
  "Health & Wellness",
  "Home & Lifestyle",
  "Lifestyle & Self-Development",
  "Luxury & Aspirational Living",
  "Men's Interests",
  "Music & Audio",
  "Other / Miscellaneous",
  "Parenting & Family",
  "Pets & Animals",
  "Photography & Visual Media",
  "Politics & Society",
  "Spirituality & Mindfulness",
  "Sustainability & Green Living",
  "Tech & Gadgets",
  "Toys, Crafts & Hobbies",
  "Travel & Leisure",
  "Vegan & Plant-Based",
  "Women's Interests",
];
const genders = ["Male", "Female"];

export default function InviteInfluencersDrawer({ open, onClose, campaignId, onInvited, auth }) {
  const dispatch = useDispatch();
  const { searchResults } = useSelector((store) => store.filterResults);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [nextCursor, setNextCursor] = useState(null);
  const [prevCursor, setPrevCursor] = useState(null);
  const [cursor, setCursor] = useState(null);
  const [sending, setSending] = useState(false);
  const pageSize = 10;

  // Influencer filters state
  const [filters, setFilters] = useState({
    fullName: "",
    categories: [],
    gender: "",
    country: "",
    city: "",
    page_size: pageSize,
  });

  // Get unique countries and cities for Selects
  const availableCountries = Array.from(
    new Set(searchResults?.results?.map((i) => i.country?.name || i.country).filter(Boolean))
  );
  const cities = Array.from(
    new Set(searchResults?.results?.map((i) => i.city).filter(Boolean))
  );

  // Handle filter change
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCursor(null); // Reset to first page
  };

  // Fetch influencers using Redux action
  const fetchResults = (customCursor = null, customFilters = null) => {
    setLoading(true);
    const payload = {
      ...filters,
      ...(customFilters || {}),
      cursor: customCursor || null,
      page_size: pageSize,
    };
    // Remove empty values
    Object.keys(payload).forEach((key) => {
      if (
        payload[key] === "" ||
        payload[key] === null ||
        (Array.isArray(payload[key]) && payload[key].length === 0) ||
        (typeof payload[key] === "object" &&
          payload[key] !== null &&
          Object.keys(payload[key]).length === 0)
      ) {
        delete payload[key];
      }
    });
    // Map fullName to full_name for backend
    if (payload.fullName) {
      payload.full_name = payload.fullName;
      delete payload.fullName;
    }
    dispatch(fetchAllSearchResults(auth, payload)).then((response) => {
      const getCursorParam = (url) => {
        try {
          return url ? new URL(url).searchParams.get("cursor") : null;
        } catch (e) {
          return null;
        }
      };
      setNextCursor(getCursorParam(response?.next));
      setPrevCursor(getCursorParam(response?.previous));
      setCursor(customCursor || null);
      setLoading(false);
    });
  };

  // Fetch on filters or auth change
  useEffect(() => {
    if (open && auth) {
      fetchResults(null);
      setSelected([]);
      setSearch("");
    }
    // eslint-disable-next-line
  }, [open, auth]);

  useEffect(() => {
    if (open && auth) {
      fetchResults(null);
    }
    // eslint-disable-next-line
  }, [filters]);

  // Search handler
  const handleSearch = (e) => {
    setSearch(e.target.value);
    handleFilterChange("fullName", e.target.value);
  };

  // Selection logic
  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };
  const selectAll = () => setSelected((searchResults?.results || []).map((i) => i.influencerId));
  const clearAll = () => setSelected([]);

  // Send invite
  const handleInvite = async () => {
    setSending(true);
    try {
      const res = await sendInvite(auth, campaignId, selected);
      if (res.success) {
        message.success("Invitations sent!");
        if (onInvited) onInvited(selected);
        onClose();
      } else {
        message.error("Failed to send invites.");
      }
    } catch {
      message.error("Failed to send invites.");
    } finally {
      setSending(false);
    }
  };

  return (
    <Drawer
      title="Invite Influencers"
      placement="right"
      width={500}
      onClose={onClose}
      open={open}
      destroyOnClose
      footer={null}
    >
      {/* Influencer Filters Bar */}
      <div className="mb-4 flex flex-col gap-2">
        <Input
          placeholder="Search by name..."
          prefix={<SearchOutlined />}
          value={filters.fullName}
          onChange={handleSearch}
          allowClear
        />
        <Space wrap>
          <Select
            mode="multiple"
            placeholder="Content Categories"
            value={filters.categories}
            onChange={(val) => handleFilterChange("categories", val)}
            style={{ minWidth: 180 }}
            maxTagCount={2}
            options={categories.map((category) => ({ value: category, label: category }))}
          />
          <Select
            mode="multiple"
            placeholder="Gender"
            value={filters.gender ? [filters.gender] : []}
            onChange={(val) => handleFilterChange("gender", val[0] || "")}
            style={{ minWidth: 120 }}
            options={genders.map((gender) => ({ value: gender, label: gender }))}
          />
          <Select
            mode="multiple"
            placeholder="Country"
            value={filters.country ? [filters.country] : []}
            onChange={(val) => handleFilterChange("country", val[0] || "")}
            style={{ minWidth: 140 }}
            maxTagCount={1}
            options={country_names.map((country) => ({ value: country.name, label: country.name }))}
          />
          <Select
            mode="multiple"
            placeholder="City"
            value={filters.city ? [filters.city] : []}
            onChange={(val) => handleFilterChange("city", val[0] || "")}
            style={{ minWidth: 140 }}
            maxTagCount={1}
            options={cities.map((city) => ({ value: city, label: city }))}
          />
          <Button onClick={selectAll} size="small">Select All</Button>
          <Button onClick={() => setFilters({ fullName: '', categories: [], gender: '', country: '', city: '', page_size: pageSize })} size="small">Clear Filters</Button>
        </Space>
      </div>
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Spin size="large" />
        </div>
      ) : (
        <List
          dataSource={searchResults?.results || []}
          rowKey="influencerId"
          renderItem={(inf) => (
            <List.Item
              actions={[
                <Checkbox
                  checked={selected.includes(inf.influencerId)}
                  onChange={() => toggleSelect(inf.influencerId)}
                  aria-label={`Select ${inf.fullName}`}
                />,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={inf.profilePicture} size={48} />}
                title={
                  <Space>
                    {inf.fullName}
                    {getCountryFlag(inf.country?.name)}
                    <span className="text-xs text-gray-500">{inf.country?.name}</span>
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      )}
      <div className="flex justify-between items-center mt-4">
        <Button
          icon={<LeftOutlined />}
          onClick={() => fetchResults(prevCursor, filters)}
          disabled={!prevCursor || loading}
        >
          Previous
        </Button>
        <Button
          icon={<RightOutlined />}
          onClick={() => fetchResults(nextCursor, filters)}
          disabled={!nextCursor || loading}
        >
          Next
        </Button>
        <button
          className={`${selected.length === 0 ? 'cursor-not-allowed' : ''} bg-gradient-to-r from-primary to-secondary px-2 py-2 rounded text-sm text-white`}
          disabled={selected.length === 0 || sending}
          loading={sending}
          onClick={handleInvite}
        >
          Invite Selected
        </button>
      </div>
    </Drawer>
  );
} 