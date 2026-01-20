import FilterDropdown from "../atoms/FilterDropdown";
import { ART_CATEGORIES, ART_MEDIUMS } from "@/types";

const Filter = () => {
  // Category filter options
  const categoryOptions = ART_CATEGORIES.map((cat) => ({
    value: cat,
    label: cat,
  }));

  // Medium filter options
  const mediumOptions = ART_MEDIUMS.map((med) => ({
    value: med,
    label: med,
  }));

  // Price range options
  const priceOptions = [
    { value: "0-5000", label: "Under ₹5,000" },
    { value: "5000-15000", label: "₹5,000 - ₹15,000" },
    { value: "15000-50000", label: "₹15,000 - ₹50,000" },
    { value: "50000-999999999", label: "₹50,000+" },
  ];

  // Sort options
  const sortOptions = [
    { value: "createdAt-desc", label: "Newest First" },
    { value: "createdAt-asc", label: "Oldest First" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "title-asc", label: "Title: A to Z" },
    { value: "title-desc", label: "Title: Z to A" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-8">
      <FilterDropdown
        label="Category"
        options={categoryOptions}
        paramName="category"
      />
      <FilterDropdown
        label="Medium"
        options={mediumOptions}
        paramName="medium"
      />
      <FilterDropdown
        label="Price Range"
        options={priceOptions}
        paramName="priceRange"
      />

      <div className="h-4 w-px bg-glass mx-2" />

      {/* Sorting */}
      <FilterDropdown label="Sort By" options={sortOptions} paramName="sort" />
    </div>
  );
};

export default Filter;
