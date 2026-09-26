import { LitElement, html, css, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { HomeAssistant, BatteryNotesCardConfig, CardColumnsConfig } from './types';
import { localize } from './localize';

export class BatteryNotesCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: BatteryNotesCardConfig;

  public setConfig(config: BatteryNotesCardConfig): void {
    this._config = { ...config };
  }

  private _valueChanged(ev: CustomEvent | Event, key: string, isColumn = false): void {
    if (!this._config) return;

    const target = ev.target as any;
    let value: any;

    if (target.type === 'checkbox' || target.checked !== undefined) {
      value = target.checked;
    } else if (target.type === 'number') {
      value = target.value === '' ? undefined : Number(target.value);
    } else if (target.value !== undefined) {
      value = target.value;
    }

    let newConfig: BatteryNotesCardConfig;

    if (isColumn) {
      const columns: CardColumnsConfig = {
        name: true,
        battery: true,
        type: true,
        last_replaced: true,
        status: true,
        note: false,
        actions: true,
        ...(this._config.columns || {}),
        [key]: Boolean(value),
      };
      newConfig = { ...this._config, columns };
    } else {
      newConfig = { ...this._config };
      if (value === undefined || value === '') {
        delete (newConfig as any)[key];
      } else {
        (newConfig as any)[key] = value;
      }
    }

    this._config = newConfig;

    const event = new CustomEvent('config-changed', {
      detail: { config: this._config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  protected render(): TemplateResult {
    if (!this._config) {
      return html``;
    }

    const lang = this.hass?.language || 'en';
    const cols = {
      name: true,
      battery: true,
      type: true,
      last_replaced: true,
      status: true,
      note: false,
      actions: true,
      ...(this._config.columns || {}),
    };

    return html`
      <div class="card-config">
        <!-- Basic Settings -->
        <div class="config-row">
          <label class="label">${localize('editor_title', lang)}</label>
          <input
            type="text"
            class="input-text"
            .value=${this._config.title ?? ''}
            placeholder=${localize('card_title', lang)}
            @input=${(e: Event) => this._valueChanged(e, 'title')}
          />
        </div>

        <div class="config-row">
          <label class="label">${localize('editor_icon', lang)}</label>
          <input
            type="text"
            class="input-text"
            .value=${this._config.icon ?? 'mdi:battery-heart-variant'}
            placeholder="mdi:battery-heart-variant"
            @input=${(e: Event) => this._valueChanged(e, 'icon')}
          />
        </div>

        <!-- Sorting -->
        <div class="config-row two-col">
          <div>
            <label class="label">${localize('editor_sort_by', lang)}</label>
            <select
              class="input-select"
              .value=${this._config.sort_by ?? 'battery'}
              @change=${(e: Event) => this._valueChanged(e, 'sort_by')}
            >
              <option value="battery">${localize('editor_col_battery', lang)}</option>
              <option value="name">${localize('editor_col_name', lang)}</option>
              <option value="type">${localize('editor_col_type', lang)}</option>
              <option value="last_replaced">${localize('editor_col_last_replaced', lang)}</option>
              <option value="status">${localize('editor_col_status', lang)}</option>
            </select>
          </div>

          <div>
            <label class="label">${localize('editor_sort_direction', lang)}</label>
            <select
              class="input-select"
              .value=${this._config.sort_direction ?? 'asc'}
              @change=${(e: Event) => this._valueChanged(e, 'sort_direction')}
            >
              <option value="asc">Ascending (0% -> 100% / A -> Z)</option>
              <option value="desc">Descending (100% -> 0% / Z -> A)</option>
            </select>
          </div>
        </div>

        <!-- Row Limits & Pagination -->
        <div class="config-row two-col">
          <div>
            <label class="label">${localize('editor_initial_rows', lang)}</label>
            <input
              type="number"
              min="1"
              class="input-text"
              .value=${this._config.initial_rows ?? ''}
              placeholder="All"
              @input=${(e: Event) => this._valueChanged(e, 'initial_rows')}
            />
          </div>

          <div>
            <label class="label">${localize('editor_step_rows', lang)}</label>
            <input
              type="number"
              min="1"
              class="input-text"
              .value=${this._config.step_rows ?? ''}
              placeholder="Same as initial"
              @input=${(e: Event) => this._valueChanged(e, 'step_rows')}
            />
          </div>
        </div>

        <!-- Filters & Display Options -->
        <div class="section-title">${localize('editor_show_filters', lang)} & Options</div>

        <div class="toggle-grid">
          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.show_header ?? true}
              @change=${(e: Event) => this._valueChanged(e, 'show_header')}
            />
            <span>${localize('editor_show_header', lang)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.show_summary ?? true}
              @change=${(e: Event) => this._valueChanged(e, 'show_summary')}
            />
            <span>${localize('editor_show_summary', lang)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.show_search ?? true}
              @change=${(e: Event) => this._valueChanged(e, 'show_search')}
            />
            <span>${localize('editor_show_search', lang)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.show_filters ?? true}
              @change=${(e: Event) => this._valueChanged(e, 'show_filters')}
            />
            <span>${localize('editor_show_filters', lang)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.compact ?? false}
              @change=${(e: Event) => this._valueChanged(e, 'compact')}
            />
            <span>${localize('editor_compact', lang)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.confirm_replace ?? true}
              @change=${(e: Event) => this._valueChanged(e, 'confirm_replace')}
            />
            <span>${localize('editor_confirm_replace', lang)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.filter_low_only ?? false}
              @change=${(e: Event) => this._valueChanged(e, 'filter_low_only')}
            />
            <span>${localize('editor_filter_low_only', lang)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.hide_unavailable ?? false}
              @change=${(e: Event) => this._valueChanged(e, 'hide_unavailable')}
            />
            <span>${localize('editor_hide_unavailable', lang)}</span>
          </label>
        </div>

        <!-- Visible Columns -->
        <div class="section-title">${localize('editor_columns', lang)}</div>

        <div class="toggle-grid">
          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${cols.name}
              @change=${(e: Event) => this._valueChanged(e, 'name', true)}
            />
            <span>${localize('editor_col_name', lang)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${cols.battery}
              @change=${(e: Event) => this._valueChanged(e, 'battery', true)}
            />
            <span>${localize('editor_col_battery', lang)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${cols.type}
              @change=${(e: Event) => this._valueChanged(e, 'type', true)}
            />
            <span>${localize('editor_col_type', lang)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${cols.last_replaced}
              @change=${(e: Event) => this._valueChanged(e, 'last_replaced', true)}
            />
            <span>${localize('editor_col_last_replaced', lang)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${cols.status}
              @change=${(e: Event) => this._valueChanged(e, 'status', true)}
            />
            <span>${localize('editor_col_status', lang)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${cols.actions}
              @change=${(e: Event) => this._valueChanged(e, 'actions', true)}
            />
            <span>${localize('editor_col_actions', lang)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${cols.note}
              @change=${(e: Event) => this._valueChanged(e, 'note', true)}
            />
            <span>${localize('editor_col_note', lang)}</span>
          </label>
        </div>
      </div>
    `;
  }

  static styles = css`
    .card-config {
      display: flex;
      flex-direction: column;
      gap: 14px;
      padding: 8px 0;
      color: var(--primary-text-color);
    }

    .config-row {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .config-row.two-col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .section-title {
      font-weight: 600;
      font-size: 0.95rem;
      margin-top: 8px;
      padding-bottom: 4px;
      border-bottom: 1px solid var(--divider-color, rgba(127, 127, 127, 0.2));
      color: var(--primary-text-color);
    }

    .label {
      font-size: 0.825rem;
      font-weight: 500;
      color: var(--secondary-text-color);
    }

    .input-text,
    .input-select {
      width: 100%;
      box-sizing: border-box;
      padding: 8px 10px;
      border-radius: 6px;
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.25));
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      font-size: 0.875rem;
      outline: none;
    }

    .input-text:focus,
    .input-select:focus {
      border-color: var(--primary-color);
    }

    .toggle-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 10px;
    }

    .toggle-label {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 0.85rem;
      cursor: pointer;
      user-select: none;
    }

    .toggle-label input[type='checkbox'] {
      cursor: pointer;
      accent-color: var(--primary-color);
      width: 16px;
      height: 16px;
    }
  `;
}
