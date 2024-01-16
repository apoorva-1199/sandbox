import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  "illustration": {
    "illustrationError": "/app/assets/illustration-error.webp",
    "emptyNote": "/app/assets/empty-note.svg",
    "noResult": "/app/assets/no-search-result.webp",
    "bookOpen": "/app/assets/book-open.svg",
    "noConnection": "/app/assets/no-connection.webp",
    "noQuiz": "/app/assets/gen-ai-quiz.svg"
  },
  "palette": {
    "primary": {
      "main": "#faf8f7",
      "light": "#f1efee",
      "dark": "#dcd9d8",
      "contrastText": "#292524",
      "contrastText2": "#6d6d6d",
      "contrastTextLight": "#292524",
      "contrastTextLight2": "#6d6d6d",
      "contrastTextDark": "#292524"
    },
    "secondary": {
      "main": "#b45c3d",
      "light": "#f7eeeb",
      "dark": "#803015",
      "contrastText": "#ffffff",
      "contrastText2": "#f6e4e0",
      "contrastTextLight": "#292524",
      "contrastTextDark": "#ffffff"
    },
    "background": {
      "main": "#faf8f7",
      "contrastText": "#292524",
      "contrastText2": "#6d6d6d",
      "contrastText3": "#aa543a"
    },
    "surface": {
      "main": "#ffffff",
      "contrastText": "#292524",
      "contrastText2": "#6d6d6d",
      "contrastText3": "#aa543a"
    },
    "tertiary": {
      "main": "#faf8f7",
      "contrastText": "#292524"
    },
    "success": {
      "main": "#35bb66",
      "light": "#e9fbec",
      "contrastText": "#ffffff",
      "contrastTextLight": "#292524",
      "contrastTextLight2": "#28691b"
    },
    "error": {
      "main": "#e02424",
      "light": "#fbe9e9",
      "contrastText": "#ffffff",
      "contrastTextLight": "#292524",
      "contrastTextLight2": "#df2020"
    },
    "notification": {
      "main": "#f7d537",
      "light": "#fdf8e0",
      "contrastText": "#473505",
      "contrastTextLight": "#292524",
      "contrastTextLight2": "#473505"
    },
    "grey": {
      "0": "#ffffff",
      "100": "#fafafa",
      "200": "#f5f5f5",
      "300": "#f0f0f0",
      "400": "#dedede",
      "500": "#a9a4a2",
      "600": "#7f7a79",
      "700": "#6b6665",
      "800": "#4b4645",
      "900": "#292524"
    }
  },
  "typography": {
    "h1": {
      "fontSize": "2.5rem",
      "fontFamily": "\"Work Sans\",\"Roboto\",\"Helvetica\",\"Arial\",sans-serif",
      "fontWeight": "900",
      "lineHeight": "1.2",
      "letterSpacing": "0em"
    },
    "h2": {
      "fontSize": "2rem",
      "fontFamily": "\"Work Sans\",\"Roboto\",\"Helvetica\",\"Arial\",sans-serif",
      "fontWeight": "900",
      "lineHeight": "1.2",
      "letterSpacing": "0em"
    },
    "h3": {
      "fontSize": "1.625rem",
      "fontFamily": "\"Work Sans\",\"Roboto\",\"Helvetica\",\"Arial\",sans-serif",
      "fontWeight": "700",
      "lineHeight": "1.2",
      "letterSpacing": "0em"
    },
    "h4": {
      "fontSize": "1.5rem",
      "fontFamily": "\"Work Sans\",\"Roboto\",\"Helvetica\",\"Arial\",sans-serif",
      "fontWeight": "700",
      "lineHeight": "1.2",
      "letterSpacing": "0em"
    },
    "h5": {
      "fontSize": "1.375rem",
      "fontFamily": "\"Work Sans\",\"Roboto\",\"Helvetica\",\"Arial\",sans-serif",
      "fontWeight": "600",
      "lineHeight": "1.2",
      "letterSpacing": "0em"
    },
    "h6": {
      "fontSize": "1.25rem",
      "fontFamily": "\"Work Sans\",\"Roboto\",\"Helvetica\",\"Arial\",sans-serif",
      "fontWeight": "700",
      "lineHeight": "1.2",
      "letterSpacing": "0em"
    },
    "subtitle1": {
      "fontSize": "1.25rem",
      "fontFamily": "\"Work Sans\",\"Roboto\",\"Helvetica\",\"Arial\",sans-serif",
      "fontWeight": "400",
      "lineHeight": "1.4",
      "letterSpacing": "0em"
    },
    "subtitle2": {
      "fontSize": "1.125rem",
      "fontFamily": "\"Work Sans\",\"Roboto\",\"Helvetica\",\"Arial\",sans-serif",
      "fontWeight": "500",
      "lineHeight": "1.4",
      "letterSpacing": "0em"
    },
    "subtitle2Fixed": {
      "fontSize": "1.125rem",
      "fontFamily": "\"Work Sans\",\"Roboto\",\"Helvetica\",\"Arial\",sans-serif",
      "fontWeight": "500",
      "lineHeight": "1.4",
      "letterSpacing": "0em",
      "maxScalingFactor": "0"
    },
    "body1": {
      "fontSize": "1rem",
      "fontFamily": "\"Work Sans\",\"Roboto\",\"Helvetica\",\"Arial\",sans-serif",
      "fontWeight": "500",
      "lineHeight": "1.4",
      "letterSpacing": "0em"
    },
    "body2": {
      "fontSize": "1.125rem",
      "fontFamily": "\"Work Sans\",\"Roboto\",\"Helvetica\",\"Arial\",sans-serif",
      "fontWeight": "400",
      "lineHeight": "1.4",
      "letterSpacing": "0em"
    },
    "body3": {
      "fontSize": "1rem",
      "fontFamily": "\"Work Sans\",\"Roboto\",\"Helvetica\",\"Arial\",sans-serif",
      "fontWeight": "400",
      "lineHeight": "1.4",
      "letterSpacing": "0em"
    },
    "button": {
      "fontSize": "1rem",
      "fontFamily": "\"Work Sans\",\"Roboto\",\"Helvetica\",\"Arial\",sans-serif",
      "fontWeight": "500",
      "lineHeight": "1.4",
      "letterSpacing": "0em"
    },
    "button2": {
      "fontSize": "1rem",
      "fontFamily": "\"Work Sans\",\"Roboto\",\"Helvetica\",\"Arial\",sans-serif",
      "fontWeight": "600",
      "lineHeight": "1.4",
      "letterSpacing": "0em"
    },
    "button3": {
      "fontSize": "1.375rem",
      "fontFamily": "\"Work Sans\",\"Roboto\",\"Helvetica\",\"Arial\",sans-serif",
      "fontWeight": "500",
      "lineHeight": "1.4",
      "letterSpacing": "0em"
    },
    "caption": {
      "fontSize": "0.875rem",
      "fontFamily": "\"Work Sans\",\"Roboto\",\"Helvetica\",\"Arial\",sans-serif",
      "fontWeight": "400",
      "lineHeight": "1.4",
      "letterSpacing": "0em"
    },
    "captionFixed": {
      "fontSize": "0.875rem",
      "fontFamily": "\"Work Sans\",\"Roboto\",\"Helvetica\",\"Arial\",sans-serif",
      "fontWeight": "400",
      "lineHeight": "1.4",
      "letterSpacing": "0em",
      "maxScalingFactor": "0"
    },
    "overline": {
      "fontSize": "0.625rem",
      "fontFamily": "\"Work Sans\",\"Roboto\",\"Helvetica\",\"Arial\",sans-serif",
      "fontWeight": "400",
      "lineHeight": "1.4",
      "letterSpacing": "0em",
      "textTransform": "uppercase"
    },
    "item-body-xxlarge": {
      "fontSize": "2.5rem",
      "fontFamily": "\"Work Sans\",\"Roboto\",\"Helvetica\",\"Arial\",sans-serif",
      "fontWeight": "900",
      "lineHeight": "1.2",
      "letterSpacing": "0em"
    },
    "item-body-xlarge": {
      "fontSize": "2rem",
      "fontFamily": "\"Work Sans\",\"Roboto\",\"Helvetica\",\"Arial\",sans-serif",
      "fontWeight": "900",
      "lineHeight": "1.2",
      "letterSpacing": "0em"
    },
    "item-body-large": {
      "fontSize": "1.625rem",
      "fontFamily": "\"Work Sans\",\"Roboto\",\"Helvetica\",\"Arial\",sans-serif",
      "fontWeight": "700",
      "lineHeight": "1.2",
      "letterSpacing": "0em"
    },
    "item-body-standard": {
      "fontSize": "1.5rem",
      "fontFamily": "\"Work Sans\",\"Roboto\",\"Helvetica\",\"Arial\",sans-serif",
      "fontWeight": "700",
      "lineHeight": "1.2",
      "letterSpacing": "0em"
    },
    "item-body-small": {
      "fontSize": "1.25rem",
      "fontFamily": "\"Work Sans\",\"Roboto\",\"Helvetica\",\"Arial\",sans-serif",
      "fontWeight": "400",
      "lineHeight": "1.2",
      "letterSpacing": "0em"
    },
    "item-body-xsmall": {
      "fontSize": "1.125rem",
      "fontFamily": "\"Work Sans\",\"Roboto\",\"Helvetica\",\"Arial\",sans-serif",
      "fontWeight": "400",
      "lineHeight": "1.4",
      "letterSpacing": "0em"
    },
    "item-body-xxsmall": {
      "fontSize": "1rem",
      "fontFamily": "\"Work Sans\",\"Roboto\",\"Helvetica\",\"Arial\",sans-serif",
      "fontWeight": "400",
      "lineHeight": "1.4",
      "letterSpacing": "0em"
    },
    "item-body-xxxsmall": {
      "fontSize": "0.875rem",
      "fontFamily": "\"Work Sans\",\"Roboto\",\"Helvetica\",\"Arial\",sans-serif",
      "fontWeight": "400",
      "lineHeight": "1.4",
      "letterSpacing": "0em"
    },
    "item-body-options": {
      "fontSize": "1rem",
      "fontFamily": "\"Work Sans\",\"Roboto\",\"Helvetica\",\"Arial\",sans-serif",
      "fontWeight": "500",
      "lineHeight": "1.4",
      "letterSpacing": "0em"
    },
    "etext-img-caption": {
      "fontSize": "0.875rem",
      "fontFamily": "\"Work Sans\",\"Roboto\",\"Helvetica\",\"Arial\",sans-serif",
      "fontWeight": "400",
      "lineHeight": "1.4",
      "letterSpacing": "0em"
    },
    "etext-body": {
      "fontSize": "1rem",
      "fontFamily": "\"Work Sans\",\"Roboto\",\"Helvetica\",\"Arial\",sans-serif",
      "fontWeight": "400",
      "lineHeight": "1.5",
      "letterSpacing": "0em"
    },
    "etext-bullet": {
      "fontSize": "1rem",
      "fontFamily": "\"Work Sans\",\"Roboto\",\"Helvetica\",\"Arial\",sans-serif",
      "fontWeight": "400",
      "lineHeight": "1.4",
      "letterSpacing": "0em"
    },
    "etext-head-small": {
      "fontSize": "1.25rem",
      "fontFamily": "\"Work Sans\",\"Roboto\",\"Helvetica\",\"Arial\",sans-serif",
      "fontWeight": "500",
      "lineHeight": "1.4",
      "letterSpacing": "0em"
    },
    "etext-head-medium": {
      "fontSize": "1.375rem",
      "fontFamily": "\"Work Sans\",\"Roboto\",\"Helvetica\",\"Arial\",sans-serif",
      "fontWeight": "600",
      "lineHeight": "1.4",
      "letterSpacing": "0em"
    },
    "etext-head-large": {
      "fontSize": "1.5rem",
      "fontFamily": "\"Work Sans\",\"Roboto\",\"Helvetica\",\"Arial\",sans-serif",
      "fontWeight": "700",
      "lineHeight": "1.4",
      "letterSpacing": "0em"
    },
    "etext-head-xlarge": {
      "fontSize": "1.625rem",
      "fontFamily": "\"Work Sans\",\"Roboto\",\"Helvetica\",\"Arial\",sans-serif",
      "fontWeight": "700",
      "lineHeight": "1.4",
      "letterSpacing": "0em"
    },
    "etext-head-xxlarge": {
      "fontSize": "1.75rem",
      "fontFamily": "\"Work Sans\",\"Roboto\",\"Helvetica\",\"Arial\",sans-serif",
      "fontWeight": "900",
      "lineHeight": "1.2",
      "letterSpacing": "0em"
    },
    "etext-head-xxxlarge": {
      "fontSize": "2rem",
      "fontFamily": "\"Work Sans\",\"Roboto\",\"Helvetica\",\"Arial\",sans-serif",
      "fontWeight": "900",
      "lineHeight": "1.2",
      "letterSpacing": "0em"
    },
    "etext-equation": {
      "fontSize": "1.375rem",
      "fontFamily": "\"Work Sans\",\"Roboto\",\"Helvetica\",\"Arial\",sans-serif",
      "fontWeight": "600",
      "lineHeight": "1.2",
      "letterSpacing": "0em"
    },
    "etext-notes-title": {
      "fontSize": "1.5rem",
      "fontFamily": "\"Work Sans\",\"Roboto\",\"Helvetica\",\"Arial\",sans-serif",
      "fontWeight": "700",
      "lineHeight": "1.2",
      "letterSpacing": "0em"
    },
    "etext-tip-title": {
      "fontSize": "1.5rem",
      "fontFamily": "\"Work Sans\",\"Roboto\",\"Helvetica\",\"Arial\",sans-serif",
      "fontWeight": "700",
      "lineHeight": "1.2",
      "letterSpacing": "0em"
    }
  },
  "fontSettings": {
    "defaultFont": "Work Sans",
    "defaultAccessibleFont": "OpenDyslexic",
    "fallbackFonts": "\"Roboto\",\"Helvetica\",\"Arial\",sans-serif"
  },
  "backgroundImage": "none",
  "focusRect": {
    "outlineColor": "#000"
  }
});

export default theme;
