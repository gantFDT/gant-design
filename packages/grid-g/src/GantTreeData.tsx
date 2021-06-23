import React, { memo } from 'react';

export default memo(function GantTreeData() {
  return (
    <div className="ag-filter">
      <div className="ag-filter-wrapper ag-focus-managed">
        <div className="ag-filter-body-wrapper ag-set-filter-body-wrapper">
          <div className="ag-set-filter">
            <div ref="eFilterLoading" className="ag-filter-loading ag-hidden">
              加载中...
            </div>
            <div className="ag-mini-filter ag-labeled ag-label-align-left ag-text-field ag-input-field">
              <div className="ag-input-field-label ag-label ag-hidden ag-text-field-label"></div>
              <div
                className="ag-wrapper ag-input-wrapper ag-text-field-input-wrapper"
                role="presentation"
              >
                <input
                  className="ag-input-field-input ag-text-field-input"
                  type="text"
                  aria-label="Search filter values"
                  placeholder="查询"
                />
              </div>
            </div>

            <div ref="eFilterNoMatches" className="ag-filter-no-matches ag-hidden">
              No matches.
            </div>
            <div ref="eSetFilterList" className="ag-set-filter-list" role="presentation">
              <div
                className="ag-virtual-list-viewport ag-filter-virtual-list-viewport ag-focus-managed"
                role="listbox"
              >
                <div className="ag-tab-guard ag-tab-guard-top" role="presentation"></div>
                <div
                  className="ag-virtual-list-container ag-filter-virtual-list-container"
                  ref="eContainer"
                >
                  <div
                    className="ag-virtual-list-item ag-filter-virtual-list-item"
                    aria-selected="true"
                    aria-checked="true"
                  >
                    <div className="ag-set-filter-item">
                      <div
                        role="presentation"
                        ref="eCheckbox"
                        className="ag-set-filter-item-checkbox ag-labeled ag-label-align-right ag-checkbox ag-input-field"
                      >
                        <div
                          ref="eLabel"
                          className="ag-input-field-label ag-label ag-checkbox-label"
                          id="ag-296-label"
                        >
                          全选
                        </div>
                        <div
                          ref="eWrapper"
                          className="ag-wrapper ag-input-wrapper ag-checkbox-input-wrapper ag-checked"
                          role="presentation"
                        >
                          <input
                            ref="eInput"
                            className="ag-input-field-input ag-checkbox-input"
                            type="checkbox"
                            id="ag-296-input"
                            aria-labelledby="ag-296-label"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ag-virtual-list-item ag-filter-virtual-list-item">
                    <div className="ag-set-filter-item">
                      <div className="ag-set-filter-item-checkbox ag-labeled ag-label-align-right ag-checkbox ag-input-field">
                        <div
                          ref="eLabel"
                          className="ag-input-field-label ag-label ag-checkbox-label"
                        >
                          9999999999999
                        </div>
                        <div
                          ref="eWrapper"
                          className="ag-wrapper ag-input-wrapper ag-checkbox-input-wrapper ag-checked"
                          role="presentation"
                        >
                          <input
                            className="ag-input-field-input ag-checkbox-input"
                            type="checkbox"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ag-tab-guard ag-tab-guard-bottom"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
