import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  root: {
    maxWidth: "100%",
    height: 520,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "auto",
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
  },
  description: {
    height: "150px", // change this value to whatever fixed height you prefer
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": 6, // change this value to the number of lines you want to display
    "-webkit-box-orient": "vertical",
    marginBottom: "10px",
  },
}));
