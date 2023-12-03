import { Middleware } from "redux";
import { WS_CONNECT_THRESHOLD } from "../../utils/constants";
import { RootState } from "../store/store";
import { FeedWSActions } from "../types";

type Props = {
  wsUrl: string;
  wsActions: FeedWSActions;
  isPrivate: boolean;
}

const socketMiddleware = ({ wsUrl, wsActions, isPrivate }: Props): Middleware<{}, RootState> => {
  let socket: (WebSocket | null) = null;
  
  return (store) => (next) => (action) => {
    const { dispatch, getState } = store;
    const { type } = action;
    const {
      wsConnect, //feedStart (простой экшен) команда открытия соединения
      wsDisconnect, //feedStop (простой экшен) команда закрытия соединения
      onOpen, //openFeed (редьюсер api-slice) на момент открытия соединения (событие WS)
      onClose, //closeFeed (редьюсер api-slice) на момент закрытия соединения (событие WS)
      onError, //setApiError
      onMessage, //setFeedData (редьюсер feed-slice) при получении сообщения от сервера по WS
      wsOpen, //requestFeed (редьюсер api-slice) на процесс открытия соединения
      wsClose, //rdiscardFeed (редьюсер api-slice) на процесс закрытия соединения
    } = wsActions;

    if (type === wsConnect.type) {
      const feedRequestedAt = isPrivate ? getState().api.privateFeedRequestedAt : getState().api.publicFeedRequestedAt;
      const isFeedOpen = isPrivate ? getState().api.isPrivateFeedOpen : getState().api.isPublicFeedOpen;
      if ((Date.now() - feedRequestedAt > WS_CONNECT_THRESHOLD) && !isFeedOpen) {
        dispatch(wsOpen(Date.now()));
        const accessToken = localStorage.getItem('accessToken');
        let feedUrl: string;
        if (accessToken) {
          feedUrl = `${wsUrl}${isPrivate ? accessToken.slice(7) : ''}`
        } else {
          feedUrl = '';
        }
        socket = new WebSocket(feedUrl);
      };
    };

    if (wsDisconnect && type === wsDisconnect.type) {
      const feedDiscardedAt = isPrivate ? getState().api.privateFeedDiscardedAt : getState().api.publicFeedDiscardedAt;
      const isFeedOpen = isPrivate ? getState().api.isPrivateFeedOpen : getState().api.isPublicFeedOpen;
      if((Date.now() - feedDiscardedAt > WS_CONNECT_THRESHOLD) && isFeedOpen) {
        dispatch(wsClose(Date.now()));
        if (socket) {
          socket.close();
        }
      };
    };

    if (socket) {
      
      socket.onopen = () => {
        dispatch(onOpen()); //слушатель события открытия соединения
      };

      socket.onerror = (evt: ErrorEventInit) => {
        const { message = 'При websocket-соединении с сервером произошла неизвестная ошибка :(' } = evt;
        dispatch(onError(message)); //слушатель события ошибки соединения
      };

      socket.onmessage = (evt: MessageEvent) => {
        const { data } = evt;
        const parsedData = JSON.parse(data);
        dispatch(onMessage(parsedData)); //слушатель события получения сообщения (данных) по каналу соединения
      };

      socket.onclose = (evt: CloseEvent) => {
        if (!evt.wasClean) {
          //TODO: разобрать что приходит в evt и сделать ошибку более осмысленной
          dispatch(onError('Сервер разорвал соединение'));
        }
        dispatch(onClose());
        socket = null;
      };
    };
    next(action);
  };
};

export default socketMiddleware;