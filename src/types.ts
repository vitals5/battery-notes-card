export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: {
    friendly_name?: string;
    icon?: string;
    device_class?: string;
    unit_of_measurement?: string;
    battery_type?: string;
    battery_quantity?: number;
    battery_type_and_quantity?: string;
    battery_last_replaced?: string;
    battery_last_reported?: string;
    battery_last_reported_level?: number;
    battery_low?: boolean;
    battery_low_threshold?: number;
    device_id?: string;
    device_name?: string;
    source_entity_id?: string;
    note?: string;
    [key: string]: any;
  };
  last_changed?: string;
  last_updated?: string;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  language?: string;
  locale?: {
    language: string;
    number_format?: string;
    time_format?: string;
    date_format?: string;
  };
  areas?: Record<string, { area_id: string; name: string }>;
  devices?: Record<string, { id: string; name?: string; name_by_user?: string | null; area_id?: string | null; manufacturer?: string; model?: string }>;
  entities?: Record<string, { entity_id: string; device_id?: string; area_id?: string | null; name?: string; original_name?: string; translation_key?: string; platform?: string; [key: string]: any }>;
  connection?: {
    sendMessagePromise: <T = any>(message: { type: string; [key: string]: any }) => Promise<T>;
    [key: string]: any;
  };
  callService: (domain: string, service: string, serviceData?: Record<string, any>) => Promise<any>;
}

export interface DeviceRegistryEntry {
  id: string;
  name?: string | null;
  name_by_user?: string | null;
  area_id?: string | null;
  manufacturer?: string | null;
  model?: string | null;
}

export interface EntityRegistryEntry {
  entity_id: string;
  device_id?: string | null;
  area_id?: string | null;
  name?: string | null;
  original_name?: string | null;
  platform?: string | null;
  translation_key?: string | null;
}

export interface AreaRegistryEntry {
  area_id: string;
  name: string;
}

export interface HomeAssistantRegistries {
  entities?: Map<string, EntityRegistryEntry>;
  devices?: Map<string, DeviceRegistryEntry>;
  areas?: Map<string, AreaRegistryEntry>;
}

export interface CardColumnsConfig {
  name?: boolean;
  battery?: boolean;
  type?: boolean;
  last_replaced?: boolean;
  status?: boolean;
  note?: boolean;
  actions?: boolean;
}

export interface CardFilterConfig {
  battery_low_only?: boolean;
  threshold?: number;
  hide_unavailable?: boolean;
  search?: boolean;
}

export interface BatteryNotesCardConfig {
  type: string;
  title?: string;
  icon?: string;
  entities?: string[];
  exclude_entities?: string[];
  columns?: CardColumnsConfig;
  sort_by?: 'battery' | 'name' | 'type' | 'last_replaced' | 'status';
  sort_direction?: 'asc' | 'desc';
  filter?: CardFilterConfig;
  filter_low_only?: boolean;
  filter_threshold?: number;
  hide_unavailable?: boolean;
  show_header?: boolean;
  show_summary?: boolean;
  show_search?: boolean;
  show_filters?: boolean;
  compact?: boolean;
  confirm_replace?: boolean;
  max_rows?: number;
  device_names?: Record<string, string>;
}

export interface BatteryDeviceItem {
  id: string;
  deviceId?: string;
  sourceEntityId?: string;
  entityId: string;
  name: string;
  area?: string;
  batteryLevel: number | null;
  batteryType: string;
  batteryQuantity: number;
  batteryTypeAndQuantity: string;
  lastReplaced: Date | null;
  lastReplacedStr: string;
  lastReported: Date | null;
  lastReportedLevel?: number | null;
  isLow: boolean;
  note?: string;
  buttonEntityId?: string;
  isUnavailable: boolean;
  state: string;
}

export interface LovelaceCardEditor extends HTMLElement {
  setConfig(config: BatteryNotesCardConfig): void;
}
