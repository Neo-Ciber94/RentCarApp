import { CSSProperties } from "react";

export interface CSSDataTableStyles {
  table?: {
    style: CSSProperties;
  };
  tableWrapper?: {
    style: CSSProperties;
  };
  header?: {
    style: CSSProperties;
  };
  subHeader?: {
    style: CSSProperties;
  };
  head?: {
    style: CSSProperties;
  };
  headRow?: {
    style?: CSSProperties;
    denseStyle?: CSSProperties;
  };
  headCells?: {
    style?: CSSProperties;
    activeSortStyle?: CSSProperties;
    inactiveSortStyle?: CSSProperties;
  };
  contextMenu?: {
    style?: CSSProperties;
    activeStyle?: CSSProperties;
  };
  cells?: {
    style: CSSProperties;
  };
  rows?: {
    style?: CSSProperties;
    selectedHighlightStyle?: CSSProperties;
    denseStyle?: CSSProperties;
    highlightOnHoverStyle?: CSSProperties;
    stripedStyle?: CSSProperties;
  };
  expanderRow?: {
    style: CSSProperties;
  };
  expanderCell?: {
    style: CSSProperties;
  };
  expanderButton?: {
    style: CSSProperties;
  };
  pagination?: {
    style?: CSSProperties;
    pageButtonsStyle?: CSSProperties;
  };
  noData?: {
    style: CSSProperties;
  };
  progress?: {
    style: CSSProperties;
  };
}
