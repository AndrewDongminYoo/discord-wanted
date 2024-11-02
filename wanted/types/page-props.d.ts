export interface PageProps {
  filterData: FilterData;
  activeFilter: ActiveFilter;
  tags: Tags;
}

export interface ActiveFilter {
  country: Tag;
  jobSort: Tag;
  year: Tag[];
  locations: Tag[];
}

export interface Tag {
  selected: boolean;
  display: string;
  key: string;
  order?: number;
  locations?: Tag[];
  districts?: Tag[];
}

export interface FilterData {
  job_sort: Tag[];
  years: Tag[];
  countries: Tag[];
  employee_count: Tag[];
  company_tags: CompanyTag[];
  jobSorts: Tag[];
}

export interface CompanyTag {
  key: string;
  display: string;
  selected: boolean;
  is_multiple_choice: boolean;
  sub_tags: Tag[];
}

export interface Tags {
  category: Category[];
}

export interface Category {
  id: number;
  image: null | string;
  tags?: Category[];
  title: string;
  counts: Counts;
}

export interface Counts {
  job: number;
  user: number;
}
