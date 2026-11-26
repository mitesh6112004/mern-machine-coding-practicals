
export const buildProductFilter = (query) => {
  const { search, category, brand, minPrice, maxPrice, minRating, inStock } =
    query;

  const filter = {};

  
  if (search && search.trim()) {
    const safeSearch = RegExp.escape(search.trim());
    filter.$or = [
      { name: { $regex: safeSearch, $options: "i" } },
      { brand: { $regex: safeSearch, $options: "i" } },
      { description: { $regex: safeSearch, $options: "i" } },
    ];
  }

  
  if (category && category.trim()) {
    filter.category = category.trim().toLowerCase();
  }


  if (brand && brand.trim()) {
    const safeBrand = RegExp.escape(brand.trim());
    filter.brand = { $regex: `^${safeBrand}$`, $options: "i" };
  }


  if (minPrice !== undefined || maxPrice !== undefined) {
    const priceFilter = {};
    const parsedMin = Number(minPrice);
    const parsedMax = Number(maxPrice);

    if (
      minPrice !== undefined &&
      minPrice !== "" &&
      !Number.isNaN(parsedMin) &&
      parsedMin >= 0
    ) {
      priceFilter.$gte = parsedMin;
    }
    if (
      maxPrice !== undefined &&
      maxPrice !== "" &&
      !Number.isNaN(parsedMax) &&
      parsedMax >= 0
    ) {
      priceFilter.$lte = parsedMax;
    }

    if (Object.keys(priceFilter).length > 0) {
      filter.price = priceFilter;
    }
  }

  
  if (minRating !== undefined && minRating !== "") {
    const parsedRating = Number(minRating);
    if (!Number.isNaN(parsedRating) && parsedRating >= 0 && parsedRating <= 5) {
      filter.rating = { $gte: parsedRating };
    }
  }

  
  if (inStock === "true") {
    filter.stock = { $gt: 0 };
  } else if (inStock === "false") {
    filter.stock = 0;
  }

  return filter;
};


export const parsePaginationAndSort = (query) => {
  const allowedSortFields = ["price", "rating", "createdAt", "name"];
  let sortOption = { createdAt: -1 }; 

  if (query.sort && typeof query.sort === "string") {
    const rawSort = query.sort.trim();
    const isDescending = rawSort.startsWith("-");
    const field = isDescending ? rawSort.slice(1) : rawSort;

    if (allowedSortFields.includes(field)) {
      sortOption = { [field]: isDescending ? -1 : 1 };
    }
  }

  const page = Math.max(1, parseInt(query.page, 10) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(query.limit, 10) || 10));
  const skip = (page - 1) * limit;

  return { page, limit, skip, sortOption };
};
