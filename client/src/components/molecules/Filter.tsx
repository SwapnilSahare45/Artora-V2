import FilterDropdown from "../atoms/FilterDropdown";

const Filter = () => {
  const mediumOptions = [
    "Traditional Art",
    "Digital Art",
    "Photography",
    "Sculpture",
    "Oil on Canvas",
    "Mixed Media",
  ];

  const styleOptions = [
    "Abstract",
    "Realism",
    "Minimalism",
    "Pop Art",
    "Impressionism",
    "Contemporary",
  ];

  const priceOptions = [
    "Under ₹5,000",
    "₹5,000 - ₹15,000",
    "₹15,000 - ₹50,000",
    "₹50,000+",
  ];

  const availabilityOptions = ["Available", "On Auction", "Recently Sold"];

  const sortOptions = [
    "Newest First",
    "Price: Low to High",
    "Price: High to Low",
    "Most Viewed",
  ];

  return (
    <div className="hidden lg:flex items-center gap-8">
      <FilterDropdown
        label="Price Range"
        options={priceOptions}
        paramName="price"
      />
      <FilterDropdown
        label="Medium"
        options={mediumOptions}
        paramName="medium"
      />
      <FilterDropdown label="Style" options={styleOptions} paramName="style" />
      <FilterDropdown
        label="Availability"
        options={availabilityOptions}
        paramName="available"
      />

      <div className="h-4 w-px bg-glass mx-2" aria-hidden="true" />

      {/* Sorting */}
      <FilterDropdown label="Sort By" options={sortOptions} paramName="sort" />
    </div>
  );
};

export default Filter;
