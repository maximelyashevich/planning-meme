package com.epam.meme.websocket.endpoint;

import com.epam.meme.websocket.configurator.WebSocketConfigurator;
import lombok.extern.slf4j.Slf4j;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;

@Slf4j
@ServerEndpoint(value = "/meme/vote", configurator = WebSocketConfigurator.class)
public class VoteEndPoint extends AbstractWebSocketEndPoint{

    @OnOpen
    public void onOpen(Session userSession) {
        getUserSessions().add(userSession);
    }

    @OnClose
    public void onClose(Session userSession) {
        getUserSessions().remove(userSession);
    }

    @OnMessage
    public void onMessage(String msg) {
        for (Session session : getUserSessions()) {
            session.getAsyncRemote().sendText(msg);
        }
    }

    @OnError
    public void onError(Throwable throwable){
        log.error(throwable.getLocalizedMessage());
    }
}
