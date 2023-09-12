import { useDispatch, useSelector } from "react-redux";
import { privateFeedStart, privateFeedStop } from "../../services/store/feed-slice";
import FeedList from "../feed-list/feed-list";
import { useEffect } from "react";

const FeedView = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(privateFeedStart());
    return () => dispatch(privateFeedStop());
  }, [dispatch]);

  const feedData = useSelector((store) => store.feed.privateFeedData);

  if (feedData) {
    return (<FeedList widthSize='860px' gapSize='24px' isPrivate ordersData={feedData.orders} />);
  } else {
    return null;
  };
};

export default FeedView;