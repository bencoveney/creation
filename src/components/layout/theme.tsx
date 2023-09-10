export const spacer = {
  xSmall: 3,
  small: 5,
  medium: 10,
};

export const backgroundColorPale = "#dbddd9";
export const inputFontSize = 16;

export const theme = {
  padding: {
    default: `${spacer.medium}px`,
    selected: "10px 10px 5px 10px",
  },
  backgroundColor: {
    default: "#bcc4b4",
    disabled: backgroundColorPale,
  },
  color: {
    default: "#1b1c1b",
    disabled: "#636863",
  },
  borderBottomWidth: {
    default: 0,
    selected: 5,
  },
  borderBottomColor: {
    default: "#063a00",
  },
  cursor: {
    default: "pointer",
    disabled: "not-allowed",
  },
};

export function getForState<T>(
  states: {
    default: T;
    selected?: T;
    disabled?: T;
  },
  selected: boolean,
  disabled: boolean
): T {
  if (selected && states.selected !== undefined) {
    return states.selected;
  }
  if (disabled && states.disabled !== undefined) {
    return states.disabled;
  }
  return states.default;
}
