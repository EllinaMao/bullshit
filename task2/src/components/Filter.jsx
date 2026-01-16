export default function Filter({ searchQuery, onSearchChange, sortConfig, onSortChange }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search by model..."
        value={searchQuery}
        onChange={onSearchChange}
      />
      <select
        onChange={onSortChange}
        value={sortConfig.key ? `${sortConfig.key}-${sortConfig.direction}` : ""}
      >
        <option value="">No sorting</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="year-asc">Year: Old to New</option>
        <option value="year-desc">Year: New to Old</option>
      </select>
    </div>
  );
}