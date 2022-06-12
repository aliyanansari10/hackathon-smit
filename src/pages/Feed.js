import FeedCard from "../components/FeedCard";
import classes from "./pages.module.css";

const Feed = ({ feedsData }) => {
  return (
    <div className={classes.feedsBody}>
      {!!feedsData.length &&
        feedsData.map((feed, key) => (
          <FeedCard
            data={feed}
            key={key}
            postImg={"https://picsum.photos/300/300"}
          />
        ))}
    </div>
  );
};
export default Feed;
