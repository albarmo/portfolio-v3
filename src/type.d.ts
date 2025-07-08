interface I_Module {
  id: string;
  name: string;
  icon: string;
  path: string;
}

type Params = Promise<{ [key: string]: string | string[] | undefined }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

type T_AttributeSize = "none" | "sm" | "md" | "lg" | "xl" | "full";
type T_TextAttributeSize = "sm" | "md" | "lg" | "xl";
type T_SelectOptions = { label: string; value: string };
type T_AttributeRounded = T_AttributeSize;

type T_AppModules = Array<I_Module>;

type StockUnit = "kg" | "g" | "pcs" | "buah";
type SizeUnit = "cm" | "kg";
type PromotionType = "percentage";

type Currency = "IDR" | "USD";

interface Tab {
  id: string;
  name: string;
  path: string;
}

interface TabState {
  listTab: Tab[];
  activeTab: string;
}
